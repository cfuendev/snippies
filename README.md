# snippies
Helpers and wrappers that implement stuff I'm not willing to re-invent

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

### thousandComma
A single function that adds thousand separators (The comma that marks the thousad unit in a number) to a given numeric value

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
