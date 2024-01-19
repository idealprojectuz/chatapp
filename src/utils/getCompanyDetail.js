const axios = require("axios");
const parser = require("node-html-parser");
const getCompanyDetails = async (inn, lang = "uz") => {
  try {
    let companyDetail = {};
    let companyInputNames = [
      "dataregistered",
      "status",
      "registering_authority",
      "stir",
      "thsht",
      "dbibt",
      "ifut",
      "email",
      "phone",
      "email",
    ];
    let base;
    let baseurl = "https://orginfo.uz";
    if (lang == "uz") {
      base = `https://orginfo.uz/uz/search/organizations/?q=`;
    } else {
      base = `https://orginfo.uz/search/organizations/?q=`;
    }
    const data = await axios.get(base + inn);
    let document = await parser.parse(data.data);
    let link;
    let parrent = document.querySelector(".text-decoration-none.og-card");
    if (parrent) {
      link = parrent.getAttribute("href");

      const response = await axios.get(baseurl + link);
      document = await parser.parse(response.data);
      let companyname = document.querySelector(".h1-seo");
      if (companyname) {
        companyDetail.name =
          companyname?.textContent.replace(/\s+/g, " ") || false;
      }
      // console.log(companyname?.textContent);
      let company_info = document.querySelectorAll(".row.border-bottom.py-3");
      for (let i = 0; i < company_info.length; i++) {
        companyDetail[companyInputNames[i]] = {
          name:
            company_info[i]
              .querySelector(".col-6.text-body-tertiary span")
              ?.textContent.replace(/\s+/g, " ") || false,
          value:
            company_info[i]
              .querySelectorAll(".col-6 span")[1]
              ?.textContent.replace(/\s+/g, " ") || false,
        };
      }
      delete companyDetail.email;
      let found = document.querySelector(".row.pt-3");
      if (found) {
        companyDetail.charter_found = {
          name: found
            .querySelector(".col-6.text-body-tertiary span")
            ?.textContent.replace(/\s+/g, " "),
          value: found
            .querySelectorAll(".col-6 span")[1]
            ?.textContent.replace(/\s+/g, " "),
        };
      } else {
        companyDetail.charter_found = false;
      }

      // let address = document.querySelectorAll( ".row.py-3" )[1].outerHTML;
      let address = document.querySelector(
        "body > div.d-flex.flex-column.h-100 > div > div > div.row.py-3 > div.col-12.col-lg-9.m-auto.printable > div:nth-child(2) > div > div > div > div:nth-child(3) > div:nth-child(2) > span"
      );
      if (address) {
        companyDetail.address = {
          name: "Manzil",
          value: address?.textContent.replace(/\s+/g, " "),
        };
      } else {
        companyDetail.address = false;
      }
      let director = document.querySelector(
        "body > div.d-flex.flex-column.h-100 > div > div > div.row.py-3 > div.col-12.col-lg-9.m-auto.printable > div:nth-child(3) > div > div > div > div > div:nth-child(2) > a > span"
      );
      if (director) {
        companyDetail.director = {
          name: "Rahbar",
          value: director?.textContent.replace(/\s+/g, " "),
        };
      } else {
        companyDetail.director = false;
      }
      // console.log(companyDetail);
      let founders = document.querySelector(
        "body > div.d-flex.flex-column.h-100 > div > div > div.row.py-3 > div.col-12.col-lg-9.m-auto.printable > div:nth-child(4) > div > div > div"
      );
      if (founders) {
        let founderslist = [];
        let foundersquery = founders.querySelectorAll(".row");
        foundersquery.forEach((el) => {
          let founder = el
            .querySelector(".col-6 a span")
            ?.textContent.replace(/\s+/g, " ");
          let foiz = el
            .querySelectorAll(".col-6 span")[1]
            ?.textContent.replace(/\s+/g, " ");
          founderslist.push({
            name: founder,
            percent: foiz,
          });
        });
        companyDetail.founders = founderslist;
      } else {
        companyDetail.founders = false;
      }
      let logo = document.querySelector(
        "body > div.d-flex.flex-column.h-100 > div > div > div.row.py-3 > div.col-12.col-lg-9.m-auto.printable > div:nth-child(5) > div > div > div > a > div > div > img"
      );
      if (logo) {
        companyDetail.logo = baseurl + logo.getAttribute("src");
      } else {
        companyDetail.logo = false;
      }

      let remember = document.querySelector(
        "body > div.d-flex.flex-column.h-100 > div > div > div.row.py-3 > div.col-12.col-lg-9.m-auto.printable > div:nth-child(6) > div > div > div > p"
      );
      // console.log(remember);
      if (remember) {
        companyDetail.remember =
          remember?.textContent.replace(/\s+/g, " ") || false;
      }
      return companyDetail;
    }
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error.message || "xatolik yuz berdi",
    };
  }
};
module.exports = getCompanyDetails;
