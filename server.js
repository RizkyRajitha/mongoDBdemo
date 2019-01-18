const express = require("express");
const app = express();
const bp = require("body-parser");
const cors = require("cors");
const User = require("./db/people");
//const hbs = require('hbs')

app.use(cors());
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
//app.set('view engine','hbs')

app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/public/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/addUser", (req, res) => {
  res.render("add.html");
});

app.post("/addUser", (req, res) => {
  console.log(req.body);
  const newUser = new User({
    name: req.body.name,
    password: req.body.pass,
    age: req.body.age
  });

  newUser
    .save()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(e => {
      console.log(e);
      res.send(e);
    });
});

app.get("/viewUsers", (req, res) => {
  res.render("view.html");

  //res.send();
  // console.log(req.body+'in get req')
  // User.find({ name: req.body.name })
  //   .then(result => {
  //     res.send(result);
  //   })
  //   .catch(e => {
  //     res.send(e);
  //   });
});
app.post("/viewUsers", (req, res) => {
  console.log(req.body + "in post req");
  
  if(req.body.name != ""){
    User.find({ name: req.body.name })
    .then(result => {
      
      res.json(result);
      console.log(result);
    })
    .catch(e => {
      res.send(e);
    });

  }

  else{

    User.find()
    .then(result => {
      
      res.json(result);
      console.log(result);
    })
    .catch(e => {
      res.send(e);
    });


  }
 
});

app.listen(3000, () => {
  console.log("server is running");
});

/*
[ { _id: 5c41dc34657c850ea4c03d5d,
  name: 'adAD',
  password: 'asdasdas',
  age: 1212,
  __v: 0 },
{ _id: 5c41dc6ee6f48e02dcf3983a,
  name: 'sASAS',
  password: 'SAsaS11',
  age: 11,
  __v: 0 },
{ _id: 5c41e0cc811d6f163c5fe016,
  name: 'adasdsadasd',
  password: 'dasdasdasdasd',
  age: 11111111,
  __v: 0 } ]*/
