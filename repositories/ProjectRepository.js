export default {
  all() {
    return projects
  }
}

const projects = [
  {
    title: 'JobHuntBuddy',
    slug: 'jobhuntbuddy',
    url: 'https://jobhuntbuddy.com',
    description:
      'Weekend Challenge. JobHuntBuddy is a web app helping job hunters manage the application process.',
    image: '/images/jobhuntbuddy_2.png',
    category: 'Web Apps',
    tags: ['gaming', 'Laravel', 'Vue.js']
  },
  {
    title: 'Siegrs.GG',
    slug: 'siegrs',
    url: 'https://siegrs.gg',
    description:
      'Platform for players of Rainbow Six: Siege to browse other players and teams. Serving over 30k players',
    image: '/images/siegrs_banner_2.png',
    category: 'Web Apps',
    tags: ['Laravel', 'Vue.js', 'mysql']
  }
]
