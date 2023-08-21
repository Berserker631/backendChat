"use strict";

var express = require("express");
var messagesController = require("../controllers/messages.js");

var api = express.Router();

api.get("/", function (req, res) {
  res.send("<h1>It's working</h1>");
});

api.post("/getMessages", messagesController.getMessages);

api.post("/sendMessage", messagesController.sendMessage);

api.post("/getConversation", messagesController.getConversation);

api.get("/countMessages/:idSession", messagesController.countMessages);

api.delete("/deleteMessage/:id", messagesController.deleteMessage);

api.put("/updateMessage/:id", messagesController.updateProduct);

api.post("/getUsers", messagesController.getUsers);

api.post("/register", messagesController.registerCtrl);

api.post("/login", messagesController.loginCtrl);

api.post("/currentSession", messagesController.loginCtrl);

module.exports = api;
