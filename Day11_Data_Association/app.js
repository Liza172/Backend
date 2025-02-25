const express = require('express');
const app = express();

const userMondel = require('./models/user');
const postModel = require('./models/post')

app.get("/", function(req, res){
  res.send('hey');
})

app.get("/create", async function(req, res){
  let user = await userMondel.create({
    username: "Liza",
    age: 20,
    email:"lizarakshit@gmail.com",

  });
  res.send(user);
})

app.get("/post/create", async function(req, res){
  let post = await postModel.create({
   postdata: "Hello !! How are you? ",
   user : "67bdb50b2d1017b07b3bf082",
  });
  let user = await userMondel.findOne({_id: "67bdb50b2d1017b07b3bf082"})
  user.posts.push(post._id);
  await user.save();
  res.send({post, user});
})

app.listen(3000);