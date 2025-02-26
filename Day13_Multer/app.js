const express = require('express');
const app = express();

const userModel = require("./models/user");
const postModel = require("./models/post")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './pulic/images/uploads')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function(err, bytes)
    {
      const fn = bytes.toString("hex")+ path.extname(file.originalname);
      cb(null, fn);
    })
    
  }
})

const upload = multer({ storage: storage })

app.get("/", function(req, res){
  res.render("index");
})
app.get("/test", function(req, res){
  res.render("test");
})
app.post("/upload", upload.single("image") ,function(req, res){
  console.log(req.body);
})

app.get("/login", function(req, res){
  res.render("login");
})

app.post("/register", async function(req, res){
  
  let user = await userModel.findOne({email:req.body.email});
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
      let token = jwt.sign({email : user.email, userid: user._id}, "aaaa");
      res.cookie("token", token);
      res.send("registered");
    })
  })
})

app.post("/login", async function(req, res){
  
  let user = await userModel.findOne({email : req.body.email});
  if(!user)
    return res.status(500).send("Somthing Went Wrong!!")

    bcrypt.compare(req.body.password, user.password, function(err, result){
      if(result)
      {
        
        let token = jwt.sign({email : user.email, userid: user._id}, "aaaa");
        res.cookie("token", token);
        res.status(200).redirect("/profile");
      }
        
      else res.redirect("/login");
    })
  })

  app.get("/logout", function(req, res){
    res.cookie("token", "");
    res.redirect("/login");
  })

  app.post('/post', isLoggedIn, async (req,res)=>
    {
      let user = await userModel.findOne({email : req.user.email});
      let post = await postModel.create({
        user : user._id,
        content : req.body.content
      });
      user.posts.push(post._id);
      await user.save();
      res.redirect("/profile");
    });

  app.get('/profile', isLoggedIn, async (req,res)=>
  {
    let user = await userModel.findOne({email : req.user.email}).populate("posts");
    console.log(user);
  
    res.render("profile", {user});
  })

  app.get('/like/:id', isLoggedIn, async (req,res)=>
  {
    let post = await postModel.findOne({_id : req.params.id}).populate("user");
    if(post.likes.indexOf(req.user.userid) == -1)
      post.likes.push(req.user.userid);
    else
      post.likes.splice(post.likes.indexOf(req.user.userid), 1);

  
    await post.save();
    console.log(req.user);
  
    res.redirect('/profile');
  })
  app.get('/edit/:id', isLoggedIn, async (req,res)=>
    {
      let post = await postModel.findOne({_id : req.params.id}).populate("user");
     
      res.render("edit", {post});
    })
    app.post('/update/:id', isLoggedIn, async (req,res)=>
      {
        let post = await postModel.findOneAndUpdate({_id : req.params.id}, {content: req.body.content});
       
        res.redirect("/profile");
      })

  function isLoggedIn(req, res, next)
  {
    if(req.cookies.token === "") res.redirect("/login");
    else
    {
      let data = jwt.verify(req.cookies.token, "aaaa");
      req.user = data;
    }
    next();
  }


app.listen(3000);

