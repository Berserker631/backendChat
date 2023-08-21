module.exports = {
  get: {
    tags: ["Get CRUD operations"],
    description: "Get Conversation",
    operationId: "getmessages",
    parameters: [
      {
        name: "idSession",
        in: "path",
        schema: {
          $ref: "#/component/schemas/",
        },
      },
    ],
    responses: {
      200: {
        description: "messages are obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/component/schemas/getConversation",
            },
          },
        },
      },
    },
  },
};
