var express = require('express')
var path = require('path')
var googleApi = require('./libs/google-api-helper')
var spotifyApi = require('./libs/spotify-api-helper')
var app = express()
var session = require('express-session');
var Promise = require('bluebird')
const UUID = require('uuid')

app.set('title', 'Youtube to Spotify')
app.set('view engine', 'ejs')
// static content directory
app.use(express.static(path.join(__dirname, 'public')))
// session variable setup
app.use(session({
  // store: new RedisStore, // todo use redis, this is not production safe!
  secret: UUID.v4(),
  saveUninitialized: true,
  resave: true
}));

app.get('/', (req, res) => {
  var model = {
    message: 'hello world!',
    another: 'another message'
  }
  if (req.session.spotify_token) {
    // todo get logged in name and save to model
  } else {
    model['spotify_authorization_url'] = spotifyApi.getAuthorizationUrl()
  }
  res.render('index', model)
})

app.get('/youtube/playlist', (req, res) => {
  var url = decodeURIComponent(req.query["playlistUrl"])
  var results = googleApi.getPlaylist(url)
    .then(playlistVideos => {
      return Promise.all(playlistVideos.map(video => {
          return Promise.props({
            youtube: video,
            spotify: spotifyApi.search(video.name)
          })
        })
      )
    })
    .then(responseJson => {
      res.json(responseJson)
      res.end()
    })
    .catch(e => {
      // todo error handling
      console.log(e)
    })
})

app.put('/spotify/playlist/:playlistUrl', (req, res) => {
  var url = req.params['playlistUrl']
  var playlistData = req.query['playlistData']

  // update playlist on spotify, and return status
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ placeholder: "some_response" }));
  res.end()
})

// oauth2 redirect endpoint
app.get('/oauth2/callback/:apiName', (req, res) => {
  var code = req.query["code"]
  spotifyApi.login(code)
    .then(token => {
      req.session['spotify_token'] = token
      res.redirect('/');
    })
    .catch(e => console.log(e))
})

app.listen(3000, () => {
  console.log("server started")
})
