---
category:
  - css
published: '2023-02-12T02:24:36Z'
---

Opinions aside, I keep running into two fundamental blockers with Tailwind CSS … not quite sure what to do about these yet

👇 🧵

---

Logical properties like padding-inline or block-size fundamentally won’t work

i.e. it only really works with left-to-right (LTR) languages

That's fine for a smaller project, but a show stopper for something a properly translated site like [Astro's docs](https://docs.astro.build)

---

Code splitting seems to be a real challenge regardless of framework

Utility classes used on any page often bleed out to every page on the site

Call it a bundler challenge or even an optimization for page transitions, but I don't want complex /admin styles on my landing page