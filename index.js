var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var sql = require("mssql");
var port = process.env.PORT || 8080;
const cors = require("cors");

app.use(cors());

var messagesRoute = require("./routes/messages");

app.listen(port, function () {});

//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

app.use("/", messagesRoute);

const config = {
  user: "N.aguilar",
  password: "NA*2023",
  database: "DB_CHAT",
  server: "localhost",
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

async function getConnection() {
  try {
    const pool = await sql.connect(config);
    console.log(`node server running on port ${port}`);
    return pool;
  } catch (error) {
    console.log(error);
  }
}

//sql.connect(config);
getConnection();

module.exports = app;
