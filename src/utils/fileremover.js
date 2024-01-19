const fs = require("fs");
const path = require("path");
const remover = (file) => {
  let newfile = file.split("/");
  let distination = path.join(process.cwd(), "uploads", newfile[0], newfile[1]);
  if (fs.existsSync(distination)) {
    fs.unlinkSync(distination);
  }
  return;
};
module.exports = remover;
