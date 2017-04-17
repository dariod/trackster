var Trackster = {};

$( document ).ready(function() {
    console.log( "ready!" );

    /*
      Search button handler
    */
    $("#searchInput").keypress(function(key) {
      if(key.which == 13) {
        $("#searchButton").click();
      }
    });

    $("#searchButton").click(function() {
      console.log("#searchButton: .click()");
      console.log("#searchInput content: '" + $('#searchInput').val() + "'");
      if ($('#searchInput').val().trim() !== '') {
        Trackster.searchTracksByTitle($('#searchInput').val())
      }
    });

    /*
      xButton handler: clears the input box
    */
    $("#xButton").click(function() {
      console.log("#xButton: .click()");
      $("#searchInput").val(null);
      /*
        Do not understand why this second one is necessary? Safari related bug?
      */
      $("#searchInput").val(null);
      console.log("#searchInput content: '" + $('#searchInput').val() + "'");
    });
});

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  $('#results').empty();
  console.log("Redering tracks list...");
  for (var track in tracks) {
    var trackRow = '<div class="row" id="resultRow">' +
    '<div class="col-xs-1 text-center"><a href="' + tracks[track].preview_url + '"><i class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i></a></div>' +
    '<div class="col-xs-1 text-right tableCell"><span>' + track + '</span></div>'+
    '<div class="col-xs-3 tableCell"><span>' + tracks[track].name + '</span></div>'+
    '<div class="col-xs-2 tableCell"><span>' + tracks[track].artists[0].name + '</span></div>'+
    '<div class="col-xs-3 tableCell"><span>' + tracks[track].album.name + '</span></div>'+
    '<div class="col-xs-1 tableCell"><span>' + tracks[track].popularity + '</span></div>'+
    '<div class="col-xs-1 tableCell"><span>' + tracks[track].duration_ms + '</span></div></div>';
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
