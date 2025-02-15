const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');

app.get("/", function(req, res)
{
  res.render("index");
})
//For dynamic routing


app.get("/profile/:username", function(req,res){
  //to acess th given username: - req.params.username
  res.send(`welcome, ${req.params.username}`);
})

app.get("/profile/:username/:age", function(req,res){

  res.send(`welcome, ${req.params.username} of ${req.params.age}`);
})




app.listen(3000, function()
{
  console.log("its running");
})