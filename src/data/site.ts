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
		github_url: 'https://github.com/tony-sull',
		gitea_url: 'https://git.tonysull.co',
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
