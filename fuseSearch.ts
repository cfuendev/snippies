import Fuse from 'fuse.js';

const search = (data, keys, text) => {
  const fuse = new Fuse(data, {
    keys: keys
  })
  return fuse.search(text)
}

export default search;
