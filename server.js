var express = require('express')
var path = require('path')
var app = express()

app.set('title', 'Youtube to Spotify')
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'bower_components')))

app.get('/', function(req, res) {
  res.render('index', {
    message: 'hello world!',
    another: 'another message'
  })
})

app.listen(3000, function() {
  console.log("server started")
})
