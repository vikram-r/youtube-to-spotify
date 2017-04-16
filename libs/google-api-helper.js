var url = require('url')
var google = require('googleapis')
var youtube = google.youtube('v3')

var API_KEY = process.env.GOOGLE_API_KEY

var self = module.exports = {
  getPlaylist: function getPlaylist(playlistUrl) {
    var playlistId = url.parse(playlistUrl, true).query['list']

    youtube.playlistItems.list({
      part: "snippet",
      auth: API_KEY,
      playlistId: playlistId
    }, function (err, results) {
      console.log('Result: ' + (err ? err.message : JSON.stringify(results)));
    });

  }
}
