const moment = require("moment");

const getDay = (day = null) => {
  moment.locale("uz-latn");
  let inputmoment;
  if (day == null) {
    var currentUTC = new Date();
    var year = currentUTC.getUTCFullYear();
    var month = String(currentUTC.getUTCMonth() + 1).padStart(2, "0");
    var day = String(currentUTC.getUTCDate()).padStart(2, "0");

    var formattedUTC = `${year}-${month}-${day}`;
    inputmoment = moment(formattedUTC, "YYYY-MM-DD");
  } else {
    const inputDateTime = String(day);
    inputmoment = moment(inputDateTime, "YYYY-MM-DD");
  }
  const days = inputmoment.format("LL");
  return `${days} yil`.toLowerCase();
};

module.exports = getDay;
