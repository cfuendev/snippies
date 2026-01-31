<h1> Scripts </h1>

<h3> Table of Contents </h3>

- [spotify-m3u8.js](#spotify-m3u8js)
- [steamdb2gamelist.js](#steamdb2gamelistjs)
- [batch\_trim\_yt.py](#batch_trim_ytpy)
- [Euger.js 💊](#eugerjs-)


### spotify-m3u8.js

Script that scrapes an entire Spotify playlist in the Spotify website and downloads the playlist's metadata as an .m3u8 file.

The aim of this is to easily port your Spotify playlists as files so that you can organize your *legally owned* local files. For example, when I'm not using Spotify, I prefer to listen to my *legally owned mp3 files* via native/desktop offline players like [AIMP](https://www.aimp.ru/?do=download) or [Winamp](https://winamp.com/player)

Only downside of this script is you have to refresh the page before running it again, at least for now. Copy paste the whole thing

Example from downloading my dubstep playlist "ALL THE DUB" playlist in Spotify

```txt
#EXTM3U #PLAYLIST ALL THE DUB
#EXTINF:274,Tristam - Who We Are
C:\Users\cfuen\Music\actual music\propertly tagged\Tristam - Who We Are.mp3
#EXTINF:216,Space Laces - Torque
C:\Users\cfuen\Music\actual music\propertly tagged\Space Laces - Torque.mp3
#EXTINF:139,Dirty Audio, Leotrix - Bahebe
C:\Users\cfuen\Music\actual music\propertly tagged\Dirty Audio, Leotrix - Bahebe.mp3
#EXTINF:278,Madcore - Gunslinger
C:\Users\cfuen\Music\actual music\propertly tagged\Madcore - Gunslinger.mp3
#EXTINF:218,Hi I'm Ghost, Dr. Ozi - Gas
C:\Users\cfuen\Music\actual music\propertly tagged\Hi I'm Ghost, Dr. Ozi - Gas.mp3
#EXTINF:180,Skrillex - Right In
C:\Users\cfuen\Music\actual music\propertly tagged\Skrillex - Right In.mp3
#EXTINF:203,Space Laces, Getter - Choppaz
C:\Users\cfuen\Music\actual music\propertly tagged\Space Laces, Getter - Choppaz.mp3
#EXTINF:152,Automhate - Tonal Riddim
```

### steamdb2gamelist.js

Client-side function that scrapes information from [steamdb](https://steamdb.info/) game pages (ex. `https://steamdb.info/app/<game_id>`)

This is useful for quickly parsing information when creating `gamelist.xml` files like the the ones [ES-DE](https://gitlab.com/es-de/emulationstation-de#es-de-frontend) uses to index games

You just copy-paste the code in your devtools console, run it and the information is copied to your clipboard as well as output to the console.

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