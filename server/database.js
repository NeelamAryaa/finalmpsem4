const express = require("express");
const cors = require("cors");
const app = express();

const { createConnection } = require("mysql2");

const con = createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "cbt",
});

app.use(cors());

app.get("/api/getAllQuestions", (req, res) => {
  con.query(`select * from questions`, (err, result) => {
    if (err) console.log(err);
    // res.send("yes it working");
    res.send(result);
  });
  // res.send("show result");
  console.log("result");
});

// con.query(`select * from questions`, (err, res, fields) => {
//   if (err) {
//     return console.log(err);
//   }
//   return console.log(res);
// });

// module.exports = con;

app.listen(8080, "0.0.0.0", (err) => {
  if (err) console.log(err);
  console.log("app is running on 8080");
});
