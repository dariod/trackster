var Trackster = {};

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  $('#results').empty();
  console.log("Redering tracks list...");
  for (var track in tracks) {
    var trackRow = '<div class="row" id="resultRow">' +
    '<div class="col-xs-1 text-center"><a href="https://p.scdn.co/mp3-preview/22bf10aff02db272f0a053dff5c0063d729df988?cid=null"><i class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i></a></div>' +
    '<div class="col-xs-1 text-right"><span>' + track + '</span></div>'+
    '<div class="col-xs-3"><span>' + tracks[track].name + '</span></div>'+
    '<div class="col-xs-2"><span>' + tracks[track].album.artists[0].name + '</span></div>'+
    '<div class="col-xs-3"><span>' + tracks[track].album.name + '</span></div>'+
    '<div class="col-xs-1"><span>' + tracks[track].popularity + '</span></div>'+
    '<div class="col-xs-1"><span>' + tracks[track].duration_ms + '</span></div></div>';
    $('#results').append(trackRow);
    console.log(tracks[track]);
  }
};

/*
  Given a search term as a string, query the Spotify API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: "https://api.spotify.com/v1/search?type=track&q=" + title.replace(" ","+"),
    dataType: "json",
    success: function (data) {
      Trackster.renderTracks(data["tracks"]["items"]);
    }
  });
};
