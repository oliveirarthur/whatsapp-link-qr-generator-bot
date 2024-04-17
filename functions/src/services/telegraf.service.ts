import { Input, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import * as QRCode from "qrcode";
import * as logger from "firebase-functions/logger";

export const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start((ctx) => {
  return ctx.reply("Olá! Informe um número de telefone para obter um link para o WhatsApp - sem adiciona-lo aos contatos!");
});

bot.on(message("text"), async (ctx) => {
  try {
    // sanitize user input
    const sanitizedMessageText = ctx.message.text.replace(/\D/g, "");
    const number = Number(sanitizedMessageText);

    // validates user input
    const numberLength = number.toString().length;
    const isValidLength = numberLength >= 11;

    if (!isValidLength) {
      return ctx.reply(
        `Por favor informe um telefone com 11 digitos (DDD e telefone) ou mais`
      );
    }

    // creates wa.me link
    const numberToConcatenate = numberLength === 11 ? `55${number}` : number;
    const link = `https://wa.me/${numberToConcatenate}`;

    // generate QR code - useful to share with others!
    const qr = await QRCode.toBuffer(link, { errorCorrectionLevel: "L" });
    const caption = `${link}`;

    // sends the QR and caption to the client
    return ctx.replyWithPhoto(Input.fromBuffer(qr), { caption });
  } catch (error) {
    logger.error(error);
    return ctx.reply(
      "Ocorreu um erro ao gerar a resposta, por favor, tente novamente."
    );
  }
});
