"use strict";
const querys = require("./querys/query");
const sql = require("mssql");
const { app } = require("../index");
// import { getConnection, sql, querys } from "../database";
// import { encrypt, compare } from "../helpers/handleBcrypt";

const getMessages = async (req, res) => {
  let { UserID } = req.body;
  if (UserID === null || UserID === 0) {
    return res.status(400).json({ msg: "Something went wrong" });
  }

  try {
    const pool = await sql.connect(app);
    const result = await pool
      .request()
      .input("UserID", UserID)
      .query(querys.getAllMessages);
    res.json(result.recordset);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const sendMessage = async (req, res) => {
  let {description, idSubMessage, idSession, idUser } = req.body;
  try {
    const pool = await sql.connect(app);
    const result = await pool
      .request()
      .input("description", sql.NVarChar, description)
      .input("idSubMessage", sql.Int, idSubMessage)
      .input("idSession", sql.Int, idSession)
      .input("idUser", sql.Int, idUser)
      .execute(`delivery.SPSAV_DeliveryMessage`)
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// #region ChatControllers
const getConversation = async (req, res) => {
  let { idSession } = req.body;
  if (idSession === 0 || idSession === undefined) {
    return res.status(400).json({ msg: "Bad Request there was an error" });
  }
  try {
    const pool = await sql.connect(app);
    const result = await pool
      .request()
      .input("idSession", sql.Int, idSession)
      .execute(`delivery.SPSEL_DeliveryMessagesPerSession`)
    res.send(result.recordset);
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await sql.connect(app);
    const result = await pool
      .request()
      .input("MessageID", id)
      .query(querys.deleteMessage);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const countMessages = async (req, res) => {
  try {
    const { idSession } = req.params;
    const pool = await sql.connect(app);
    const result = await pool
      .request()
      .input("SessionID", idSession)
      .query(querys.countMessages);
    res.send(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { message, id } = req.body;
    if (id === null || id === 0) {
      return res
        .status(400)
        .json({ msg: "Bad request, please fill all fields" });
    }
    const pool = await sql.connect(app);
    const result = await pool
      .request()
      .input("message", sql.Text, message)
      .input("id", sql.Int, id)
      .query(querys.updateMessage);
    res.json({ message, id });
  } catch (error) {
    res.status(204);
    res.send(error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    let { id } = req.body;
    const pool = await sql.connect(app);
    const result = await pool
      .request()
      .input("idUser", id)
      .execute(`delivery.SPSEL_DeliveryUsers`)
    res.json(result.recordset);
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
};

// #endregion
const registerCtrl = async (req, res) => {
  let { userName, password } = req.body;
  res.json({ userName, status });
  try {
    const pool = await sql.connect(app);
    const result = await pool
      .request()
      .input("UserName", sql.VarChar, userName)
      .input("Status", sql.Bit, status)
      .input("Type", sql.Int, type)
      .input("Password", sql.VarChar, password)
      .input("CreationDate", sql.VarChar, creationDate)
      .query(querys.RegisterUser);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const loginCtrl = async (req, res) => {
  let { userName, password } = req.body;
  try {
    const pool = await sql.connect(app);
    const result = await pool
      .request()
      .input("userName", userName)
      .input("Password", password)
      .execute(`delivery.SPSEL_LoginAuthentication`);
    res.send(result.recordset);
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
};

const getCurrentsession = async (req, res) => {
  let { userName } = req.body;
  try {
    const pool = await sql.connect(app);
    const result = await pool
      .request()
      .input("UserName", userName)
      .query(querys.getCurrentsession);
    res.send(result.recordset);
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
};

module.exports = {
  getMessages,
  sendMessage,
  getConversation,
  deleteMessage,
  countMessages,
  updateProduct,
  getUsers,
  registerCtrl,
  loginCtrl,
  getCurrentsession,
};
