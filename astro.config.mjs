import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import webfinger from 'astro-webfinger';

/* https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables */
import mdx from "@astrojs/mdx";
const NETLIFY_PREVIEW_SITE = process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL;

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: NETLIFY_PREVIEW_SITE || 'https://tonysull.co',
  integrations: [
    image({
      serviceEntryPoint: '@astrojs/image/sharp'
    }),
    mdx(),
    webfinger({
      instance: 'indieweb.social',
      username: 'tonysull',
    }),
  ]
});