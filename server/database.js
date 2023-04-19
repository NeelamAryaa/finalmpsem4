const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const PORT = process.env.PORT || 8080;
const BASE_URL = process.env.BASE_URL;

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign, verify, decode } = require("jsonwebtoken");

dotenv.config({ path: "./.env" });

const { createConnection } = require("mysql2");
const dayjs = require("dayjs");

const con = createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// middleware function
checkToken = (req, res, next) => {
  console.log(dayjs().format("YYYY-MM-DD HH:mm:ss A"));
  console.log("req body token", req.get("authorization"));
  let token = req.get("authorization");
  console.log("token", token);
  if (token) {
    token = token.slice(7);
    verify(token, "keyhye", (err, decode) => {
      if (err) {
        return res.json({
          msg: "Invalid token",
        });
      } else {
        next();
      }
    });
  } else {
    return res.json({ msg: "Access denied!!! Unautherized user!!!" });
  }
};

// ================user_registration_login=====================

app.post("/auth/register", (req, res) => {
  const salt = genSaltSync(10);

  let { username, email, password } = req.body.details;
  password = hashSync(password, salt);
  console.log(req.body);

  con.query(
    `insert into user (username, email_id, password, user_type) values ( ?, ?, ?, 'user')`,
    [username, email, password],
    (err, result) => {
      if (err) {
        return res.status(400).json({ err: "Invalid data" });

        // console.log(err);
      }
      return res
        .status(201)
        .json({ msg: `user successfully register!!!`, data: result });
    }
  );
  // console.log(req.body.details);
});

app.post(`/auth/login`, (req, res) => {
  console.log(req.body);
  con.query(
    `select * from user where email_id = ?`,
    [req.body.details.email],
    (err, result) => {
      console.log("result", result);
      if (err) {
        return res.json({ err });
      }
      if (result[0] == null) {
        return res.status(403).json({ err: "Invalid Credential!!!" });
      }

      const checkpwd = compareSync(
        req.body.details.password,
        result[0].password
      );
      if (checkpwd) {
        result.password = undefined; //not want to send with res thats why!
        const jsontoken = sign({ checkpwd: result }, "keyhye", {
          expiresIn: "24h",
        });

        return res.json({
          msg: "Login Successfully!!!",
          username: result[0].username,
          user_id: result[0].iduser,
          token: jsontoken,
        });
      } else {
        return res.status(403).json({ err: "Invalid email or password!!!" });
      }
    }
  );
});

// ================user_registration_login_ends================

//====================Get user test history======================

app.get("/api/getTestHistory/:user_id", checkToken, (req, res) => {
  con.query(
    `select m.user_id, p.paper_name, qp.year, m.score, m.attempt_no from marks m inner join question_paper qp on m.paper_id=qp.qp_id inner join papers p on qp.p_id = p.ppr_id where m.user_id = ${req.params.user_id}`,

    // `select * from marks m where m.user_id = ${req.params.user_id}`,
    (err, result) => {
      if (err) console.log(err);
      else {
        console.log(result);
        return res.status(200).json(result);
      }
    }
  );
});

//====================Get user test history end====================

// All Apis

