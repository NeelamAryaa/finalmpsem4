const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const { createConnection } = require("mysql2");

const con = createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "cbt",
});

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// All Apis

app.get(`/api/getQuesPaperDetail/:id`, (req, res) => {
  con.query(
    `select distinct p.ppr_id, p.paper_name, p.total_ques, p.total_marks, p.total_time from papers p inner join question_paper qp on  p.ppr_id=qp.p_id where p.ppr_id=${req.params.id}`,
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
});

app.get("/api/getAllPaper", (req, res) => {
  con.query(
    `select p.ppr_id, q.qp_id, p.paper_name, q.year, p.total_ques, p.total_marks, p.total_time
    from cbt.question_paper q inner join papers p on q.p_id=p.ppr_id`,
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
});

const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

// get questions of currentPaper
app.get(`/api/getPaper/:id`, (req, res) => {
  con.query(
    `select ques.qid, ques.question, ques.options, s.section_name from ques_in_quespaper qp  
    inner join questions ques on qp.ques_id=ques.qid 
    inner join section s on ques.sec_id=s.id
    where qp.q_ppr_id=${req.params.id}  `,
    (err, result) => {
      if (err) console.log(err);
      // console.log("aise aa rha ====", result);

      const rsult = groupBy(result, "section_name");
      // console.log(r);

      res.send(rsult);
    }
  );
});

app.get("/api/getAnswerKey/:id", (req, res) => {
  con.query(
    `select ques.qid, ques.answer from ques_in_quespaper qp inner join questions ques on qp.ques_id=ques.qid where qp.q_ppr_id=${req.params.id}`,
    (err, result) => {
      if (err) console.log(err);
      console.log(result);
      res.send(result);
    }
  );
});

// get score api
app.post(`/api/getScore`, (req, response) => {
  const answer = req.body.ans;
  console.log("user ans ====", answer);
  const id = req.body.id;

  axios
    .get(`http://localhost:8080/api/getAnswerKey/${id}`)
    .then((res) => {
      console.log("anskey=====", res.data);
      const answer_key = res.data;
      let score = 0;
      let correct = {};
      answer_key.forEach((e) => {
        // console.log(answer[e.qid]);
        if (answer[e.qid] + 1 == e.answer) {
          score += 1;
          correct[e.qid] = true;
        }
      });
      console.log("score======", score);
      // response.send({ score: score });
      // return score;
      response.send({ score: score, correct: correct });
    })

    .catch((err) => console.log(err));
});

// ===============previous code===================
// const groupBy = (array, key) => {
//   return array.reduce((result, currentValue) => {
//     (result[currentValue[key]] = result[currentValue[key]] || []).push(
//       currentValue
//     );
//     return result;
//   }, {});
// };

// app.get(`/api/getPaper/:id`, (req, res) => {
//   con.query(
//     `select q.qid, q.question, q.option1, q.option2, q.option3, q.option4, q.options, s.section_name from questions q
//     inner join sections s on q.section_id=s.id and q.qpaper_id=${req.params.id} `,
//     (err, rslt) => {
//       if (err) console.log(err);

//       const r = groupBy(rslt, "section_name");
//       // console.log(r);

//       res.send(r);
//     }
//   );
// });

// app.get(`/api/getSections/:id`, (req, res) => {
//   con.query(
//     `select s.section_name as section from sections s where s.paper_id=${req.params.id}`,
//     (err, result) => {
//       if (err) console.log(err);
//       res.send(result);
//     }
//   );
// });
// // ===============previous code ends===================

// ===============================================
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
// =====================================================

app.listen(8080, "0.0.0.0", (err) => {
  if (err) console.log(err);
  console.log("app is running on 8080");
});
