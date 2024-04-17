import * as logger from "firebase-functions/logger";
import { onRequest } from "firebase-functions/v2/https";
import { bot } from "./services/telegraf.service";

export const botHandler = onRequest((req, res) => {
  logger.info("Request received:", { body: req.body, headers: req.headers });
  return bot.handleUpdate(req.body, res);
});

export const setup = onRequest(async (req, res) => {
  logger.warn("Setup request received:", {
    body: req.body,
    headers: req.headers,
  });

  const results = await Promise.all([
    bot.telegram.setWebhook(process.env.BOT_ENDPOINT!),
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
