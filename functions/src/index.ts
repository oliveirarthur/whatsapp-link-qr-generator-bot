import * as logger from "firebase-functions/logger";
import { onRequest } from "firebase-functions/v2/https";
import { EnvService } from "./services/env.service";
import { bot } from "./services/telegraf.service";

export const botHandler = onRequest((req, res) => {
  logger.info("Request received:", { body: req.body, headers: req.headers });

  const secretTokenHeader = req.headers["x-telegram-bot-api-secret-token"];
  if (EnvService.BOT_SECRET.value() !== secretTokenHeader) {
    throw new Error("Secret token does not match");
  }

  return bot.handleUpdate(req.body, res);
});

export const setup = onRequest(async (req, res) => {
  logger.warn("Setup request received:", {
    body: req.body,
    headers: req.headers,
  });

  const results = await Promise.all([
    bot.telegram.setWebhook(EnvService.BOT_ENDPOINT.value(), {
      secret_token: EnvService.BOT_SECRET.value(),
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
