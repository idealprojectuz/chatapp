const getCustomParams = require("../../utils/getCustomParams");
const succesResponse = require("../../utils/succesResponse");
const ErrorHandler = require("../../utils/errorHandle");
const readData = require("../../utils/readData");
const validate = require("./validate");
const { fetchMy } = require("../../utils/pgsql");
const validationError = require("../../utils/validationError");
const jwt = require("../../utils/jwt");
const { promisify } = require("util");
const redis = require("redis");

// const Login = async (req, res, next) => {
//   const client = await redis
//     // .createClient({
//     //   socket: {
//     //     host: process.env.REDIS_HOST,
//     //     port: process.env.REDIS_PORT,
//     //     password: process.env.REDIS_PASSWORD,
//     //   },
//     // })
//     .createClient()
//     .on("error", (err) => console.log(err))
//     .connect();

//   const UserIp =
//     req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.ip;
//   let failLoginAttamp = Number(await client.get(`${UserIp}`)) || 0;
//   try {
//     if (failLoginAttamp > 5) {
//       const seconds = await client.ttl(`${UserIp}`);
//       next(
//         new ErrorHandler(
//           `Urinishlar soni oshib ketdi ${seconds} soniyadan so'ng urinib ko'ring`,
//           401
//         )
//       );
//       return;
//     }

//     const { error, value } = validate.validate(req.body);
//     if (error) {
//       failLoginAttamp++;
//       await client.setEx(`${UserIp}`, 60, String(failLoginAttamp));
//       validationError(res, error, next);
//       return;
//     }
//     const result = await fetchMy(
//       `SELECT * FROM users WHERE phone = $1 AND password = crypt($2, password);`,
//       [value.phone, value.password]
//     );
//     if (result.length) {
//       const NODE_ENV = process.env.NODE_ENV;
//       const response = {
//         access_token: await jwt.sign(
//           result[0].id,
//           "access",
//           `${NODE_ENV == "development" ? "6d" : "1h"}`,
//           result[0].role,
//           UserIp
//         ),
//         refresh_token: await jwt.sign(
//           result[0].id,
//           "refresh",
//           "7d",
//           result[0].role,
//           UserIp
//         ),
//         role: result[0].role,
//       };
//       succesResponse(res, response, next, null, 201);
//       return;
//     }
//     throw new ErrorHandler("telefon raqam yoki parol xato", 404);
//   } catch (error) {
//     failLoginAttamp++;
//     await client.setEx(UserIp, 60, String(failLoginAttamp));
//     next(new ErrorHandler(error.message, error.status || 400));
//   } finally {
//     await client.disconnect();
//   }
// };

// const Refresh = async (req, res, next) => {
//   const authorization = req.headers.authorization || null;
//   const UserIp =
//     req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.ip;
//   if (!authorization) throw new ErrorHandler("refresh token required", 403);
//   const auth = authorization && authorization.split(" ");
//   if ((auth && auth[0].toLowerCase() == "refresh", auth[1])) {
//     // console.log();
//     const { userid, type, role, userip } = await jwt.verify(auth[1]);
//     if (type != "refresh") {
//       throw new ErrorHandler("only refresh token supported", 403);
//     }
//     if (UserIp != userip) {
//       throw new ErrorHandler("Siz Xafsizlik qoidalarini buzdingiz", 401);
//     }
//     const userchech = await readData("users", { id: userid });

//     if (userchech.length) {
//       const data = {
//         access_token: await jwt.sign(userid, "access", "1h", role, UserIp),
//         role: role,
//       };
//       return succesResponse(res, data, next);
//     }
//     next(new ErrorHandler("user not found", 404));
//   }
//   next(new ErrorHandler("Refresh token required", 403));

//   // console.log(sentence.toLowerCase());

//   // console.log(auth.toLowerCase());
//   // console.log(auth);
//   // if (auth && auth[0].toLowerCase() == "refresh") {
//   // }
// };

// const GetMe = async (req, res, next) => {
//   const { userid } = req.loggeduser;

//   const result = await readData("users", { id: userid }, [
//     "id",
//     "firstname",
//     "lastname",
//     "phone",
//     "role",
//     "created_at",
//   ]);
//   if (result.length) {
//     return succesResponse(res, result[0], next);
//   }
//   throw new ErrorHandler("user not found");
// };

const Register = async (req, res, next) => {};

module.exports = {
  login: Login,
  // login: async (req, res, next) => {
  //   getCustomParams(req, res, next, Login);
  // },

  //   Refresh: async (req, res, next) => {
  //     getCustomParams(req, res, next, Refresh);
  //   },
  //   GetMe: async (req, res, next) => {
  //     getCustomParams(req, res, next, GetMe);
  //   },
};
