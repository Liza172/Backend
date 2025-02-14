const express = require('express');

const app = express();

//app.get(route, requestHandler)
//Bacis level routing
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })
// app.get('/profile', function (req, res) {
//   res.send('Its Liza Rakshit...')
// })


//Middleware
app.use(function(req, res, next)
{
  console.log("Middleware chala ...");
  next();
})
app.use(function(req, res, next)
{
  console.log("Middleware chala or ak bar");
  next();
})

app.get("/", function(req,res)
{
  res.send("Ram is a Boy");
})
app.get("/about", function(req,res)
{
  res.send("About page hai ye");
})


//Error handling
app.get("/profile", function(req,res, next)
{
  return next(new Error("Somthing went wrong!!"));
})
app.use((err, req, res, next)=>
{
  console.error(err.stack);
  res.status(500).send('Somthing broke! ');
})



app.listen(3000)