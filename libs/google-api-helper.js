var Url = require('url')
var Promise = require('bluebird')
var Google = require('googleapis')
var youtube = Google.youtube('v3')
var playlistItems = Promise.promisifyAll(youtube.playlistItems)

var API_KEY = process.env.GOOGLE_API_KEY

function paginatedGetPlaylist(params, currentResults) {
  return new Promise((resolve, reject) => {
    return playlistItems.listAsync(params).then(r => {
      // keep track of results
      var results = (currentResults || []).concat(r.items.map(item => {
        return {
          id: item.snippet.resourceId.videoId,
          name: item.snippet.title
        }
      }))
      // check if we need to paginate
      if (r.hasOwnProperty('nextPageToken')) {
        params['pageToken'] = r['nextPageToken']
        return resolve(paginatedGetPlaylist(params, results))
      } else {
        resolve(results)
      }
    }).catch(e => {
      // todo test this error handling
      throw e
    })
  })
}

var self = module.exports = {
  getPlaylist: function getPlaylist(playlistUrl) {
    var playlistId = Url.parse(playlistUrl, true).query['list']
    var params = {
      part: "snippet",
      auth: API_KEY,
      playlistId: playlistId
    }
    return paginatedGetPlaylist(params)
  }
}
