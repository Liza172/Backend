const express = require('express');
const app = express();

const userModel = require('./usermodel.js');
app.get("/", (req,res) =>
{
  res.send("hey");
})
app.get("/create",async (req,res) =>{
  let createuser = await userModel.create({
    name:'Liza',
    username:'liza172',
    email:'lizarakshit@gmail.com',

   })
   res.send(createuser)
  })
  app.get("/update", async (req,res) =>
  {
    let updatedUser = await userModel.findOneAndUpdate({name:"Liza"},{name:'Liza Rakshit'}, {new:true})
    res.send(updatedUser);
  })
  app.get("/read", async (req,res) =>
  {
    let users = await userModel.find()
      res.send(users);
  })
  app.get("/delete", async (req,res) =>
    {
      let deleteUser = await userModel.findOneAndDelete({name:"Liza Rakshit"})
      res.send(deleteUser);
    })


app.listen(3000);