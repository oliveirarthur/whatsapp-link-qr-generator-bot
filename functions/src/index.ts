import { onRequest } from "firebase-functions/v2/https";
import { bot } from "./services/telegraf.service";

export const helloWorld = onRequest((req, res) => {
  return bot.handleUpdate(req.body, res);
});
