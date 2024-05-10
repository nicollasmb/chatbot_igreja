const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const JsonFileAdapter = require("@bot-whatsapp/database/json");

const flowPrincipal = addKeyword(["iniciar", "Inic", "comecar"])
  .addAnswer(
    [
      "Para adquirir suas cartelas *siga estes passos*:",
      " - Cada cartela custa R$10,00",
      " - Faça o PIX do valor das cartelas que deseja adquirir para a chave 07.291.547/0001-32",
      " - Envie seu comprovante aqui",
    ],

    null,
    null
  )
  .addAnswer(
    "Após receber o comprovante, vamos enviar uma foto das suas cartelas.\n\n*Qualquer dúvida pode me perguntar!*",
    {
      delay: 2200,
    }
  );

const main = async () => {
  const adapterDB = new JsonFileAdapter();
  const adapterFlow = createFlow([flowPrincipal]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
