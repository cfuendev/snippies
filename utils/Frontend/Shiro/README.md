# Shiro Classic

Shiro Classic is a Web Component library to give your HTML templating superpowers without the bloat.

## Web Components?

"Web Components" is capitalized here because it's the name of a [Web-Standard API](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) supported by all major browsers, which enables JavaScript client-side components that contain scoped HTML, CSS and, JS without having to step out of vanilla JS; an extremely fast and browser-native alternative to JavaScript frameworks. All Shiro components are Web Components.

## Superpowers?

Shiro Classic provides simple components and wrappers for client-side stuff like iterating through data and placing pieces of that data in the HTML. Useful if you're getting JSON from the back-end.

## Bloat?

The only problem with the Web Component approach is that, although the Web Components API already works like a charm, it's just not a very ergonomic API. For this reason, Shiro Web Components are built with [Lit](https://lit.dev/), a lightweight (5.8 kB min + gzipped) Web Component wrapper library that makes the Web Component DX way more comfy.

Additionally, Lit is a fairly fast and memory-efficient framework according to the [Krausest Benchmark](https://krausest.github.io/js-framework-benchmark/2024/table_chrome_126.0.6478.55.html), so Shiro components won't make your webapp performance dip.

# Components

### shiro-map

This component dynamically renders data-driven templates by:

1. Accepting a callback function that fetches data
2. Using a slotted template with special attributes (data-mapstart, data-map)
3. Cloning the template for each data item
4. Populating template slots with corresponding data values

```html
<shiro-map .callback=${() => fetchData()}>
  <!-- Template (will be removed after rendering) -->
  <div data-mapstart>
    <div id="Name" data-map="name"></div>
    <div id="Email" data-map="email"></div>
    <div id="City" data-map="address.city"></div>
  </div>
</shiro-map>
```

For each data item like:

```json
{ 
  name: "Alice", 
  email: "alice@example.com",
  address: { city: "New York" }
}
```

The component will generate:

```html
<div>
  <div id="Name">Alice</div>
  <div id="Email">alice@example.com</div>
  <div id="City">New York</div>
</div>
```

# Classic? (Philosophy)

I built the `shiro-map` component while I was building an custom [from-scratch ERP solution for a company](https://hdl.handle.net/20.500.12495/13665) only with Lit.js Web Components. Back then my approach to developing webapps was less SSR centered and, given the complexity of the data we were messing with, I chose the path of forcing JavaScript do most of the heavy lifting in terms of UI rendering while keeping the UI separated by components.

During this time there was a heavy focus in the back-end logic given we were implementing a very complex database caching system, plus me and the colleague that I worked side-by-side with on the project spent most of our time working in parallel, often leading to each of us having to write our own code and agreeing on a standard communication format that would save us from having to refactor or re-write at the time of unifying both sides of our app: JSON. This lead to me having to figure out a way to both iterate through many rows of data and also take attributes of the rows and write them into the HTML.

During that time, I dreamed of the `shiro-map` component and any other similar components I developed in the future becoming my main toolset for developing SPAs, specially in the context of digital transformation for SMEs, which is why I initially had enough tunnel vision (Fueled by the sleep deprivation of countless nights of coding and writing to meet the deadlines set by our Thesis Committee) to call this library "Bux", with the mapping/loop component being called `bux-map`.

Unfortunately, my mindset towards how applications should be built has moved away from the CSR approach that I felt was so necessary back then and I now prefer to apply content-driven static generation and SSR where needed instead of jumping hoops in the front-end while all the backend does is retrieve basic information.

With this shift in focus, my intention is to create a new Shiro library that will server as a minimal, zero-framework, from-scratch component library that won't try to re-invent the templating wheel and instead will only provide ergonomics for features that rely on client-side UI logic like modals, toast notifications and animation.