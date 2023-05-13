### thousandComma
A single function that adds thousand separators (The comma that marks the thousad unit in a number) to a given numeric value

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

**NOTE:**
For now, this module doesn't support inserting ellipsis (...) into the original text, but that will be easily added later.