module.exports = {
  components: {
    schemas: {
      //sendMessage
      sendMessage: {
        type: "object",
        description: "send message",
        example: "new message",
      },
      //Get conversation per user
      getConversation: {
        type: "array",
        description: "get messages of the selected session",
        example: "get new message",
      },
      //Get list of all users per id
      getUsers: {
        type: "array",
        description: "get all users",
        example: "User 1, User 2",
      },
      //Authentication of user data
      login: {
        type: "object",
        description: "Log In",
        example: "User1, ***",
      },
    },
  },
};
