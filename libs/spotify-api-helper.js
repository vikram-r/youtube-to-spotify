const UUID = require('uuid')
var SpotifyApi = require('spotify-web-api-node')
var credentials = {
  clientId : process.env.SPOTIFY_CLIENT_ID,
  clientSecret : process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri : process.env.SPOTIFY_REDIRECT_URI
}

var spotify = new SpotifyApi(credentials)

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
  },

  getAuthorizationUrl: function getAuthorizationUrl() {
    var scopes = ["playlist-modify-public"]
    return spotify.createAuthorizeURL(scopes, UUID.v4())
  },

  login: function login(code) {
    return spotify.authorizationCodeGrant(code)
      .then(response => {
        spotify.setAccessToken(response.body['access_token'])
        spotify.setRefreshToken(response.body['refresh_token'])

        return spotify.getAccessToken()
      })
      .catch(e => console.log("error: " + e))
  }
}
