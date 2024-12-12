---
name: astro-webfinger 2.0
summary: Introducing support for multiple accounts and server-side rendering
category:
  - code
  - astro
  - opensource
published: '2023-03-10T14:07:24Z'
featured: '../../assets/uploads/2023-03-10-astro-webfinger-2.jpg'
---

Not sure what [Webfinger](https://webfinger.net) even is? Check out the `astro-webfinger` [announcement post](/articles/introducing-astro-webfinger/) for a quick rundown of what the heck the integration even does!

---

The first release of `astro-webfinger` was focused mainly on static sites, letting you create a vanity username for your fediverse (usually Mastodon) account from your own domain. The main caveat was that the Webfinger spec can't *really* be supported on a static site, the spec uses query parameters to search for account details and that requires a live server to work.

For example, fire up your Mastodon frontend of choice and search for `@tony@tonysull.co` - you'll find my account details. Now search `@spam@tonysull.co`, it resolves to the same account! That's because the actual search query is ignored, the static `wellknown` file always points to my [indieweb.social](https://indieweb.social) account.

## Multiple accounts and SSR

One [Vite](https://vitejs.dev) plugin refactor later and `astro-webfinger` now fully supports server-side rendering and multiple accounts!

Static builds are still supported (and encouraged!), the API hasn't changed there and the 2.0 update should be seamless.

If you do need to alias multiple [ActivityPub](https://www.w3.org/TR/activitypub/) accounts, or just don't like that search doesn't *really* work statically, we've got you covered.

### Configuration

```ts
import webfinger from 'astro-webfinger'

export default defineConfig({
  /**
   * BYO server-side rendering adapter
   * https://docs.astro.build/en/guides/server-side-rendering/
   */
  adapter: {},
  output: 'server',
  site: 'https://tonysull.co',
  integrations: [
    webfinger({
      tony: {
        instance: 'indieweb.social',
        username: 'tony',
      },
      spam: {
        instance: 'myinstance.social',
        username: 'fake'
      }
    }),
  ],
})
```

> Don't forget to add an SSR adapter for Astro! See [Enabling SSR in Your Project](https://docs.astro.build/en/guides/server-side-rendering/) for more details.

What's going on in the example above?

First, we need to make sure Astro knows the production domain for the project.

```ts
site: 'https://tonysull.co'
```

```ts
integrations: [
    webfinger({
      tony: { /* */ },
      spam: { /* */ }
  }),
],
```

Next, we tell `astro-webfinger` that there are two supported ActivityPub accounts. These account names are combined with the production domain — `tony@tonysull.co` and `spam@tonysull.co`

```ts
webfinger({
  tony: {
    instance: 'indieweb.social',
    username: 'tony',
  },
  spam: {
    instance: 'myinstance.social',
    username: 'fake'
  }
}),
```

Finally, we provide the account details for the real fediverse accounts. Note that the local usernames don't have to match the account they redirect to, like `spam@tonysull.co` redirecting to `fake@myinstance.social`. Redirects can also point to different instances, in this case one points to `indieweb.social` and the other points to `myinstance.social`.

## What's next?

A lot more details can be added to a Webfinger file, including custom aliases and links. Those aren't supported today and I'm definitely not a power user in the fediverse so I haven't had a need for it but could see that being helpful to others.

## Give it a try!

Already using Mastodon nad looking for a way to let people search for you with your super fancy custom domain? Head over to [npm](https://www.npmjs.com/package/astro-webfinger) for setup instructions.

Reach out if you [find a bug](https://github.com/tony-sull/astro-webfinger/issues), have a [feature request](https://github.com/tony-sull/astro-webfinger/discussions), or find me on [Mastodon](https://indieweb.social/tonysull) to get in touch!
