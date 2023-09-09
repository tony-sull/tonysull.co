---
name: What I look for in an SSR router
summary: Routing in an SSR framework is complicated - here's my must-have list for a request routing API.
category:
  - code
  - simplicity
published: '2023-02-22T17:58:23Z'
featured: '../../assets/uploads/2023-02-22-my-ideal-ssr-router.jpg'
---

Thought I'd follow up on a rant I published over the weekend about [how complicated routing is](https://tonysull.co/articles/routing-is-complicated/) — request routing on the server that is, don't let me near your network router!

**tl;dr;** Request routing is a complicated issue that's a fundamental feature of monolithic JavaScript frameworks. Whether your tool of choice is a static site generator like [11ty](https://11ty.dev), a server-first framework like [SvelteKit](https://kit.svelte.dev), or something in the middle like [Astro](https://astro.build) they're all having to deal with request routing. What would a shared router spec look like if it needed to work _well enough_ for every framework?

---

## Start simple

> 🌶️ If you can't describe how a router works in two sentences or less, it's too complex. A developer that isn't familiar with the code should be able to go from a URL to all code require to actually render the page.

Above all, when I'm looking for a router I want simple. Like really simple. Ever hear the argument that filing taxes should be easy enough that it fits on a single postcard? Router API docs should be even easier.

The number of code paths and potential edge cases balloons as complexity grows. Request routing is too fundamental in a server framework to risk unnecessary complexity.

## Route parameters

Dynamic routes are key if you want reusable code, ideally one route for something like `/blog/:slug` can be used to render every blog post on the site.

This can be handled a few different ways, and even skipped if you're using local files and are cool with referencing a layout every time, but this is a must for anything using a remote data source like a CMS.

## Redirects

This one seems like a no brainer, servers need redirects. This can be as simple as an API for one route to tell the framework a request actually needs to be handled elsewhere.

This can also get a bit more clever with automatic 404 handling where a fallback route is rendered when the request doesn't match any known routes. This does lead to a bit of convention overhead though, more on that later.

## Easy to debug

Say a bug is reported on a blog index page, for some reason draft posts are still being shown in production. I want to know exactly where to go to start debugging, and ideally that means the logic for rendering that URL should all start from one file.

There's been a trend recently for frameworks to split route logic across multiple files: `+layout.whatever`, `+loader.gql`, `+page.nothtml`, `+styles.idontlikecss`. Where do I start for that bug? Is it in the loader? Is a filter function in the page broken? Is the data actually being loaded by a parent route, passed down through some nested layout logic or a `<Provider>`?

I get _why_ splitting this logic across files is helpful for frameworks. It can make bundling more efficient, it helps define conventions that draw the line between client & server, and it looks cool as hell in a file tree.

I've used plenty of routers over the years and by far the nicest developer experience I've had is with routers that start each route from one file. I can go straight there and see where the data is loaded, how the data is processed, and where its rendered to HTML. No bouncing between files, no remembering the "right" convention for where data loading lives in the file structure or component tree. Simple.

## Minimize convention

Which leads us to...convention. Solutions and API designs based on convention always throw up red flags for me. Adding a random character like `$` after a function name to imply some bundling magic seems like a nice idea, but that's one more rule I have to memorize — a rule that's based entirely on convention (i.e. arbitrary) and has no meaning behind it that I can learn from.

Why a `$` character? Why not `&`, `_`, or `%`? What does a random character in my function name have to do with bundling? Nothing. Absolutely nothing. Its just a rule you have to remember.

Don't get me wrong, convention can also be helpful and arguably necessary but it should be a rare last resort. Every convention has to be memorized and kept ready while you're coding, because while you can name your function whatever you want (no convention), you **must** add a `$` to it for bundling.

In the case of routing the `+layout`, `+page`, `+somethingbroke`, etc is pure convention. The names kind of make sense at least, but why do they have to be separate files? Can't I architect my project in the way that works best for me and my team?

## Not component based

If framework libraries are meant to be a component-based approach for rendering DOM, why the heck are components so often used for things _other_ than rendering DOM?

Defining routes, context providers, etc. as components really blurs the line in a confusing way IMO. If a component is just logic and doesn't actually render anything, it really shouldn't be a UI component at all. This pattern has always felt a bit more like a solution to a more fundamental problem with a component framework, or JSX itself.

I know this one is very much **my own opinion**, but its my wish list and I'll cry if I want to.

## Type safety (nice to have)

This ones really a new addition to the list thanks to the work [Tanner Linsley](https://twitter.com/tannerlinsley) has been doing on [TanStack Router](https://tanstack.com/router).

The idea of being able to automatically type check a URL and its parameters is pretty compelling. Heck, I'd be happy with just the basics of verifying string vs. number in a URL or comparing the requested language against an enum of supported locales.

## What's next?

I'm biased here, I work for [Astro](https://astro.build) and done a decent amount of work on our router. I prefer file-based over config-based routing, and [Sapper](https://sapper.svelte.dev) got me onboard with the `[slug]` filename convention for URL parameters years ago.

That's not the only solution though, and frankly there might be very good reasons that a universal routing API would need to be config-based. What we really need is to accept that routing is so core to an app that we can't keep piling on features and conventions.

There's plenty to complain about the standards process for updating web specs, but it's served us pretty well so far. I'd love to see frameworks follow a similar model, aligning on a single routing solution rather than reinventing the wheel eight different ways.
