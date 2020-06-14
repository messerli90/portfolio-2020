export default {
  all() {
    return projects
  }
}

const projects = [
  {
    title: 'JobHuntBuddy.co',
    slug: 'jobhuntbuddy',
    url: 'https://jobhuntbuddy.co',
    description:
      'Weekend Challenge. JobHuntBuddy is a web app helping job hunters manage the application process.',
    image: '/images/jobhuntbuddy_2.png',
    category: 'Web Apps',
    tags: ['SaaS', 'Laravel', 'Vue.js']
  },
  {
    title: 'Siegrs.GG',
    slug: 'siegrs',
    url: 'https://siegrs.gg',
    description:
      'Platform for players of Rainbow Six: Siege to browse other players and teams. Serving over 30k players',
    image: '/images/siegrs_banner_2.png',
    category: 'Web Apps',
    tags: ['Laravel', 'Vue.js', 'Gaming']
  },
  {
    title: 'JobHuntBuddy (Open Source)',
    slug: 'jobhuntbuddy-os',
    url: 'https://free.jobhuntbuddy.co',
    github_url: 'https://github.com/messerli90/jobhuntbuddy',
    description:
      'Weekend Challenge. JobHuntBuddy is a web app helping job hunters manage the application process.Built with Nuxt.js',
    image: '/images/jobhuntbuddy_2.png',
    category: 'Web Apps',
    tags: ['Open Source', 'Nuxt.js', 'Vue.js']
  },
  {
    title: 'IGDB API Wrapper',
    slug: 'igdb',
    packagist_url: 'https://packagist.org/packages/messerli90/igdb',
    github_url: 'https://github.com/messerli90/igdb',
    description: 'PHP wrapper/facade for the IGDB API',
    image: '/images/igdb_logo.png',
    category: 'Packages',
    tags: ['Open Source', 'Laravel', 'Gaming']
  },
  {
    title: 'Bittrex API Wrapper',
    slug: 'bittrex',
    packagist_url: 'https://packagist.org/packages/messerli90/bittrex',
    github_url: 'https://github.com/messerli90/bittrex',
    description: 'PHP wrapper/facade to query crypto exchange Bittrex',
    image: '/images/bittrex.jpeg',
    category: 'Packages',
    tags: ['Open Source', 'Laravel', 'Crypto']
  },
  {
    title: 'FirstPromoter API Wrapper',
    slug: 'firstpromoter',
    packagist_url: 'https://packagist.org/packages/messerli90/first_promoter',
    github_url: 'https://github.com/messerli90/first_promoter',
    description: 'PHP wrapper/facade to interact with FirstPromoter API',
    image: '/images/firstpromoter.png',
    category: 'Packages',
    tags: ['Open Source', 'Laravel']
  },
  {
    title: 'FreedomGround.com',
    slug: 'freedomground',
    description:
      'Contest voting system, sweepstake algorith, and affiliate marketing program.',
    image: '/images/freedomground.png',
    category: 'Professional',
    tags: ['Laravel', 'SaaS']
  }
]
