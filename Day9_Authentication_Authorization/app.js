const cookieParser = require('cookie-parser')
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


app.use(cookieParser());

// app.get("/", function(req, res)
// {
//   res.cookie("name", "Liza");
//   res.send("done");
// })
// app.get("/read", function(req, res)
// {
//   console.log(req.cookies);
//   res.send("done");
// })


//Generate new string

// app.get("/", function(req, res)
// {
//   bcrypt.genSalt(10, function(err, salt)
//   {
//     bcrypt.hash("lizaaaaaaaa", salt, function(err, hash){
//       console.log(hash);
//   })  
// })
// })

//To check the passaward is same or not

// app.get("/", function(req, res){
//   bcrypt.compare("lizaaaaaaaa", "$2b$10$P7EjqLjZqVrdMf9Tml/e2eMSC.0Bm2S0C/W.Gy/qLhm.XROVMPsEe", function(err, result){
//     console.log(result);
//   });
// })

app.get("/", function(req, res)
{
  let token = jwt.sign({email: "lizarakshit@gmail.com"}, "secret");
  res.cookie("token", token);
  console.log(token);
  res.send("Done");
})

app.get("/read", function(req, res){
  // console.log(req.cookies);
  const data = jwt.verify(req.cookies.token, "secret");
  console.log(data);
})

app.listen(3000);