<template>
  <div class="mb-3 mx-auto max-w-3xl flex flex-wrap justify-center">
    <TagFilterItem
      v-for="(tag, i) in tags"
      :key="i"
      :tag="tag"
      :is-active="isActive(tag)"
      v-on:tag-changed="updateActiveTags"
    ></TagFilterItem>
  </div>
</template>

<script>
import TagFilterItem from "@/components/TagFilterItem";
export default {
  props: ["tags"],
  components: {
    TagFilterItem,
  },
  data() {
    return {
      activeTags: [],
    };
  },
  methods: {
    updateActiveTags(tag) {
      if (this.activeTags.includes(tag)) {
        this.activeTags.splice(this.activeTags.indexOf(tag), 1);
      } else {
        this.activeTags.push(tag);
      }
      this.$emit("update-active-tags", this.activeTags);
    },
    isActive(tag) {
      return this.activeTags.includes(tag);
    },
  },
};
</script>

<style></style>
