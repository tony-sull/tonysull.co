---
category:
  - code
published: '2023-02-23T13:54:37Z'
---

The idea of a JS framework based on Finite State Machines got me thinking

Its really interesting to see JS frameworks shift back towards server rendering.

What if we leaning into web components and treating the DOM as our state?

---

Interactivity is managed by custom element attributes.

Site logic might boil down to really thin event handlers that querySelect()s a node and toggles an attribute.

This would leave a lot of state logic we're used to today without a home...

---

Have state that doesn't make sense in the DOM? It belongs on the server.

HTML partials would be really interesting here. Leave complex business logic on the server, only asking the browser for enough resources to handle basic user interactivity
