---
name: 'Routing on the web is complicated - our routers should be simple'
summary: URLs are a fundamental part of the web, and a surprisingly complicated problem. Routing in JavaScript frameworks keeps getting more complex — it's about time we standardize on a simple, universal spec.
category:
  - code
  - simplicity
published: '2023-02-18T17:58:23Z'
featured: '~/assets/uploads/2023-02-18-routing-is-complicated.jpg'
---

Routing on the web is a complicated problem, and kind of a big deal considering your site just won't work if URLs are busted. More often than not we (we as in people, not just coders) see complicated problems and throw complex solutions at them, adding more and more complexity until we have it **under control\***. We as web developers owe it to ourselves to take a step back from framework router hell to have a frank discussion about what the best way forward is.

---

Even if your site builds to static HTML/CSS/JS, and **it probably should**, you still have to consider routing. Should your about page live at `/about.html` or `/about/index.html`? How will you handle redirects, especially on a localized site that supports multiple languages? If you're using a static site generator (SSG) like [Astro](https://astro.build) or [11ty](https://11ty.dev), what conventions and rules does the build system use to go from page templates to `.html` files?

Jump into a server-side rendered (SSR) and you need to consider how errors and 404s are handled — an unhandled error in an SSG might break the build but an unhandled error when server rendering will likely end up returning a 500 error or showing the visitor a blank page. Ultimately routing concerns for a SPA are really similar to modern SSGs though, case in point Astro [added SSR support](https://astro.build/blog/experimental-server-side-rendering/) without any meaningful changes to how its router worked.

Then comes the real elephant in the room — single page applications (SPAs). The debate over SPAs has been going on for damn near a decade, but at the end of the day if SPAs are your thing then go for it! SPAs add a lot of complexity in client-side routing, but we're talking about server-side routing today so lets gloss right over that [back button](https://medium.com/glazed-dev/the-perils-of-reinventing-the-browsers-back-button-8c7d613b831e).

## Complication breeds complexity

There's a (probably annoying) nuance in these two words.

> Complicated problems can be hard to solve, but they are addressable with rules and recipes, like the algorithms that place ads on your Twitter feed. Complex problems involve too many unknowns and too many interrelated factors to reduce to rules and processes. - Theodore Kinne, [MIT Sloan Review](https://sloanreview.mit.edu/article/the-critical-difference-between-complex-and-complicated/)

Specs and browser standards landed on a set of [rules](https://url.spec.whatwg.org/) and [considerations](https://www.w3.org/TR/2011/WD-html5-20110525/urls.html), but these specs were really written more to manage the networking considerations rather than how a server internally handled routing. This was possible because routing is **complicated** but not **complex**.

Routing in a JavaScript-based web framework is similarly complicated, unfortunately we haven't yet circled the wagons to define a framework routing standard and the constant push to add more features left us with a pile of **complex** solutions.

What template/component/function should be used to render the URL? Is the URL even valid? How are URL parameters matched for dynamic routes like `/blog/post-123`? What happens if two templates match the same URL? What's the "right" developer experience (DX)? These are really tricky questions to answer because they end up rooted more in tradeoffs and opinions than anything else.

So what are we to do? The most clear answer here is to start from the top and write a list of rules for how routing works in *our* framework.

### Route matching

Debate file-based routing vs. config-based routing, then pick one...or go nuts and support both.

[Whiteboard](http://wtw.dev/) all the syntaxes we can think of for URL parameter matching. Maybe a regex-able string like `/blog/:slug` does the trick. Or a file naming convention like `/pages/blog/[slug].html`. We are in JavaScript land after all, maybe an object to define routes will do the trick?

```js
import BlogIndexPage from './routes/BlogIndexPage'
import BlogPostPage from './routes/BlogPostPage'

const routes = [{
  path: "/blog",
  component: BlogIndexPage,

  children: [{
    path: [":slug"],
    component: BlogPostPage,
  }]
}]
```

Any solution here will have the possibility of naming collisions where multiple routes match the same URL. i.e. `/blog/latest` would match `/blog/[slug].html`. That's probably not what we want since the template would have to know about this and handle `lastest` as a special slug, time for a set of rules defining priority order.

Ok cool, now how do we validate URL parameters to make sure the blog post slug was valid?

### Route validation

With file-based routing this would be handled in the template itself, likely throwing an error or redirecting which both add features and complexity. Maybe we get fancy and support regex-like syntax in the file naming convention, a la `/pages/[lang(en|sp)]/blog/[slug].html`.

Config-based routing might open a few doors here, what if each route can have a validation function?

```js
import BlogIndexPage from './routes/BlogIndexPage'
import BlogPostPage from './routes/BlogPostPage'
import { getPost } from "./db/definitely-not-mysql.js"

const routes = [{
  path: "/blog",
  component: BlogIndexPage,

  children: [{
    path: [":slug"],
    component: BlogPostPage,
    check: async ({ slug }) => {
      const post = await getPost(slug)
      return !!post
    }
  }]
}]
```

When the validation fails we probably want to handle that gracefully. Does our router need a special 404 template? Redirects might be important here, so `/blog/fake-post` can redirect to the main blog page instead of a 404 — does the router automatically redirect to the closest parent route, or expose a redirect convention/helper function? Can we at least stick to specs here and use a standard `Response` object?

### Page layouts

It's pretty common for a site design to reuse layouts/wrappers for sections of the site. i.e. every page has the same header/footer and every blog page has the same sidebar recommending latest posts **in addition to** the global header/footer.

That sure feels related to routing, to avoid code duplication our router really should build that formula in so layouts are nested by default. But wait, we need an escape hatch right? `/blog/latest` and `/blog/:slug` should reuse the same layout but that might not make sense for `/blog/:slug/edit`.

Time for a bit more complexity. Should a page be able to eject it's parent layouts with some kind of boolean flag or API? Maybe even a `use myownlayout;` [pragma](https://ahmadawais.com/pragma-mean-programming/)?

Do we tweak the file naming convention to group routes by shared layout, something like `/pages/[lang(en|sp)]/blog/(public)/[slug].html` where the `(public)` is ignored in the URL and only used for folder structure? Config-based routing may be easier here, if we're okay with additional ambiguity related to route collisions and more priority rules.

```js
import RootLayout from './layouts/RootLayout'
import BlogLayout from './layouts/BlogLayout'
import BlogIndexPage from './routes/BlogIndexPage'
import BlogPostPage from './routes/BlogPostPage'
import BlogPostEditPage from './routes/BlogPostEditPage'
import { getPost } from "./db/definitely-not-mysql.js"

const routes = [{
  path: "/",
  layout: RootLayout,
  
  children: [
    {
      path: "/blog",
      layout: BlogLayout,
      component: BlogIndexPage,

      children: [{
        path: ":slug",
        component: BlogPostPage,
        check: async ({ slug }) => {
          const post = await getPost(slug)
          return !!post
        }
      }]
    }, {
      path: "/blog/:slug/edit",
      component: BlogPostEditPage
    }
  ]
}]
```

## Was it worth it?

I went out of my way here to avoid grabbing examples from any specific framework or router. Regardless of what Twitter might lead you to believe, when it comes to open source frameworks its a small world of passionate, dedicated individuals working solve real-world problems to make everyone elses' job just a bit easier. The last thing we need is yet another Framework A vs. Framework B debate.

What we really need is to rally the troops and stop solving the same problem fifteen different ways. Routing is effectively table stakes for a modern framework at this point, why reinvent the wheel? We'd be better off with one standard way of handling request routing in the server, even if that means foregoing some of the nice convenience features we have today in the name of a simple paradigm.

Rant over. I'll leave you with this hot take.

> 🌶️ If you can't describe how a router works in two sentences or less, it's too complex. A developer that isn't familiar with the code should be able to go from a URL to all code require to actually render the page.
