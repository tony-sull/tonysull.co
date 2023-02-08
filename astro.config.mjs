import { defineConfig } from 'astro/config'
import image from '@astrojs/image'

/* https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables */
const NETLIFY_PREVIEW_SITE = process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL

// https://astro.build/config
export default defineConfig({
  site: NETLIFY_PREVIEW_SITE || 'https://tonysull.co',
  integrations: [image({ serviceEntryPoint: '@astrojs/image/sharp' })],
})
