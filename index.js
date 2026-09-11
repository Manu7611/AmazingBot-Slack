const axios = require("axios");
require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/amazingbot-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();

app.command("/amazingbot-hello", async ({command, ack, respond}) => {
  await ack();
  await respond ({ text:'Hello my friend , anything to do today ?'});
});

app.command("/amazingbot-hour", async ({command, ack, respond}) => {
  const Time = new Date();
  const hour = Time.getHours();
  const minutes = Time.getMinutes();
  await ack();
  await respond ({ text:`Hello its ${hour}H ${minutes}`});
});

app.command("/amazingbot-chuck", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://api.chucknorris.io/jokes/random");
    await respond({ text: `Chuck Noris say:\n${response.data.value}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a Chuck Noris fact." });
  }
});

app.command("/amazingbot-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/amazingbot-ping - Check bot latency
/amazingbot-hello - Say Hello to the bot !
/amazingbot-hour - Get the time with this fabulous bot 
/amazingbot-chuck - Get random information on Chuck Noris`
  });
});
