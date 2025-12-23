### steamdb2gamelist.js

Function that scrapes information from [steamdb](https://steamdb.info/) game pages (ex. `https://steamdb.info/app/<game_id>`)

This is useful for quickly parsing information when creating `gamelist.xml` files like the the ones [ES-DE](https://gitlab.com/es-de/emulationstation-de#es-de-frontend) uses to index games

You just run it and the information is copied to your clipboard as well as output to the console.

```javascript
generateGameXMLToClipboard();
```

Example from [Counter-Strike 2](https://steamdb.info/app/730/charts/)

```xml
<game>
  <path>...</path>
  <name>Counter-Strike 2</name>
  <desc>For over two decades, Counter-Strike has offered an elite competitive experience, one shaped by millions of players from across the globe. And now the next chapter in the CS story is about to begin. This is Counter-Strike 2.</desc>
  <releasedate>20120821T000000</releasedate>
  <developer>Valve</developer>
  <publisher>Valve</publisher>
  <genre> FPS, Shooter, Competitive, Action, Team-Based</genre>
</game>
```

Do bear in mind, this only generates the `name`, `desc`, `releaseDate`, `developer`, `publisher` and `genre` attributes.
You still need to set other values like `path` and `players` yourself. (`path` is set to "..." since it's required)

### batch_trim_yt.py

Script that takes a file specifying many videos and their trim times, downloads them through `yt-dlp` and trims with `ffmpeg`.

Example file:

```
https://www.youtube.com/watch?v=_NU8RLikQfE
7:54 - 8:27

https://youtu.be/qtqki60sn9E?si=jfuOXC9ACmgR7_0N
0:29 - 1:15
```

### Euger.js 💊

Named after [Eugeroics](https://en.wikipedia.org/wiki/Eugeroic), more commonly known as wakefulness-promoting agents, `euger.js` is a script that periodically sends HTTP GET requests to a specified url. I use this script to ensure the servers I host on Replit remain active and functioning.

To configure Euger.js, you need to specify the target URL by setting the "EUGER_TARGET" variable in a .env file:
```bash
EUGER_TARGET="YOUR_URL"
```