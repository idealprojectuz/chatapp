const getTitle = (Arr) => {
  let titles = [];
  Arr.map((e) => titles.push(e.name));
  return titles.join(", ");
};

module.exports = getTitle;
