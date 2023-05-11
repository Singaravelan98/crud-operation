// const express = require("express");

// let app = express();
// var mysql = require("mysql");
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "portfolio",
// });

// connection.connect();

// connection.query("select * from portfolio", function (error, results) {
//   if (error) console.log("The solution is: ", results);
//   res.json(results);
// });

// app.get("/", (req, res) => {
//   console.log(req.query);

//   console.log("i am insde get"); // res.send("hi welcome"+req.query["name"]+req.query["age"])

//   res.json([{ name: req.query["name"], age: req.query["age"] }]);
// });

// let user = [
//   { name: "ragul", age: "22" },

//   { name: "saravana", age: "23" },

//   { name: "ajai", age: "21" },
// ];

// app.get("/user", (req, res) => {
//   res.json(user);
// });

// app.listen(3000, () => {
//   console.log("listening on  port 3000");
// });
const express = require("express");
var mysql = require("mysql");
var cors = require("cors");
app = express();
app.use(express.json());
app.use(cors());
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "portfolio",
});

connection.connect();

app.get("/get", (req, res) => {
  connection.query(
    `SELECT id, yourname , email, message from details where isdeleted= ?`,
    [0],
    function (error, results) {
      if (error) {
        console.log(error);
      }
      console.log(results);
      res.json(results);
    }
  );
});

// app.get("/:id", (req, res) => {
//   connection.query(
//     `SELECT * from details where id=${req.params.id}`,
//     function (error, results) {
//       if (error) {
//         console.log(error);
//       }
//       console.log(results);
//       res.json(results);
//     }
//   );
// });

app.put("/put", (req, res) => {
  // console.log(req.body.message);
  connection.query(
    "update details set yourname=?,email=?,message=? where id=?",
    [req.body.yourname, req.body.email, req.body.message, req.body.id],
    function (error, results) {
      if (error) {
        console.log(error);
      }
      console.log(results);
      res.json(results);
    }
  );
});

app.post("/user", (req, res) => {
  // console.log(req.body.message);
  connection.query(
    "insert into details(yourname,email,message)values(?,?,?)",
    [req.body.yourname, req.body.email, req.body.message],
    function (error, results) {
      if (error) {
        console.log(error);
      }
      console.log(results);
      res.json(results);
    }
  );
});

app.put("/delete", (req, res) => {
  // Execute the DELETE statement with the specified ID
  console.log("delete..................", req.body);
  let sql = `UPDATE details SET isdeleted = ? WHERE id = ?;`;

  let id = req.body.id;

  console.log("id.....", id);

  connection.query(sql, [1, id], (error, results) => {
    if (error) {
      console.log("error....", error);
    } else {
      console.log("results" + JSON.stringify(results));

      res.end(JSON.stringify(results));
    }
  });
});

// connection.end();

app.listen(3000, () => {
  console.log("listening on port 3000");
});
