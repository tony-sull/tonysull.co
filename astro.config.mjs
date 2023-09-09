import { defineConfig, sharpImageService } from 'astro/config'
import webfinger from 'astro-webfinger'
import mdx from '@astrojs/mdx'

/* https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables */
const NETLIFY_PREVIEW_SITE =
	process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL

// https://astro.build/config
export default defineConfig({
	image: {
		service: sharpImageService(),
	},
	site: NETLIFY_PREVIEW_SITE || 'https://tonysull.co',
	integrations: [
		mdx(),
		webfinger({
			instance: 'indieweb.social',
			username: 'tonysull',
		}),
	],
})
