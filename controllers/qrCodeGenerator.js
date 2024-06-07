const QRCode = require("qrcode");
const Jimp = require("jimp");

const createQRCode = async (req, res) => {
  const text = JSON.stringify(req.body);
  console.log(text);
  const qrCode = await QRCode.toDataURL(text);

  const image = await Jimp.read(Buffer.from(qrCode.split(",")[1], "base64"));
  await image.resize(200, 200).writeAsync("qrcode.png");

  console.log("QR Code generated and saved as qrcode.png");

  res.status(200).send(`QR Code generated and saved as qrcode.png - ${qrCode}`);
};
module.exports = createQRCode;
