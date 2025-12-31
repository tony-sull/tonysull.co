---
name: 'MCP is the wrong answer to a problem solved decades ago'
summary: 'We are reinventing the self-describing web with MCP. Here is why we should have stuck with REST, XML, and XSLT instead of bolting on new protocols.'
category:
  - code
  - tech
  - simplicity
  - ai
published: '2025-12-31T10:00:00Z'
featured: '~/assets/uploads/2025-12-31-mcp-is-the-wrong-answer.jpg'
---

**tl;dr:** Anthropic’s Model Context Protocol (MCP) is being hailed as a breakthrough for AI tool discovery. In reality, it’s a modern band-aid for a wound we self-inflicted twenty years ago when we abandoned self-describing documents for "fast and loose" JSON-RPC.

---

The Model Context Protocol (MCP) is currently being sold as the "USB-C for AI." It’s a standard designed to let LLMs "plug in" to your data and discover tools. On the surface, it’s a pragmatic solution to the fact that AI agents are currently blind to our private data silos.

But if you’ve been building for the web for more than a minute, MCP doesn't feel like progress. It feels like an admission of failure. We are spending 2025 building a shiny new protocol to solve a problem that [Roy Fielding solved in his year 2000 dissertation on REST](https://roy.gbiv.com/pubs/dissertation/top.htm). 

We are bolting "discovery" onto the web because we spent the last two decades breaking the web’s native discovery engine.

### The Original "Tool Discovery"
We used to have a term for a standardized way to discover what actions can be taken based on the content itself. We called it a **Hyperlink**.

In a true RESTful system utilizing HATEOAS (Hypermedia as the Engine of Application State), a machine shouldn't need a sidecar JSON file or a specialized RPC protocol to know what to do next. The response itself tells you. If you’re looking at an "Order" page, the response includes a link to "Cancel Order" or "Add Item."

The anchor tag `<a>` is the ultimate discovery tool. It is a schema, a pointer, and an action all in one. But we moved away from that.

### The Great Regression: XML to JSON
Around 2005, the industry underwent a collective "vibe shift" from XML to JSON. 

XML was heavy and pedantic. It was associated with the [W3C’s](https://www.w3.org/) push for XHTML 2.0, a spec so rigid it wasn't backward compatible with the "broken" web that actually worked. The [WHATWG](https://whatwg.org/faq#what-is-the-whatwg) (the "Living Standard" group) founded by the major browser vendors themselves rebelled, giving us HTML5 and a more pragmatic web.

JSON won because it was a perfect mirror of JavaScript objects. But in our rush for developer ergonomics, we threw away the **Document**. 

Most APIs written in the last 20 years aren't actually RESTful, they are JSON-based RPC (Remote Procedure Calls). They are collections of "dumb" data buckets that require an out-of-band manual or documentation, like Swagger or [OpenAPI](https://www.openapis.org/), just to understand how to use them. MCP is just the latest version of this manual, rebranded this time for AI agents.

### Bolting on the Fix
Because JSON lacks a native way to describe its own structure or its own "next steps," we’ve spent two decades bolting schemas back on:

1.  **OpenAPI (Swagger):** An attempt to turn loose JSON into something predictable by wrapping it in a convention-heavy map.
2.  **MCP:** The same concept, using JSON-RPC 2.0 to let AI agents "negotiate capabilities."

We are building a bridge (MCP) to a bridge (OpenAPI) to a data format (JSON) that was chosen specifically because it *didn't* have the features we are now desperately trying to reinvent.

### The Rotting Power of XSLT
The real tragedy is that the "Unified Theory" of the web already exists, and we’re currently watching it be deleted from our browsers.

I’m talking about **XSLT** (Extensible Stylesheet Language Transformations). 

XSLT was designed to transform a single XML data source into whatever the consumer needed. If the consumer was a human, XSLT turned that XML into a beautiful HTML page. If the consumer was a machine, it could stay as raw, structured XML.

Critically, the latest specs like [XSLT 3.0](https://www.w3.org/TR/xslt-30/) have evolved to support JSON natively via functions like `parse-json()`. This means a single site using XSLT could interact with the long list of JSON-based APIs we've created over the last two decades, acting as a universal translator that serves the human (HTML) and the agent (Structured Data) simultaneously. 

Instead of adding MCP to the pile, we could have used XSLT to bridge the gap between our legacy JSON-RPC world and the self-describing web.

Instead, [Google and other browser vendors are now moving to remove XSLT support entirely](https://developer.chrome.com/docs/web-platform/deprecating-xslt), claiming "security risks" and low usage. But usage is almost certainly low because they let it rot. Most browsers are still stuck on XSLT 1.0 (from 1999), while the modern 3.0 spec has been ignored for years.

### A Simpler Vision
We never should have abandoned the document model, and we definitely shouldn't be bolting on yet another solution onto the Rube Goldberg machine we call today's internet.

Instead of an API for the human (the website), an API for the developer (JSON/OpenAPI), and an API for the AI (MCP), we could have **one**. 

A single XML endpoint would serve the data. An XSLT template would provide the "Human View" (HTML). That same XML, by its very nature, would provide the agent with a self-describing, schema-validated map of actions. No "negotiation" required.

We don't need a "USB-C for AI." We already have the "Standard Wall Plug" of the internet: the self-describing hypermedia document. We just need to stop pretending that adding another spec to the pile is the same thing as progress.
