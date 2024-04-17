import { defineString } from "firebase-functions/params";

export const EnvService = {
  BOT_ENDPOINT: defineString("BOT_ENDPOINT", {
    description:
      "HTTPS URL to send updates to. Use an empty string to remove webhook integration",
  }),
  BOT_SECRET: defineString("BOT_SECRET", {
    description:
      "A secret token to be sent in a header “X-Telegram-Bot-Api-Secret-Token” in every webhook request, 1-256 characters. Only characters A-Z, a-z, 0-9, _ and - are allowed. The header is useful to ensure that the request comes from a webhook set by you.",
  }),
  BOT_TOKEN: defineString("BOT_TOKEN", {
    description:
      "The token is a string, like 110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw, which is required to authorize the bot and send requests to the Bot API. Keep your token secure and store it safely, it can be used by anyone to control your bot",
  }),
};
