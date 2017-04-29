var SpotifyApi = require('spotify-web-api-node')
var spotify = new SpotifyApi()

function bestMatches(items) {
  // todo filter down list, and potentially look up more search terms
  return items
}

var self = module.exports = {
  search: function search(query) {
      return spotify.searchTracks(query)
        .then(response => {
          return response.body.tracks.items.map(i => {
            return {
              name: i.name,
              previewUrl: i.preview_url
            }
          })
        })
        .then(bestMatches)
        .catch(e => console.log("error: " + e))
  }
}
