# snippies
Helpers and wrappers that implement stuff I'm not willing to re-invent

<!--
Utils
  @cfuen/deep-equal
  @cfuen/unique-property
  @cfuen/remove-from-array
  @cfuen/thousand-comma
  @cfuen/kobeni-stutter

Snippets
  fuseSearch
  dayjs-semantic-months
-->

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

### getObjectsWithUniqueProperty

A function that takes an array of objects and returns a copy where no element has a duplicate value of a specified property.

For example:

```javascript
// articles is a list of articles. Some of the articles have the same name
let articles: {}[] = [
  {title: "a", content: "aaaaa"},
  {title: "b", content: "bbbbb"},
  {title: "b", content: "ccccc"},
  {title: "c", content: "ddddd"},
  {title: "d", content: "eeeee"},
  {title: "c", content: "fffff"},
];

// so, to get an array of articles with distinct titles
getObjectsWithUniqueValue(articles, "title");
// [ {title: "a", content: "aaaaa"}, {title: "b", content: "bbbbb"}, {title: "c", content: "ddddd"}, {title: "d", content: "eeeee"}];
```

### kobeniStuter

A module that exposes a function through which you can make any string look like Kobeni Higashikata from Chainsaw Man is saying it. Currently using it for a small personal project, but I'm pretty sure there's someone out there who wants to automate text string kobenification.

The output is randomized and depends on the amount of words that the string passed to the main `kobeniStutterString()` function is made up of. First, a random word is "stuttered" to make sure that if the String is a single word, that word is "stuttered". In the case that the string is longer than a word, for the remaining words, if the number of words is even, half of the words will be "stuttered". If the number is odd, only a third of the words will be "stuttered".

For example, for the input:

```js
kobeniStutterString("Hi! I'm Kobeni!")
```

We can get:

- "H-H-Hi! I'm K-K-Kobeni!"
- "H-Hi! I'm K-Kobeni!"
- "Hi! I-I-I'm K-Kobeni!"
- "H-H-Hi! I-I-I'm Kobeni!"

And so on.

For now, this module doesn't support inserting ellipsis (...) into the original text, but that will be easily added later.