var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var sql = require("mssql");
var port = process.env.PORT || 8080;
const cors = require("cors");
const path = require("path")
var messagesRoute = require("./routes/messages");
app.use(cors());
app.listen(port, function () {});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use("/", messagesRoute);

//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerSpec = {
  definition: {
    openapi: "3.1.0", 
    info: {
      title: "Chat Hickory",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:8080"
      }
    ]
  },
  apis: [`${path.join(__dirname, "./controllers/*.js")}`],
}

//Database parameters
const config = {
  user: "sa",
  password: "sa2023",
  database: "db_erp",
  server: "localhost",
  options: {
    encrypt: true,
    trustServerCertificate: true
  },
};

//middleware 
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpec))); 
 

//DB Connection
async function getConnection() {
  try {
    const pool = await sql.connect(config);
    console.log(`🛸 node server running on port ${port}`);
    return pool;
  } catch (error) {
    console.log(error);
  }
}

getConnection();
module.exports = app;