---
title: Create a Kanban Board with VueJS
description: Setting up our project and building the Kanban board
---

# Setting up our project and building the Kanban boards

#tutorialss

Kanban boards are a great way to manage your tasks, projects, or your life. They use columns to represent the flow of a task. They’re also a popular agile project management tool. If you’ve used Trello you’ll know exactly what I’m talking about.

So let’s build our own Trello-style Kanban board!

![Completed Kanban gif](https://dev-to-uploads.s3.amazonaws.com/i/60iann3x944phupoid5y.gif)

---
# Getting Started
Let’s start setting up all of the boiler plate for a new project. 

## Laravel install and set up

Start by creating a new laravel project. In your terminal navigate to where you want to create your project and run one of the following commands

```bash
# with the laravel installer
laravel new kanban-board

# or using composer
composer create-project --prefer-dist laravel/laravel kanban-board
```

Now **create a new database** and  configure your connection in `.env`. For me that looks like this:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kanban
DB_USERNAME=root
DB_PASSWORD=
```


## Using TailwindCSS for UI & authentication scaffolding
We won’t worry too much about authentication in this guide, let’s just let Laravel handle the scaffolding. Also, we’re going to use [Tailwind CSS](https://tailwindcss.com/) as our CSS framework.  
Luckily [@michaeldyrynda](https://twitter.com/michaeldyrynda) made this awesome laravel/ui preset. to initialize all the scaffolding. You can check it out here:[laravel-frontend-presets/tailwindcss](https://github.com/laravel-frontend-presets/tailwindcss).

{% twitter 1255848108707115008 %}

Install the dependencies and run migrations:

```bash
# install laravel/ui from composer
composer require laravel-frontend-presets/tailwindcss --dev

# then generate the scaffolding including authentication
php artisan ui tailwindcss --auth

# install npm dependencies
npm install && npm run dev

# ready to migrate
php artisan migrate
```

Great! We’ve got the authentication scaffolding done, our databases are set up, and everything looks great using Tailwind.  Navigate to your local site in the browser and create your user account 👉 http://kanban-board.test

![Register Page](https://dev-to-uploads.s3.amazonaws.com/i/f9fru4w65ls1cnozcas2.png)

---
# Creating our Tasks and Statuses
We know we want to create **tasks** and track them through different columns (we’ll call these **statuses**) so let’s start create the models in Laravel

#### A **Task** should have the following:
* Title — Needs to have a title
* Description — Optional extra details to add
* Order — Should know where in the column it lives
* Status Id — We want to track what status the task is currently in
* User ID — A task should belong to a single user

#### A **Status** should have the following:
* Title — Status should have a descriptive title
* Slug — Slugified version of title, useful as keys and prettier URLs
* Order — Even more important with columns, should have a defined order of statuses
* User ID — Allow users to create their own statuses and workflow

Create the **Task** and **Status** model, migration, and controller:
```bash
php artisan make:model -mc Task
php artisan make:model -mc Status
```
Note the `-mc` flags; This will create a *migration* and *controller* for our model.

---
## Migrations
Some
```php
// database/migrations/XXXX_create_tasks_table.php
class CreateTasksTable extends Migration
{
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->smallInteger('order')->default(0);
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('status_id');
            $table->timestamps();
        });
    }
}

// database/migrations/XXXX_create_statuses_table.php
class CreateStatusesTable extends Migration
{
    public function up()
    {
        Schema::create('statuses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug');
            $table->smallInteger('order')->default(0);
            $table->unsignedInteger('user_id');
        });
    }
}
```

As per our little spec above we’ve created all of the columns we need. Let’s run the migration:
```bash
php artisan migrate
```

---
## Models
We need to define each model’s relationships and tell Laravel which attributes can be mass assigned. We’ll come back and add to this when we need to, but this will get us started.

### User
Add the relationships to tasks and statuses. Note we can tell the relationship to always return our records in the order from the order attribute. 
```php
// app/User.php

// ...
class User extends Authenticatable
{
    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function statuses()
    {
        return $this->hasMany(Status::class)->orderBy('order');
    }
}
```

### Task
```php
// app/Task.php

