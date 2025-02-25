const express = require('express');
const app = express();

const userModel = require("./models/user");
const postModel = require("./models/post")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/", function(req, res){
  res.render("index");
})
app.get("/login", function(req, res){
  res.render("login");
})

app.post("/register", function(req, res){
  
  let user = userModel.findOne(req.body.email);
  if(user)
    return res.status(500).send("User already registered!!")

  bcrypt.genSalt(10, (err, salt) =>
  {
    let {password} = req.body;
    bcrypt.hash(password, salt, async (err, hash) =>
    {
      let user = await userModel.create({
          username: req.body.username,
          name: req.body.name,
          age: req.body.age,
          email: req.body.email,
          password: hash,
      });
      let token = jwt.sign({email : email, userid: user._id}, "aaaa");
      res.cookie("token", token);
      res.send("registered");
    })
  })
})

app.post("/login", function(req, res){
  
  let user = userModel.findOne(req.body.email);
  if(!user)
    return res.status(500).send("Somthing Went Wrong!!")

    bcrypt.compare(req.body.password, user.password, function(err, result){
      if(result)
      {
        
        let token = jwt.sign({email : email, userid: user._id}, "aaaa");
        res.cookie("token", token);
        res.status(200).send("You can login");
      }
        
      else res.redirect("/login");
    })
  })

  app.get("/logout", function(req, res){
    res.cookie("token", "");
    res.redirect("/login");
  })

  app.get('/profile', isLoggedIn, (req,res)=>
  {
    res.render("login");
  })

  function isLoggedIn(req, res, next)
  {
    if(req.cookies.token === "") res.send("You must be logged in");
    else
    {
      let data = jwt.verify(req.cookies.token, "aaaa");
      req.user = data;
    }
    next();
  }


app.listen(3000);

