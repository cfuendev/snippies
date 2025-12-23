### color-parse
A microlibrary (Available as both a cjs and mjs module) for parsing strings into HEX with support for:
- CSS Color Names (ie. `red`, `blue`, `green`, `white`, `black`, etc.)
- RGB (Must be the `rgb(rrr,ggg,bbb)` or `rrr,ggg,bbb` formats)
- HEX (Must be `#RRGGBB` or `0xRRGGBB` formats)
- Tailwind Colors (ie. `blue-500`, `lime-200`, `zinc-400`, etc.)

I'm planning to support more colors in the future such as LSV, HSL and Imba colors, but for now this is it.

Here's a (quite lengthy) example from my Discord Bot 'Sudo':

```js
    try {
      parsedColor = cssUtils.parseRGB(options.color);
      console.log(`⚙️  The provided value '${options.color}' is an RGB value: ${parsedColor.toString(16)}`);
    } catch (err) {
      console.log(
        `⚙️  The provided value '${options.color}' is not an rgb() nor a comma-delimited RGB value`
      );
    }

    if (!parsedColor) {
      try {
        parsedColor = cssUtils.parseHEX(options.color);
        console.log(`⚙️  The provided value '${options.color}' is a HEX value: ${parsedColor.toString(16)}`);
      } catch (err) {
        console.log(
          `⚙️  The provided value '${options.color}' is not a # nor a 0x HEX value`
        );
      }
    }

    if (!parsedColor) {
      try {
        parsedColor = cssUtils.parseTailwindColor(options.color);
        console.log(`⚙️  The provided value '${options.color}' is a Tailwind color: ${parsedColor.toString(16)}`);
      } catch (err) {
        console.log(
          `⚙️  The provided value '${options.color}' is not a Tailwind color`
        );
      }
    }

    // El último error no se catchea para elevarlo y que Sudo lo reporte al usuario
    if (!parsedColor) {
      parsedColor = cssUtils.parseCSSColorName(options.color);
      console.log(`⚙️  The provided value '${options.color}' is a CSS Color: ${parsedColor.toString(16)}`);
    }

    botIO._bot.guilds.get(botIO._msg.guildID).createRole(
      {
        name: name,
        color: parsedColor,
      },
      (reason = options.reason)
    );
```

### fuseSearch
A single wrapper that abstracts basic Fuse.js searches down to a single function

The following example is the implementation of fuseSearch I use in my portfolio blog for the search page:

```javascript
// event is triggered when typing smth on the searchbar
document.querySelector('#SearchBar input').addEventListener('input', (e) => {

  // clear the search results
  document.getElementById('SearchResults').innerHTML = ''

  // search with fuse.js
  search(articles, ['title', 'language', 'tags'], e.target.value).map(
    (result) => { return result.item.html } // item.html is the result's innerHTML, so we retrieve it
  ).forEach((resultHTML) => {
    let resultElm = document.createElement('div') // create the result dom node
    resultElm.innerHTML = resultHTML; // fill it up with it's innerHTML
    resultElm.className = 'Result'; // classname so that css can be applied
    document.getElementById('SearchResults').appendChild(resultElm) // appended to search results
  })
})
```

### dayjs-semantic-months
A module exporting a single object whose properties are dayjs' zero-based, numerical representations of months, each labeled with it's respective name.

This produces more readable code when used to manipulate months:
```javascript
import dayjs from 'dayjs';
import months from './dayjs-semantic-months'

// Defining the month as a constant to maximize readibility

const july = months.july

dayjs()
  .date(21)
  .month(july)
  .year(2002)
  .hour(-5)
  .minute(0)
  .second(0)

// ...Or just using the value straight from the module

dayjs()
  .date(21)
  .month(months.july)
  .year(2002)
  .hour(-5)
  .minute(0)
  .second(0)
```
Without dayjs-semantic-months:

```javascript
import dayjs from 'dayjs';

// Default way to use the API

dayjs()
  .date(21)
  .month(5)
  .year(2002)
  .hour(-5)
  .minute(0)
  .second(0)
```