// ...
class Task extends Model
{
    protected $fillable = [‘title’, ‘description’, ‘order’, ‘status_id’];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
```

### Status
Since we removed the timestamps from our migration we need to tell Laravel not to try to touch them when creating/updating a record. Again, we add a default `orderBy` to the relationship to tasks.
```php
// app/Status.php

// ...
class Status extends Model
{
    protected $fillable = [‘title’, ‘slug’, ‘order’];

    public $timestamps = false;

    public function tasks()
    {
        return $this->hasMany(Task::class)->orderBy('order');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

---
## Routes & Controllers
Let’s think about which actions we need to take and the routes & controller methods we need

**Tasks**
- Get all tasks — `GET tasks` — `TaskController@index`
- Add a new task — `POST tasks` — `TaskController@store`
- Update a task — `PUT tasks/{task}` — `TaskController@update`

**Statuses**
- Add a new status — `POST statuses` — `StatusController@store`
- Update a status  — `PUT statuses` — `StatusController@update`

To keep things simple for now let’s just redirect the `/home` route to  `/tasks`. 

Update your  `/routes/web.php` file to match the following:
```php
// routes/web.php

// Update our 'home' route to redirect to /tasks
Route::get('/home', function () {
    return redirect()->route('tasks.index');
})->name('home');

Route::group(['middleware' => 'auth'], function () {
    Route::get('tasks', 'TaskController@index')->name('tasks.index');
    Route::post('tasks', 'TaskController@store')->name('tasks.store');
    Route::put('tasks/sync', 'TaskController@sync')->name('tasks.sync');
    Route::put('tasks/{task}', 'TaskController@update')->name('tasks.update');
});

Route::group(['middleware' => 'auth'], function () {
    Route::post('statuses', 'StatusController@store')->name('statuses.store');
    Route::put('statuses', 'StatusController@update')->name('statuses.update');
});
```

You can run `php artisan route:list` to see all of the routes that are available

![Route list](https://dev-to-uploads.s3.amazonaws.com/i/iehm0xomgm695426qbpg.png)

### Update the TaskController
Let’s think about the data we’re expecting on the Kanban board; A **user** has many **tasks** that also belong to a **status**. What if we return this data structured exactly like that?

Instead of just returning an array of a user’s tasks, we’ll return an array of a user’s statuses that then includes an array of the tasks in that status.

Update the `index()` method on our TaskController:
```php
// app/Http/Controllers/TaskController.php

// ...
class TaskController extends Controller
{
    public function index()
    {
        $tasks = auth()->user()->statuses()->with('tasks')->get();

        return view('tasks.index', compact('tasks'));
    }

    // ...
}
```

### Create the view where the Kanban will live
Create a new Blade template in `/resources/views/tasks` named `index.blade.php` and add the following boilerplate:
```html
<!-- resources/views/tasks/index.blade.php -->

@extends('layouts.app')

@section('content')
<div class="md:mx-4 relative overflow-hidden">
    <main class="h-full flex flex-col overflow-auto">
        <!-- Our Kanban Vue component will go here -->
    </main>
</div>
@endsection
```

---
## Default Columns
To get started more quickly create some default **statuses** that every new user will get. Using the User’s `booted` method we can create and append statuses when a new user is created. 

Add this to your `User.php` model:
```php
// app/User.php

protected static function booted()
    {
        static::created(function ($user) {
            // Create default statuses
            $user->statuses()->createMany([
                [
                    'title' => 'Backlog',
                    'slug' => 'backlog',
                    'order' => 1
                ],
                [
                    'title' => 'Up Next',
                    'slug' => 'up-next',
                    'order' => 2
                ],
                [
                    'title' => 'In Progress',
                    'slug' => 'in-progress',
                    'order' => 3
                ],
                [
                    'title' => 'Done',
                    'slug' => 'done',
                    'order' => 4
                ]
            ]);
        });
    }
```

---
## Wrapping up the initial backend
What have we done so far?
1. Installed Laravel and the Composer dependencies we need
2. Authentication scaffolding
3. Created the resources for **Status** and **Task**
4. Return users’ tasks to the view
5. Create some default statuses when a user is created

That’s all the initial back end boilerplate and scaffolding done, let’s move on to some front end code.

---
# Building the Kanban board
Let’s break down what we need to do to get our first component up and running:
1. Set up Vue
2. Create our Kanban component
3. Add new tasks
4. Implement drag-and-drop
5. Update the order and status of a task when it’s been moved

---
## Install Vue
Because we didn’t use Laravel’s Vue scaffolding we’ll need to set it up ourselves. Grab it from npm:
```bash
npm install vue
```

Once Vue is installed we can initialize it in our  `resources/js/app.js`  file:
```javascript
require("./bootstrap");

window.Vue = require("vue");

// Register our components (in the next step)

const app = new Vue({
    el: "#app"
});
```

That’s it! Our Laravel app now has Vue hooked up and we can start taking advantage of everything it has to offer. Run `npm run dev` and check the site in your browser, the console should now be warning you that you’re running Vue in development mode, that’s good.

> Tip:
> Before we move on; I recommend grabbing the [Vue devtools](https://github.com/vuejs/vue-devtools) for whichever browser you’re using. This let’s your debug and dive into your Vue components to see the state.

---
## Register the Kanban component
Create a new file called `KanbanBoard.vue` in the components folder located in `resources/js/components/` and register it in your `app.js` file:
```javascript
// resources/js/app.js

// Register our components
Vue.component("kanban-board", require("./components/KanbanBoard.vue").default);
```

Add the component to our Blade view:
```php
// resources/views/tasks/index.blade.php

<main class="h-full flex flex-col overflow-auto">
    <kanban-board :initial-data="{{ $tasks }}"></kanban-board>
</main>
```

To avoid having to `npm run dev` every time we make a change in our component use:
```bash
npm run watch
```

---
## Let’s build it
I know… Finally!

Big chunk incoming, but most of this is just HTML scaffolding and applying TailwindCSS classes. We’ll break down the important bits
```javascript
<template>
  <div class="relative p-2 flex overflow-x-auto h-full">

    <!-- Columns (Statuses) -->
    <div
      v-for="status in statuses"
      :key="status.slug"
      class="mr-6 w-4/5 max-w-xs flex-1 flex-shrink-0"
    >
      <div class="rounded-md shadow-md overflow-hidden">
        <div class="p-3 flex justify-between items-baseline bg-blue-800 ">
          <h4 class="font-medium text-white">
            {{ status.title }}
          </h4>
          <button class="py-1 px-2 text-sm text-orange-500 hover:underline">
            Add Task
          </button>
        </div>
        <div class="p-2 flex-1 flex flex-col h-full overflow-x-hidden overflow-y-auto bg-blue-100">

          <!-- Tasks -->
          <div
            v-for="task in status.tasks"
            :key="task.id"
            class="mb-3 p-3 h-24 flex flex-col bg-white rounded-md shadow transform hover:shadow-md cursor-pointer"
          >
            <span class="block mb-2 text-xl text-gray-900">
              {{ task.title }}
            </span>
            <p class="text-gray-700 truncate">
              {{ task.description }}
            </p>
          </div>
          <!-- ./Tasks -->

          <!-- No Tasks -->
          <div
            v-show="!status.tasks.length"
            class="flex-1 p-4 flex flex-col items-center justify-center"
          >
            <span class="text-gray-600">No tasks yet</span>
            <button
              class="mt-1 text-sm text-orange-600 hover:underline"
            >
              Add one
            </button>
          </div>
          <!-- ./No Tasks -->
        </div>
      </div>
    </div>
    <!-- ./Columns -->

  </div>
</template>

<script>
export default {
  props: {
    initialData: Array
  },
  data() {
    return {
      statuses: []
    };
  },
  mounted() {
    // 'clone' the statuses so we don't alter the prop when making changes
    this.statuses = JSON.parse(JSON.stringify(this.initialData));
  }
};
</script>
```

Remember when naming props they should be written in kebab-cased (initial-data) in the HTML, and camelCased (initialData) in the component.

You might have noticed we’re doing some weird JSON parsing to our prop data, this creates a ‘clone’ of the array so we don’t actually alter the data being passed by the prop instead just our copy.

> Alternatives
> We’re using `JSON.parse(JSON.stringify(this.initialData));` instead of something like `[…this.initialData]` because it’s safer when dealing with nested data (like our array of tasks inside of each status object)

In the template we’re using `v-for="status in statuses"` to iterate over our statuses array to display the columns. Don’t forget to add a `key` , this is especially important for this project because we want Vue to keep track of the order of our elements.

Similarly, inside of each column we’re then displaying our task cards with another `v-for` using the list of tasks in the current status.

![Empty board](https://dev-to-uploads.s3.amazonaws.com/i/txxvtdbsdvm3uyrpmpul.png)

---
## Add a new task
![Add task form](https://dev-to-uploads.s3.amazonaws.com/i/vyprjkns0t1rwup20plh.png)

### Create the AddTaskForm component
We’ll create a new Vue component named `AddTaskForm.vue` in our `/resources/js/components` directory. 

This component will include a form with a title and description field. It’ll send the form data to our server which will create the new task in our database and return it if there’s no validation errors. 

We’ll relay that new task up to the KanbanBoard component and add it to the correct column.

```javascript
// resources/js/components/AddTaskForm.vue

<template>
  <form
    class="relative mb-3 flex flex-col justify-between bg-white rounded-md shadow overflow-hidden"
    @submit.prevent="handleAddNewTask"
  >
    <div class="p-3 flex-1">
      <input
        class="block w-full px-2 py-1 text-lg border-b border-blue-800 rounded"
        type="text"
        placeholder="Enter a title"
        v-model.trim="newTask.title"
      />
      <textarea
        class="mt-3 p-2 block w-full border text-sm rounded"
        rows="2"
        placeholder="Add a description (optional)"
        v-model.trim="newTask.description"
      ></textarea>
      <div v-show="errorMessage">
        <span class="text-xs text-red-500">
          {{ errorMessage }}
        </span>
      </div>
    </div>
    <div class="p-3 flex justify-between items-end text-sm bg-gray-100">
      <button
        @click="$emit('task-canceled')"
        type="reset"
        class="py-1 leading-5 text-gray-600 hover:text-gray-700"
      >
        cancel
      </button>
      <button
        type="submit"
        class="px-3 py-1 leading-5 text-white bg-orange-600 hover:bg-orange-500 rounded"
      >
        Add
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    statusId: Number
  },
  data() {
    return {
      newTask: {
        title: "",
        description: "",
        status_id: null
      },
      errorMessage: ""
    };
  },
  mounted() {
    this.newTask.status_id = this.statusId;
  },
  methods: {
    handleAddNewTask() {
      // Basic validation so we don't send an empty task to the server
      if (!this.newTask.title) {
        this.errorMessage = "The title field is required";
        return;
      }

      // Send new task to server
      axios
        .post("/tasks", this.newTask)
        .then(res => {
          // Tell the parent component we've added a new task and include it
          this.$emit("task-added", res.data);
        })
        .catch(err => {
          // Handle the error returned from our request
          this.handleErrors(err);
        });
    },
    handleErrors(err) {
      if (err.response && err.response.status === 422) {
        // We have a validation error
        const errorBag = err.response.data.errors;
        if (errorBag.title) {
          this.errorMessage = errorBag.title[0];
        } else if (errorBag.description) {
          this.errorMessage = errorBag.description[0];
        } else {
          this.errorMessage = err.response.message;
        }
      } else {
        // We have bigger problems
        console.log(err.response);
      }
    }
  }
};
</script>
```

In the `data` of this component we’re keeping tracking of a `newTask` object, which gets its `status_id` from the props.

Using `v-model.trim=“newTask.title”` we’re setting up two-way binding between the input and state and telling Vue to trim off any whitespace.

When we submit the form we want to let our parent component know what happened and return the new task. If there’s an error in the response, we’ll show a message to let the user know what went wrong.

### Add the new component to KanbanBoard

```javascript
// resources/js/components/KanbanBoard.vue

<template>
  // ...
  <AddTaskForm
    v-if="newTaskForStatus === status.id"
    :status-id="status.id"
    v-on:task-added="handleTaskAdded"
    v-on:task-canceled="closeAddTaskForm"
  />
  // Add this just above our list of tasks
  <!-- Tasks -->
  //...
  <!-- No Tasks -->
  // Update the placeholder to include a click handler to create a new task
  // and hide it when the form is open
  <div
    v-show="!status.tasks.length && newTaskForStatus !== status.id"
    class="flex-1 p-4 flex flex-col items-center justify-center"
  >
    <span class="text-gray-600">No tasks yet</span>
    <button
      class="mt-1 text-sm text-orange-600 hover:underline"
      @click="openAddTaskForm(status.id)"
    >
      Add one
    </button>
  </div>
  <!-- ./No Tasks -->
</template>

<script>
import AddTaskForm from "./AddTaskForm"; // import the component

export default {
  components: { AddTaskForm }, // register component
  // ...
  data() {
    return {
      statuses: [],

      newTaskForStatus: 0 // track the ID of the status we want to add to
    };
  },
  // ...
  methods: {
    // set the statusId and trigger the form to show 
    openAddTaskForm(statusId) {
      this.newTaskForStatus = statusId;
    },
    // reset the statusId and close form
    closeAddTaskForm() {
      this.newTaskForStatus = 0;
    },
    // add a task to the correct column in our list
    handleTaskAdded(newTask) {
      // Find the index of the status where we should add the task
      const statusIndex = this.statuses.findIndex(
        status => status.id === newTask.status_id
      );

      // Add newly created task to our column
      this.statuses[statusIndex].tasks.push(newTask);

      // Reset and close the AddTaskForm
      this.closeAddTaskForm();
    },
  }
};
</script>
```

### Store new task on server
Back in our laravel app we need to update our `TasksController` to handle storing a new task.
```php
// app/Http/Controllers/TaskController

public function store(Request $request)
{
    $this->validate($request, [
        'title' => ['required', 'string', 'max:56'],
        'description' => ['required', 'string'],
        'status_id' => ['required', 'exists:statuses,id']
    ]);

    return $request->user()
        ->tasks()
        ->create($request->only('title', 'description', 'status_id'));
}
```
First, we want to validate the request coming in to make sure the data we’re getting is what we expect, otherwise this will return a 422 response with the validation errors (which we’re already catching and handling 🙌)

If all is good, we can save and attach the new task to our the authenticated user and return it.

> Security Note: 
> Although the task will get added to the authenticated user, we’re not checking if this user owns the status it’s being attached to. We’ll come back to authorization and policies in a later part, just keep this in mind.

---
## Draggin’ and Droppin’
Alright, we have a bunch of columns with some tasks in them and we can create new tasks. Let’s get to the fun part of moving the cards from one column to another using drag-and-drop.

We’re going to be using [SortableJS/Vue.Draggable](https://github.com/SortableJS/Vue.Draggable) to quickly plug in a drag-and-drop. Use npm to install this:

```bash
npm install vuedraggable

# once installed run watch again
npm run watch
```

### Add it to our KanbanBoard component
Now that we have `vuedraggable` installed, let’s hook it up to our columns and start moving tasks.

```javascript
// resources/js/components/KanbanBoard.vue

<template>
  // ...
  <div class="p-2 bg-blue-100"> // Update these classes because we're moving them to our transition-group
    <!-- AddTaskForm -->
    // ...
    <!-- ./AddTaskForm -->

    <!-- Tasks -->
    <draggable
      class="flex-1 overflow-hidden"
      v-model="status.tasks"
      v-bind="taskDragOptions"
      @end="handleTaskMoved"
    >
      <transition-group
        class="flex-1 flex flex-col h-full overflow-x-hidden overflow-y-auto rounded shadow-xs"
        tag="div"
      >
        <div
          v-for="task in status.tasks"
          :key="task.id"
          class="mb-3 p-3 h-24 flex flex-col bg-white rounded-md shadow transform hover:shadow-md cursor-pointer"
        >
          // ... nothing changed in here
        </div>
        <!-- ./Tasks -->
      </transition-group>
    </draggable>
  // ...
  </div>
<template>

<script>
import draggable from "vuedraggable"; // import the vuedraggable component
// ...

export default {
  components: { draggable, AddTaskForm }, // register 
  // ...
  computed: {
    taskDragOptions() {
      return {
        animation: 200,
        group: "task-list",
        dragClass: "status-drag"
      };
    }
  },
  // ...
  methods: {
    // ...
    handleTaskMoved() {
      // Send the entire list of statuses to the server
      axios.put("/tasks/sync", {columns: this.statuses}).catch(err => {
        console.log(err.response);
      });
    }
  }
};
</script>

<style scoped>
.status-drag {
  transition: transform 0.5s;
  transition-property: all;
}
</style>
```

After importing and registering the `draggable` component we need to configure it. 

The `group` value in our `taskDragOptions` tells sortable that even though our elements are spread across different columns they should be grouped together.

Above, in our template we’ve added the `<draggable>` and the `<transition-group>` components which gives a better visual feedback as cards move around more smoothly when we drag through the list. Notice the updates we’ve made with the CSS classes too, the components render their own DOM element that we need to consider when using *flex* to arrange our child elements.

This is also the first time we’re taking advantage of the `style` section in our Vue component. We’re just adding some transition properties to the draggable element, but you could change the style of the card while it’s actively being dragged. Maybe add a larger shadow?

We can now move tasks within and between columns! We’re pretty close, last thing we need to do is save the order to our database. We’re already making the `PUT` request to `/tasks/sync` in our component so we need to create the controller method to handle the request.

---
## Sync the order of tasks in our TaskController
Once we drag a task into a new column we want that change to be reflected in the database. In this part we’re returning the entire list of columns with their tasks and then letting our backend handle how they should be updated.

First let’s add our new route:
```php
// routes/web.php

//..
Route::group(['middleware' => 'auth'], function () {
    Route::get('tasks', 'TaskController@index')->name('tasks.index');
    Route::post('tasks', 'TaskController@store')->name('tasks.store');
    // Important: this needs to be above the /tasks/{task} route
    Route::put('tasks/sync', 'TaskController@sync')->name('tasks.sync');
    Route::put('tasks/{task}', 'TaskController@update')->name('tasks.update');
});
```
Be sure to add this new route **above** the update route. This is important because the `/tasks/{task}` route would otherwise be triggered instead of the `/tasks/sync` route and our app would look for a task with an ID of ‘sync’. 

Add the new method to our controller:
```php
// app/Http/Controllers/TaskController.php

// ...
public function sync(Request $request)
    {
        $this->validate(request(), [
            'columns' => ['required', 'array']
        ]);

        foreach ($request->columns as $status) {
            foreach ($status['tasks'] as $i => $task) {
                $order = $i + 1;
                if ($task['status_id'] !== $status['id'] || $task['order'] !== $order) {
                    request()->user()->tasks()
                        ->find($task['id'])
                        ->update(['status_id' => $status['id'], 'order' => $order]);
                }
            }
        }

        return $request->user()->statuses()->with('tasks')->get();
    }
```
What we’re doing here is looping through all our columns checking if the **order** or **status** has changed for a task. If it has changed we update that task.

> Performance Note:
> This is not the most performant way to handle syncing the changes, but in a later part we’ll dive in and refactor this, as well as build a more robust API in general.

---
### Now it’s your turn
Right now we can create a new task and move it between our columns, and up and down in the list, but we can’t update or remove a task. Using what we’ve learned try to add this functionality to our Vue component and create the controller methods.

We’ll do it together in the next part and we can compare methods!

![Complete Kanban](https://dev-to-uploads.s3.amazonaws.com/i/lyyxz06v5451kjfvb6kd.png)
---
# Wrapping up
Phew, this part became much longer than I anticipated. If you made it this far congrats! It’s been a lot of fun to build and write up.

If you have any questions, or want to discuss different approaches, leave a comment.

## What’s next?
In the next part we’re going to:
- Implement [Vuex](https://vuex.vuejs.org/) as a state management system
- Customize our columns
- Update & remove tasks
- Refactor our API
- Build a repository layer between our Vue components and backend.

If there’s interest we’ll keep diving deeper into how to improve our code, refactor things and add test coverage.

### Github repo
Everything in this guide is on Github 👉 [GitHub - messerli90/laravel-vue-kanban-tutorial](https://github.com/messerli90/laravel-vue-kanban-tutorial)

{% github messerli90/laravel-vue-kanban-tutorial no-readme %}

I will add a branch for each part of this series. So if you check in the master branch it may look totally different than what we built above.

---

### Plug
A couple months ago I posted this blog:

{% link messerli90/i-built-a-tool-to-help-me-keep-track-of-my-job-hunt-jobhuntbuddy-3p0g %}

Since then I decided to try and build a real product around the idea. It uses a similar Kanban board as we built today to keep track of the status of a job application and offers lots of other features to help you manage your job hunt.

You can check it out here 👉 [JobHuntBuddy.co](https://jobhuntbuddy.co/)

The original JobHuntBuddy will remain **free** and **open source** and can be found here:
- [free.jobhunthuddy.co](https://free.jobhuntbuddy.co/)
- [GitHub - messerli90/jobhuntbuddy](https://github.com/messerli90/jobhuntbuddy)

Follow me on Twitter [@michaelmesserli](https://twitter.com/michaelmesserli) to connect and see my ramblings about tech, travel, and gaming.