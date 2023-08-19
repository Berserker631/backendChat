var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var sql = require("mssql");
var port = process.env.PORT || 8080;
const cors = require("cors");
const swaggerUI = require("swagger-ui-express")
app.use(cors());
const docs = require('./docs');
var messagesRoute = require("./routes/messages");

app.listen(port, function () {});

//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));
app.use("/", messagesRoute);

const config = {
  user: "sa",
  password: "sa2023",
  database: "db_erp",
  server: "localhost",
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

async function getConnection() {
  try {
    const pool = await sql.connect(config);
    console.log(`🛸 node server running on port ${port}`);
    // v1SwaggerDocs(app, port)
    return pool;
  } catch (error) {
    console.log(error);
  }
}

getConnection();

module.exports = app;