const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', "ejs");
app.use(express.json());
app.use(express.urlencoded({entended: true}));
app.use(express.static(path.join(__dirname, 'public')));
const userModel = require('./models/user')

app.get("/", (req,res) =>
{
  res.render("index");
})
app.get("/abc", async (req,res) =>
{
  let users = await userModel.find()
    res.send(users);
})
app.get("/delete/:id", async (req,res) =>
{
  let deleteUser = await userModel.findOneAndDelete({_id : req.params.id})
  res.redirect("/read");
})
app.get("/edit/:userid", async (req,res) =>
{
  let user = await userModel.findOne({_id : req.params.userid})
  res.render("edit", {user});
})
app.post("/update/:userid", async (req,res) =>
  {
    
    let user = await userModel.findOneAndUpdate({_id : req.params.userid}, 
      {name: req.body.name,
      email : req.body.email, 
      image : req.body.image
    }, {new:true});
    res.redirect("/read");
  })
app.get("/read", async (req,res) =>
{
  const allusers = await userModel.find();
  res.render("read", {users: allusers});
})
app.post("/create", async (req,res) =>
{ 
  // let {name, email, image} = req.body();
  const createUser = await userModel.create({
    name: req.body.name,
    email : req.body.email,
    image : req.body.image
  });
  res.redirect('/read')
})

app.listen(3000);