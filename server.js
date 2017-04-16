var express = require('express')
var path = require('path')
var googleapi = require('./libs/google-api-helper')
var app = express()

app.set('title', 'Youtube to Spotify')
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.render('index', {
    message: 'hello world!',
    another: 'another message'
  })
})

app.get('/youtube/playlist', function(req, res) {
  var url = decodeURIComponent(req.query["playlistUrl"])

  googleapi.getPlaylist(url)

  // return list of videos in playlist, and corresponding spotify song names
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify({
    playlist_video_names: ["video 1", "video 2"],
    spotify_song_names: ["song 1", "song 2"]
  }));
  res.end();
})

app.put('/spotify/playlist/:playlistUrl', function(req, res) {
  var url = req.query["playlistUrl"]
  var playlistData = req.param["playlistData"]

  // update playlist on spotify, and return status
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ placeholder: "some_response" }));
  res.end();
})

app.listen(3000, function() {
  console.log("server started")
})
