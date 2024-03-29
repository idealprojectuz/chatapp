function uuidValidation(item) {
  let regexUuid =
    /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;
  return item.match(regexUuid) ? true : false;
}

module.exports = uuidValidation;
