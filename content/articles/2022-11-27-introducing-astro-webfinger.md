---
type: h-entry
title: Introducing astro-webfinger
summary: Integrating Mastodon profiles with Astro.
tags:
  - code
  - openweb
slug: introducing-astro-webfinger
published: '2022-11-27T21:55:21+00:00Z'
date: '2022-11-27T21:55:21+00:00Z'
photo: 'uploads/202211-27-introducing-astro-webfinger.jpg'
---

This is the first in a series of articles as I attempt to tie together concepts from the [IndieWeb](https://indieweb.com) and [ActivityPub](https://www.w3.org/TR/activitypub/) to build a self-hosted social network. Subscribe to the [RSS Feed](https://tonysull.co/articles/feed.xml) for updates!

---

Mastodon has been in the spotlight recently, largely as a reaction to concerns over the future of Twitter. I'm still not sold on Mastodon as a protocol, or as a user experience for that matter, but it's built on a collection of excellent protocols.

> 🌶️ Hot take 🌶️ I'm also not sold on federation as the right answer, or push-based designs in general. I can dive down that rabbit hole in a future article if you're is interested!

**tl;dr;** Just looking for the code? I published [`astro-webfinger`](https://npmjs.com/astro-webfinger) to make it easy to add Webfinger support to an [Astro](https://astro.build).

## Step 1: The Webfinger Protocol

What exactly is [Webfinger](https://webfinger.net)? Think of it as a way to add metadata to an email address. There's a bit more to it, but for the sake of Mastodon support it's just used as a way for one server to discover a Mastodon profile by email address.

### How does it work?

When you search for a user's profile on Mastodon you usually search for something similar to an email address, ex: you can find me on Mastodon by searching for `tonysull@indieweb.social`. Your Mastodon server sends a request to the `indieweb.social` server, specically to the `.well-known/webfinger` endpoint. For example, searching for my account will send a request to

```bash
indieweb.social/.well-known/webfinger?resource=acct:tonysull@indieweb.social
```

The response will include metadata about my account like my profile's homepage and the URL for reading a feed of my posts and activity.

### Can we self-host it?

Running your own Mastodon instance is hard. There are a few services out there that will host a server for a small monthly fee, though as of now many of them are out of resources and aren't accepting new customers.

Hopefully one day I'll be writing about how to fully integrate my own site into Mastodon, but for now the Webfinger metadata is just a bit of JSON...lets self-host it!

**Why?** For one thing, self-hosting it now means that I can change Mastodon servers later without having to go back and fix any links to my profile that I've already published. [@toot@tonysull.co](@toot@tonysull.co) will always link to my current Mastodon profile and will always be searchable, no matter how often I server-hop.

### What we'll need

I published the [`astro-webfinger`](https://npmjs.com/astro-webfinger) integration to make it easy to add Webfinger support.

If you're curious how to do this yourself I highly recommend [Lindsay Wardell's](https://www.lindsaykwardell.com/) [Integrate Mastodon with Astro](https://www.lindsaykwardell.com/blog/integrate-mastodon-with-astro) post. It not only goes into details on writing your own Webfinger support, and even dives into using Mastodon APIs to pull your Mastodon activity back into your own site!

## Setting up astro-webfinger

If you've worked with [Astro integrations](https://docs.astro.build/en/guides/integrations-guide/) before this will feel very familiar.

### Installation

```bash
# npm
npm i @astrojs/rss
# yarn
yarn add @astrojs/rss
# pnpm
pnpm i @astrojs/rss
```

### Configuration

To configure this integration, pass a `config` object to the `webfinger()` function call in `astro.config.mjs`.

```js
import webfinger from 'astro-webfinger'

export default defineConfig({
  integrations: [
    webfinger({
      instance: 'myinstance.social',
      username: 'myusername',
    }),
  ],
})
```

### Deploy

That's it! The integration will include a `/.well-known/webfinger` route to your build.

If you're already using [Server-Side Rendering (SSR)](https://docs.astro.build/en/guides/server-side-rendering) in your project it will also include the correct `Content-Type` header.

## What's next?

Currently, `astro-webfinger` will return your Mastodon profile regardless of the username that was actually searched. ex: search for `fake@tonysull.co` and you will still discover my Mastodon profile.

A future release of `astro-webfinger` will add an SSR mode that allows you to configure what usernames should be recognized in search results. This will also allow you to alias _multiple Mastodon profiles_ from the your own domain.
