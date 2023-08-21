const getMessages = require("./get-messages");

module.exports = {
  paths: {
    "/getmessages/{id}": {
      ...getMessages,
    },
  },
};
