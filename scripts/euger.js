const dayjs = require("dayjs");
require("dotenv").config();

console.log(`
    ________  __________________          _______
   / ____/ / / / ____/ ____/ __ \\        / / ___/
  / __/ / / / / / __/ __/ / /_/ /   __  / /\\__ \ 
 / /___/ /_/ / /_/ / /___/ _, _/  _/ /_/ /___/ / 
/_____/\\____/\\____/_____/_/ |_|  (_)____//____/  
`);

console.log("Euger v.1.0");
console.log(`Target: ${process.env.EUGER_TARGET}`);
const sendHTTP = () => {
  if (dayjs().minute() % 5 === 0) {
    console.log(
      `⏰ This minute is modulo 5. It's currently ${dayjs().format("hh:mm A")}`
    );
    console.log(`🔄 Sending HTTP GET request to ${process.env.EUGER_TARGET}`);
    fetch(process.env.EUGER_TARGET)
      .then(() =>
        console.log(`✅ HTTP request succeeded\n🔄 Retrying in 30 secs...`)
      )
      .catch(() =>
        console.log(`❌ HTTP request failed\n🔄 Retrying in 30 secs...`)
      );
  } else {
    console.log(
      `⏰ Not yet at a minute that's modulo 5. It's currently ${dayjs().format(
        "hh:mm A"
      )}\n🔄 Retrying in 30 secs...`
    );
  }
};
sendHTTP();
setInterval(sendHTTP, 30000);
return;
