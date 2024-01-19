const ErrorHandler = require("./errorHandle");

const getCustomParams = async (req, res, next, handler) => {
  try {
    await handler(req, res, next);
  } catch (e) {
    console.log(e);
    next(new ErrorHandler(String(e), 500));
  }
};

module.exports = getCustomParams;
