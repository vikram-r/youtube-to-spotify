$(function(){

  var $container = $('#youtube-list-container');

  var $playlistUrlSpinner = $('#playlist-url-spinner');

  Handlebars.registerPartial({
    "youtube-list-item": $('#youtube-list-item-template').html()
  });

  var youtubeListTemplate = Handlebars.compile($('#youtube-list-template').html());

  function renderYoutubeList(context) {
    $container.html(youtubeListTemplate(context));
  }

  // initial form submit
  $('#playlist-url-form').submit(function(e) {
    $playlistUrlSpinner.removeClass('hidden');
    $.get('/youtube/playlist', {
      playlistUrl: encodeURIComponent($('#playlist-url-input').val())
    }).done(function(results) {
      console.log("success!");
      console.log(JSON.stringify(results));
      // render the list
      renderYoutubeList(results);
      $playlistUrlSpinner.addClass('hidden');
    }).fail(function() {
      console.log("error!");
      $playlistUrlSpinner.addClass('hidden');
      // error handling
    });

    e.preventDefault();
    return false;
  });

});
