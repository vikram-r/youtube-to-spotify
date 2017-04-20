$(function(){

  // initial form submit
  $('#playlist-url-form').submit(function(e) {
    $.get('/youtube/playlist', {
      playlistUrl: encodeURIComponent($('#playlist-url-input').val())
    }).done(function(results) {
      console.log("success!");
      // render some template with data
      console.log(JSON.stringify(results));
    }).fail(function() {
      console.log("error!");
      // error handling
    });

    e.preventDefault();
    return false;
  });

});