app.get(`/api/getQuesPaperDetail/:id`, checkToken, (req, res) => {
  con.query(
    `select distinct p.ppr_id, p.paper_name, p.total_ques, p.total_marks, p.total_time from papers p inner join question_paper qp on  p.ppr_id=qp.p_id where p.ppr_id=${req.params.id}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(result);
        return res.send(result);
      }
    }
  );
});

app.get("/api/getAllPaper", (req, res) => {
  con.query(
    `select p.ppr_id, q.qp_id, p.paper_name, q.year, p.total_ques, p.total_marks, p.total_time
    from cbt.question_paper q inner join papers p on q.p_id=p.ppr_id`,
    (err, result) => {
      if (err) return res.send(err);
      return res.send(result);
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
app.get(`/api/getPaper/:id`, checkToken, (req, res) => {
  console.log("======check token ==========", checkToken);
  con.query(
    `select ques.qid, ques.question, ques.options, s.section_name from ques_in_quespaper qp  
    inner join questions ques on qp.ques_id=ques.qid 
    inner join section s on ques.sec_id=s.id
    where qp.q_ppr_id=${req.params.id}  `,
    (err, result) => {
      if (err) return res.send(err);
      // console.log("aise aa rha ====", result);

      const rsult = groupBy(result, "section_name");

      return res.send(rsult);
    }
  );
});

app.get("/api/getAnswerKey/:id", (req, res) => {
  con.query(
    `select ques.qid, s.section_name, ques.answer from ques_in_quespaper qp 
    inner join questions ques on qp.ques_id=ques.qid 
    inner join section s on ques.sec_id=s.id
    where qp.q_ppr_id=${req.params.id}`,
    (err, result) => {
      if (err) return res.send(err);
      console.log(result);
      const rsult = groupBy(result, "section_name");
      // console.log(r);

      return res.send(rsult);
      // res.send(result);
    }
  );
});

// get score api
let answer_key;
let result = {
  sec_wise_score: {},
  sec_wise_attempt: {},
  total_attempt: -1,
  total_score: -1,
  accuracy: 0,
  percentage: 0,
  total_ques: 0,
};

app.post(`/api/calculateScore`, checkToken, async (req, response) => {
  const answer = req.body.ans;
  console.log("user ans ====", answer);
  const { id, user_id } = req.body;

  const total_no_of_ques = Object.keys(answer).length;

  await axios
    .get(`${BASE_URL}/api/getAnswerKey/${id}`)
    .then((res) => {
      console.log("anskey=====", res.data);

      answer_key = res.data;

      result.total_ques = total_no_of_ques;

      let sec_wise_score = [];
      let sec_wise_attempt = [];
      let t_score = 0;
      let t_attempt = 0;

      const keys = Object.keys(answer_key);
      keys.forEach((key, idx) => {
        let score = 0;
        let attempt = 0;

        answer_key[key].forEach((e) => {
          console.log(answer[e.qid]);
          if (answer[e.qid] + 1 == e.answer) {
            score += 1;
          }
          if (answer[e.qid] !== -1) {
            attempt += 1;
          }
        });
        // result[0].sec_wise_score=({ [key]: score });
        // result[1].sec_wise_attempt.push({ [key]: attempt });
        sec_wise_score.push({ [key]: score });
        sec_wise_attempt.push({ [key]: attempt });
        // result.push({ sec_wise_attempt: { [key]: attempt } });
        // console.log(
        //   "sec_wise_attempt@@@@@@@@@@@@@",
        //   sec_wise_score,
        //   sec_wise_attempt
        // );

        result.sec_wise_attempt = sec_wise_attempt;
        result.sec_wise_score = sec_wise_score;

        t_score += result.sec_wise_score[idx][key];
        t_attempt += result.sec_wise_attempt[idx][key];
      });

      result.total_score = t_score;
      result.total_attempt = t_attempt;

      const accuracy =
        (result.total_score /
          (result.total_attempt ? result.total_attempt : -1)) *
        100;
      result.accuracy = accuracy.toFixed(2);

      const percent = (
        (result.total_score / (total_no_of_ques ? total_no_of_ques : -1)) *
        100
      ).toFixed(2);
      result.percentage = percent;

      console.log("result======", result);

      // response.send(result);
    })

    .catch((err) => response.send(err));

  // console.log("score 1 kyu", result.total_score);
  con.query(
    `insert into marks (user_id, paper_id, score, attempt_no) values (?, ?, ?, ?)`,
    [user_id, id, result.total_score, new Date()],
    (err, result) => {
      if (err) {
        console.log(err);
        return response.status(400).json({ err: "Invalid data" });
      } else {
        console.log(result);
        return response
          .status(201)
          .json({ msg: `marks uploaded successfully`, data: result });
      }
    }
  );
});

app.get("/api/getScore", (req, res) => {
  res.send(result);
});

app.listen(PORT, "0.0.0.0", (err) => {
  if (err) console.log(err);
  console.log("app is running on 8080");
});

module.exports = con;
