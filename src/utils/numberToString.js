const ones = [
  "",
  "bir",
  "ikki",
  "uch",
  "to",
  "besh",
  "olti",
  "yetti",
  "sakkiz",
  "to'qqiz",
];
const tens = [
  "",
  "",
  "yigirma",
  "o'ttiz",
  "qirq",
  "ellik",
  "oltmish",
  "yetmish",
  "sakson",
  "to'qson",
];
const teens = [
  "o'n",
  "o'n bir",
  "o'n ikki",
  "o'n uch",
  "o'n to",
  "o'n besh",
  "o'n olti",
  "o'n yetti",
  "o'n sakkiz",
  "o'n to'qqiz",
];

const numberToWords = (num) => {
  if (num === 0) {
    return "nol";
  }

  let words = "";

  if (num >= 1000000) {
    words += numberToWords(Math.floor(num / 1000000)) + " million ";
    num %= 1000000;
  }

  if (num >= 1000) {
    words += numberToWords(Math.floor(num / 1000)) + " ming ";
    num %= 1000;
  }

  if (num >= 100) {
    words += ones[Math.floor(num / 100)] + " yuz ";
    num %= 100;
  }

  if (num >= 10 && num <= 19) {
    words += teens[num - 10] + " ";
    num = 0;
  } else if (num >= 20) {
    words += tens[Math.floor(num / 10)] + " ";
    num %= 10;
  }

  if (num >= 1 && num <= 9) {
    words += ones[num];
  }

  return words.trim();
};

// console.log(numberToWords(150321567));
module.exports = numberToWords;
