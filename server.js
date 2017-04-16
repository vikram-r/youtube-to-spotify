var express = require('express')
var app = express()

app.set('title', 'Youtube to Spotify')
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
  res.render('index', {
    message: 'hello world!',
    smallMessage: 'this is small'
  })
})

app.listen(3000, function() {
  console.log("server started")
})
