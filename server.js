const express = require("express");
const app = express();
const bp = require("body-parser");
const cors = require("cors");
const User = require("./db/people");
const we = require("./fetchweather");
//import {getWeather} from './fetchweather'
//const hbs = require('hbs')

const port = process.env.port || 3000;

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

app.get("/viewUsers", (req, res) => {
  res.render("view.html");
});

app.get("/updateUsers", (req, res) => {
  res.render("update.html");
});

app.get("/weatherData", (req, res) => {
  res.render("weather.html");
});

app.post("/weatherData", (req, res) => {
  console.log("awawawa");
  console.log(req.body);
  User.find({ name: req.body.name })
    .then(result => {
      let city = result[0].hometown;
      console.log(city);
      we.getWeather(city)
        .then(r => {
          console.log(r);
          res.json({ city : city ,temp: r[0], summry: r[1] });
        })
        .catch(e => {
          console.log(e);
        });

      //console.log(result);
    })
    .catch(e => {
      res.send(e);
    });

  // we.getWeather("gampaha").then(r => {
  //   console.log(r);
  // });

});

app.post("/updateUsers", (req, res) => {
  console.log("updata " + req.body.upname);
  User.findOneAndUpdate(
    { name: req.body.upname },
    {
      name: req.body.name,
      password: req.body.pass,
      age: req.body.age,
      hometown: req.body.hometown
    }
  )
    .then(result => {
      res.send(result);
      console.log(result);
    })
    .catch(e => {
      console.log(e);
      res.send(e);
    });
});

app.post("/addUser", (req, res) => {
  console.log(req.body);
  const newUser = new User({
    name: req.body.name,
    password: req.body.pass,
    age: req.body.age,
    hometown: req.body.hometown
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

app.post("/viewUsers", (req, res) => {
  console.log(req.body + "in post req");

  if (req.body.name != "") {
    User.find({ name: req.body.name })
      .then(result => {
        res.json(result);
        console.log(result);
      })
      .catch(e => {
        res.send(e);
      });
  } else {
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

app.listen(port, () => {
  console.log(process.env.port);
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
