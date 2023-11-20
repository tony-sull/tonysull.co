---
name: The hidden costs of JS metaframeworks
summary: There are some really important implications of building your web product with a metaframework. These don't get talked about enough.
category:
  - tech
  - code
published: '2023-11-20T19:05:30Z'
featured: '~/assets/uploads/2023-11-20-hidden-cost-of-metaframeworks.jpg'
---

The term "metaframework" isn't particularly well defined, though its generally used to refer to tools like [NextJS](https://nextjs.org/), [NuxtJS](https://nuxt.com/), and [SvelteKit](https://kit.svelte.dev/).

There are plenty of benefits to these types of tools. I won't go into the reasons why you _would_ use one here, mainly because the tools do a good job highlighting benefits themselves. Maybe I'll write a future post going down that rabbit hole, but the **tl;dr;** is that metaframeworks are great to start projects quickly if you're okay with scrapping the codebase and starting over later if the project actually scales.

## The problem

Picking a metaframework for your next project defines your team structure and hiring goals.

The lines between backend and frontend blur, to the point that there may not be a distinction anymore.

Infrastructure, maintainability, testability, and scaling considerations all change.

## Hiring

Almost every technical hire you make will likely need to be a full-stack engineer, bonus points if they specialize a bit.

Your SQL specialist will need to understand bundlers, JS tooling, and may need to know what "import server", "use server", and "use client" all do.

Your HTML/CSS and accessibility experts will need to know how to work in your JS component framework of choice.

If you pull in Tailwind because styling in JS can be painful, they'll need to know that as well.

## APIs

If you have, or plan to have,a public API it may need to be entirely separate from your own frontend project.

Now that RPCs are new stew rather than 3 day old halibut (RIP Anthony Bourdain), your project is likely using APIs created by the bundler without versioning or documentation.

## Bug reproducability

Bug reproducability is going to be tricky too.

Application flow now moves between SSR, client rendering, and functions marshaled back to the server via RPC calls.

When a user hits an error, where do you look? How do you recreate it locally? And how do you automate a test?

I'll assume that you're deploying to a serverless or edge environment. In that case, you likely can't recreate the production environment locally if you wanted to.

Developers won't be able to locally reproduce the deployed hardware, production OS, or the production network. The same goes for end users' hardware and network conditions, reproducing client rendering and network issues will be tricky or impossible.

## Moral of the story

I'm sure there's more I'm missing here, and I haven't touched on the pros though I know there are some.

The moral of the story, though, is to avoid diving into a brand new metaframework because its the most hyped online. These tools are brand new and are an amalgamation of so many different concepts (both new and repurposed) that we don't yet know what we don't know.

Picking your tech stack cna have a profound impact in the long term. Choose your dependencies carefully, sticking with "boring" tech as much as possible.

Throwing in a couple carefully picked bets on newer tech is totally reasonable, but those bets really shouldn't be so all-encompassing that you need to reconsider your organizational structure or hiring practices.
