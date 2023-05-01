const kobeniStutterWord = (word) => {
  const stutter = `${word[0]}-`;
  let returnable = stutter + word;
  for (let i = 0; i < Math.floor(Math.random() * 2); i++) {
    returnable = stutter + returnable;
  }
  return returnable;
};

const kobeniStutterString = (str) => {
  const splitStr = str.split(/\s/);
  let randomNumber = Math.floor(Math.random() * splitStr.length);
  let stutterStr = [];
  stutterStr[randomNumber] = kobeniStutterWord(splitStr[randomNumber]);
  // do not go into the rest of stuttering process if string has less than 2 words
  // this literally crashes the function lol
  if (splitStr.length > 1) {
    // if even, stutter half, otherwise, third part
    // don't re-stutter already stuttered words
    `isEven?: ${splitStr.length % 2 === 0}`;
    if (splitStr.length % 2 === 0) {
      for (let i = 0; i < splitStr.length / 2; i++) {
        do {
          randomNumber = Math.floor(Math.random() * splitStr.length);
        } while (stutterStr[randomNumber] !== undefined);
        stutterStr[randomNumber] = kobeniStutterWord(splitStr[randomNumber]);
      }
    } else {
      for (let i = 0; i < splitStr.length / 3; i++) {
        do {
          randomNumber = Math.floor(Math.random() * splitStr.length);
        } while (stutterStr[randomNumber] !== undefined);
        stutterStr[randomNumber] = kobeniStutterWord(splitStr[randomNumber]);
      }
    }
  }
  // Add everything that wasn't changed to stutterStr
  for (let i = 0; i < splitStr.length; i++) {
    if (stutterStr[i] === undefined) {
      stutterStr[i] = splitStr[i];
    }
  }
  return stutterStr.join(" ");
};