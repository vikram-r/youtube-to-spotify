var express = require('express')
var path = require('path')
var googleApi = require('./libs/google-api-helper')
var spotifyApi = require('./libs/spotify-api-helper')
var app = express()

app.set('title', 'Youtube to Spotify')
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index', {
    message: 'hello world!',
    another: 'another message'
  })
})

app.get('/youtube/playlist', (req, res) => {
  var url = decodeURIComponent(req.query["playlistUrl"])

  spotifyApi.search('feel good inc').then(r => {
    console.log('back in controller')
  })

  // todo return list of videos in playlist, and corresponding spotify song names
  var results = googleApi.getPlaylist(url).then(r => {
    res.json(r)
    res.end()
  }).catch(e => {
    // todo error handling
    console.log(e)
  })
})

app.put('/spotify/playlist/:playlistUrl', (req, res) => {
  var url = req.query["playlistUrl"]
  var playlistData = req.param["playlistData"]

  // update playlist on spotify, and return status
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ placeholder: "some_response" }));
  res.end()
})

app.listen(3000, () => {
  console.log("server started")
})
