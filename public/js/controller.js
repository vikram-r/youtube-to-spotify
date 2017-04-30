$(function(){

  var $container = $('#playlist-list-container');

  var $playlistUrlSpinner = $('#playlist-url-spinner');

  Handlebars.registerPartial({
    "playlist-list-item": $('#playlist-list-item-template').html()
  });

  Handlebars.registerHelper('idToYoutubeLink', (id) => {
    return "https://www.youtube.com/watch?v=" + id;
  });

  // todo this is a bit hacky, and breaks the concept of "logic-less" templating
  Handlebars.registerHelper('rowStatusCss', (num) => {
    if (!num) {
      return "danger";
    } else if (num === 1) {
      return "success";
    } else {
      return "warning";
    }
  });

  var playlistListTemplate = Handlebars.compile($('#playlist-list-template').html());

  function renderPlaylistList(context) {
    $container.html(playlistListTemplate(context));
  }

  // initial form submit
  $('#playlist-url-form').submit(function(e) {
    $playlistUrlSpinner.removeClass('hidden');
    $.get('/youtube/playlist', {
      playlistUrl: encodeURIComponent($('#playlist-url-input').val())
    }).done(function(results) {
      console.log(JSON.stringify(results));
      // render the list
      renderPlaylistList(results);
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
