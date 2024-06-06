const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

async function saveImages(images) {
  const imageUrls = [];
  for (let i = 0; i < images.length; i++) {
    const base64Data = images[i].replace(/^data:image\/\w+;base64,/, "");
    const dataBuffer = Buffer.from(base64Data, "base64");
    const fileName = `image_${Date.now()}_${i}.png`;
    const filePath = path.join(__dirname, "../uploads/", fileName);
    await fs.promises.writeFile(filePath, dataBuffer);
    imageUrls.push(`${process.env.BASE_URL}/uploads/${fileName}`);
  }
  return imageUrls;
}
async function updateImages(images) {
    const imageUrls = [];
    for (let i = 0; i < images.length; i++) {
      let imageData = images[i];
      if (!/^data:image\/\w+;base64,/.test(imageData)) {
        // If not base64, push the data as it is
        imageUrls.push(imageData);
      } else {
        // If base64, process the image as before
        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
        const dataBuffer = Buffer.from(base64Data, "base64");
        const fileName = `image_${Date.now()}_${i}.png`;
        const filePath = path.join(__dirname, "../uploads/", fileName);
        await fs.promises.writeFile(filePath, dataBuffer);
        imageUrls.push(`${process.env.BASE_URL}/uploads/${fileName}`);
      }
    }
    return imageUrls;
  }
  async function deleteImages(imageUrls) {
    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      const fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
      const filePath = path.join(__dirname, "../uploads/", fileName);
      try {
        await fs.promises.unlink(filePath);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          throw err;
        }
      }
    }
  }
  
  
  module.exports = { saveImages, updateImages ,deleteImages };
  