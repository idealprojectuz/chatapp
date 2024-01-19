function remplacemessage({ message, clients }) {
  const regex = /{{\s*(.*?)\s*}}/g;
  let newMessage = message;
  let match;
  while ((match = regex.exec(message))) {
    const block = match[0];
    const propertyName = match[1].trim();

    if (clients.hasOwnProperty(propertyName)) {
      newMessage = newMessage.replace(block, clients[propertyName]);
    }
  }
  return newMessage;
}

module.exports = remplacemessage;
