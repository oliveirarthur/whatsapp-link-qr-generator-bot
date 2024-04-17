import * as logger from "firebase-functions/logger";
import { defineString } from "firebase-functions/params";
import { onRequest } from "firebase-functions/v2/https";
import { bot } from "./services/telegraf.service";

const BOT_SECRET = defineString("BOT_SECRET");

export const botHandler = onRequest((req, res) => {
  logger.info("Request received:", { body: req.body, headers: req.headers });

  if (BOT_SECRET.value() !== req.headers["x-telegram-bot-api-secret-token"]) {
    throw new Error("Secret token does not match");
  }

  return bot.handleUpdate(req.body, res);
});

export const setup = onRequest(async (req, res) => {
  logger.warn("Setup request received:", {
    body: req.body,
    headers: req.headers,
  });

  const BOT_ENDPOINT = defineString("BOT_ENDPOINT").value();

  const results = await Promise.all([
    bot.telegram.setWebhook(BOT_ENDPOINT, {
      secret_token: BOT_SECRET.value(),
    }),
    bot.telegram.setMyCommands([
      {
        command: "start",
        description: "Mostra uma mensagem com instruções de como usar o bot",
      },
    ]),
  ]);

  res.json(results);
  return;
});
