$(function(){

  // initial form submit
  $('#playlist-url-form').submit(function(e) {
    $.get('/youtube/playlist', {
      playlistUrl: encodeURIComponent($('#playlist-url-input').val())
    }).done(function() {
      console.log("success!");
      // render some template with data
    }).fail(function() {
      console.log("error!");
      // error handling
    });

    e.preventDefault();
    return false;
  });

});
