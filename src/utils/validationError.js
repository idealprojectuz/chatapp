const ErrorHandler = require("./errorHandle");

const validationError = async (res, err, next) => {
  try {
    res.status(422).json({
      ok: false,
      status: 422,
      message: `Validation error: ${
        String(err["details"]?.[0]?.message) || ""
      }`,
    });
  } catch (e) {
    next(new ErrorHandler(String(e), 500));
  }
};

module.exports = validationError;
