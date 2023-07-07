import share from '../assets/share.jpg'

const site = {
  title: 'Tony Sullivan',
  description: 'Tony Sullivan is a fullstack developer based in Onbekend, USA.',
  url: 'https://tonysull.co/',
  domain: 'tonysull.co',
  author: 'Tony Sullivan',
  location: 'Onbekend, USA',
  social: {
    image: share,
    twitter_handle: '@tonysull_co',
    twitter_card: 'summary_large_image',
    twitter_url: 'https://twitter.com/tonysull_co',
    github_url: 'https://github.com/tony-sull',
    mastodon_url: 'https://indieweb.social/@tonysull',
  },
  feeds: {
    all: {
      rss: '/rss.xml',
      json: '/feed.json',
      atom: '/atom.xml',
    },
  },
}

export default site
