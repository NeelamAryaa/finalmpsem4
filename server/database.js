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

// All Apis

app.get("/api/getAllPaper", (req, res) => {
  con.query(
    `select q.qp_id, p.paper_name, q.year, p.total_ques, p.total_marks, p.total_time
    from cbt.question_paper q inner join papers p on q.p_id=p.ppr_id`,
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
});

//

const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

app.get(`/api/getPaper/:id`, (req, res) => {
  con.query(
    `select q.qid, q.question, q.option1, q.option2, q.option3, q.option4, q.options, s.section_name from questions q  
    inner join sections s on q.section_id=s.id and q.qpaper_id=${req.params.id} `,
    (err, rslt) => {
      if (err) console.log(err);

      const r = groupBy(rslt, "section_name");
      // console.log(r);

      res.send(r);
    }
  );
});

app.get(`/api/getSections/:id`, (req, res) => {
  con.query(
    `select s.section_name as section from sections s where s.paper_id=${req.params.id}`,
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
});

// app.get(`/api/getPaper/:id`, (req, res) => {
//   con.query(
//     `select q.qid, q.question, q.option1, q.option2, q.option3, q.option4, s.section_name from questions q
//     inner join sections s on q.section_id=s.id and q.paper_id=${req.params.id} `,
//     (err, result) => {
//       if (err) console.log(err);

//       res.send(result);
//     }
//   );
// });

// app.get(`/api/getPaper/:id`, (req, res) => {
//   con.query(
//     `select q.qid, q.question, q.option1, q.option2, q.option3, q.option4, s.section_name from questions q
//     inner join sections s on q.section_id=s.id and q.paper_id=${req.params.id} `,
//     (err, result) => {
//       if (err) console.log(err);

//       // send paper as required format
//       console.log("section in getSection ", section.data);

//       res.send(result);
//     }
//   );
// });

// app.get("/api/getAllQuestions", (req, res) => {
//   con.query(`select * from questions`, (err, result) => {
//     if (err) console.log(err);
//     // res.send("yes it working");
//     res.send(result);
//   });
//   // res.send("show result");
//   console.log("result");
// });

// initial testing
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
