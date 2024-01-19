const axios = require("axios");

// `axios` kutubxonasini ishlatib, rasmni yuklab olish va base64 formatida qaytarish
async function getImageAsBase64(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64Data = Buffer.from(response.data, "binary").toString("base64");
    return base64Data;
  } catch (error) {
    console.error("Xatolik:", error);
    return null;
  }
}

module.exports = getImageAsBase64;
