require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const connectDB = require("./db.js");
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(cors());

const server = http.createServer(app);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server is running on port ${port}`));

//Logging
if (process.env.NODE_ENV === "Development") {
  app.use(morgan("dev"));
}

connectDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//handling routes
app.use("/api/questions", require("./Routes/question"));
app.use("/api/answers", require("./Routes/answer"));
app.use("/api/users", require("./Routes/user"));
