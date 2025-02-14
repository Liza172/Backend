const fs = require('node:fs');

//For wrote into file
// fs.writeFile("hello.txt", "I am Liza", (err) => {
//   if(err)
//     console.log(err);
//   else 
//     console.log("Done");

// })

//For append into file
// fs.appendFile("hello.txt", "|I am Women", (err) => {
//   if(err)
//     console.log(err);
//   else 
//     console.log("Done");

// })
//For rename file
// fs.rename("hello.txt","hey.txt", (err) => {
//   if(err)
//     console.log(err);
//   else 
//     console.log("Done");

// })
//For copy file
// fs.copyFile("hello.txt","./copy/copy.txt", (err) => {
//   if(err)
//     console.log(err);
//   else 
//     console.log("Done");

// })
// fs.unlink("hello.txt", (err)=>
// {
//   if(errr)
//     console.log(err);
//   else
//     console.log("removed");
// })

//Create a server

const http = require('http');
const server = http.createServer(function(req, res)
{
  res.end("hello world");
})
server.listen(3000);