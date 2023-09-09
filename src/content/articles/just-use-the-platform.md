---
name: Just use the platform.
summary: The whole MPA vs. SPA debate in web development really was poorly named, obscuring the main point. Here's why.
category:
  - code
published: '2023-08-07T13:30:00Z'
featured: '../../assets/uploads/2023-08-07-just-use-the-platform.jpg'
---

The debate has revolved around whether page navigations should require a full page refresh.

The real question, though, has been whether web developers should use the platform or reinvent the wheel for every site.

No one ever used a single page application and said "eww gross, this feels like a native app!"

The idea behind building an MPA is to use what the browsers give us, and so far that has been a full page refresh with the pros and cons that go along with it.

The concern is with recreating support for page history, the URL bar, caching, etc.

Reinventing browser specs assumes that spec authors didn't know what they were doing or browser developers shipped buggy implementations that don't meet user needs – and aren't worth improving.

Newer specs like the View Transitions and shared elements blur the line between MPA and SPA.

Multi-page apps will be able to ship full HTML pages and achieve page transitions that feel seamless, complete with elements that persist state across pages.

So back to the original debate. We got lazy in the web dev community and latched the "use the platform" debate onto a limitation with page transitions and full refreshes.

This never was the real debate at all as far as I can tell, just a convenient line to draw for catchy names.

The question is whether sites should abandon core built-in features to rebuild one.

And if the browser specs don't meet today's needs, should we discuss new specs rather than throw out the old ones and take on the burden of reimplementing and supporting the same exact features?

**Moral of the story:**

The web is built on specs. They can be slow moving and there is a time and a place for polyfilling and testing proposed specs in userland code, but the goal should always be to clarify patterns and solidify those in open specs that can be supported long term.
