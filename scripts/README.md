### Euger.js 💊

Named after [Eugeroics](https://en.wikipedia.org/wiki/Eugeroic), more commonly known as wakefulness-promoting agents, `euger.js` is a script that periodically sends HTTP GET requests to a specified url. I use this script to ensure the servers I host on Replit remain active and functioning.

To configure Euger.js, you need to specify the target URL by setting the "EUGER_TARGET" variable in a .env file:
```bash
EUGER_TARGET="YOUR_URL"
```