const fs = require("fs");
module.exports = (files) => {
  for (i in files) {
    if (fs.existsSync(files[i][0].path)) {
      fs.unlinkSync(files[i][0].path);
    }
  }
  return;
};
