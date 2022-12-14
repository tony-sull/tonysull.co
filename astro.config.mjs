import { defineConfig } from 'astro/config'
import image from '@astrojs/image'

// https://astro.build/config
export default defineConfig({
  site: 'https://tonysull.co',
  integrations: [image({ serviceEntryPoint: '@astrojs/image/sharp' })],
})
