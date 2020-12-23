require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
let port = process.env.PORT || 8001;
app.use("/",express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function middleware(req, res, next) {
  const string = `Method: ${req.method},Path: ${req.path}, IP Address: ${req.ip}`;
  console.log(string);
  // res.json(string);
  next();
});

app.get('/', (req, res) => {
  res.json("Hello World");
});
app.get('/file', (req, res) => {
  const file = __dirname + '/views/index.html';
  res.sendFile(file);
});
app.get('/json', (req, res) => {
   res.json({"message":"Hello Json "});
});
// app.get('/user', function(req, res, next) {
  // req.time = new Date().toString();
  // res.send(req.time);
  // next();
// });
app.delete('/user', (req, res,next) => {
  req.user = req.body;
  console.log(req.body.name)
  next();
  },function(req,res){
    delete req.user.password;
    res.send(req.user);
});
app.get('/post/:post_id', (req, res)=>{
  const post = req.params.post_id; // Hypothetical synchronous operation
  res.send(post)
});

//http://localhost:8000/name?first=VAnn&last=Dat
app.get('/name', (req, res) =>{
  const { first: firstName, last: lastName } = req.query;
  res.json({ "name": `${firstName} ${lastName}`})
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});