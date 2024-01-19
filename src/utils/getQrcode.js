var QRCode = require("qrcode");

// QRCode.toDataURL("https://afex.uz", function (err, url) {
//   console.log(url);
// });

const qrcode = async (url) => {
  try {
    const dataUrl = await QRCode.toDataURL(url, { size: 500 });
    const data = dataUrl.slice("data:image/jpg;base64,".length);

    return { width: 3, height: 3, data, extension: ".jpg" };
  } catch (e) {
    console.log(e.message);
  }
};
module.exports = qrcode;
// (async () => console.log(await qrcode("https://afex.uz")))();
