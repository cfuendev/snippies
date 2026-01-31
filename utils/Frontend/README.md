<h1> Frontend </h1>

<h3> Table of Contents </h3>

- [Not Deprecated](#not-deprecated)
  - [fileFromResponse](#filefromresponse)
  - [more\_input](#more_input)
  - [Shiro](#shiro)
- [Deprecated](#deprecated)
  - [isMobile (deprecated)](#ismobile-deprecated)


## Not Deprecated
### fileFromResponse

This is a JavaScript function that expects a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) representing a file (This is the way that [Flask](https://flask.palletsprojects.com/en/3.0.x/) sends files through HTTP) and automatically downloads the file obtained from the `Response` object, using the `Response.blob()` method and creating a temporary anchor element to trigger a fake `click` event, then download the file to the user's machine.

### more_input

This is a simple Jinja macro (Basically a server-side component for Jinja) to quickly implement those inputs. You press the '+' button and it inserts another input before itself.

You can import it by doing:

```jinja
{% from "./your/path/idk/more_input.jinja" import more_input %}
```

Then use it:

```jinja
    <form>
        {{ more_input('Test', 'Test Plus Input', style="display: flex; flex-direction: column; gap: 5px;") }}
    </form>
```

### Shiro

Shiro is a little set of Web Components aimed to provide things that are normally only available and way more ergonomic through a JavaScript framework like Vue or Svelte such as rendering elements based on the contents of a list, without actually having to lock yourself into a JavaScript framework.

If you're interested, just explore the directory! For now all the elements included are the Basic selections.

---

## Deprecated

### isMobile (deprecated)

A JavaScript snippet I used a while ago to detect if I was on a mobile device on the client-side. This is basically just a media query for JavaScript, which did work on an old app I worked somewhere around August 2023 after a lot of refining. However, I have since moved away from this snippet and there are two really good libraries that I've replaced `isMobile` with to simplify my workflow:

- [isMobile](https://github.com/kaimallea/isMobile) (literally the same name lol)
- [Bowser](https://github.com/bowser-js/bowser)

And, if you're interested in getting started quickly with them, I made a little [CodePen sandbox](https://codepen.io/zxskyyy/pen/pomawbV) where I prototyped a simple example of the granular control you get over what you show depending on if you're on a certain type of device and on a specific browser by pairing both `isMobile` and `Bowser`.