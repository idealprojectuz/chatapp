const jwt = require("jsonwebtoken");
const ErrorHandler = require("./errorHandle");
module.exports = {
  sign: async (userid, type, exp, role, userip = null) => {
    try {
      const payload = {
        userid: userid,
        type: type,
        role: role,
        userip: userip,
      };
      const options = {
        expiresIn: exp,
      };
      return await jwt.sign(payload, process.env.SECRET_KEY, options);
    } catch (e) {
      throw new ErrorHandler(e.message, 403);
    }
  },
  verify: async (token) => {
    try {
      return await jwt.verify(token, process.env.SECRET_KEY);
    } catch (e) {
      throw new ErrorHandler(e.message, 403);
    }
  },
};
