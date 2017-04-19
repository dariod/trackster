var Trackster = {};

$( document ).ready(function() {
    /*
      Search button handler
    */
    $("#searchInput").keypress(function(key) {
      if(key.which == 13) {
        console.log("Pressed ENTER on #searchInput");
        $("#searchButton").click();
      }
      return
    });

    $("#searchButton").click(function() {
      if ($('#searchInput').val().trim() !== '') {
        Trackster.searchTracksByTitle($('#searchInput').val());
      }
      return
    });

    /*
      xButton handler: clears the input box
    */
    $("#xButton").click(function() {
      $("#searchInput").val(null);
      /*
        Do not understand why this second one is necessary? Safari related bug?
      */
      $("#searchInput").val(null);
      return
    });
});

/*
  Give a duration in ms returns a durtaion in the format mm:ss
 */
Trackster.msToDuration = function (ms) {
  var options = { minute: '2-digit', second: '2-digit' };
  return (new Intl.DateTimeFormat('en-US', options).format(ms));
}
/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  $('#results').empty();
  for (var track in tracks) {
    var trackRow = '<div class="row" id="resultRow">' +
    '<div class="               col-xs-1  col-sm-1  col-md-1 col-lg-1 text-center"><a href="' + tracks[track].preview_url + '"><i class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i></a></div>' +
    '<div class="noTextWrapping col-xs-1  col-sm-1  col-md-1 col-lg-1 text-right">' + track + '</div>'+
    '<div class="noTextWrapping col-xs-10 col-sm-7  col-md-3 col-lg-3">' + tracks[track].name + '</div>'+
    '<div class="noTextWrapping hidden-xs col-sm-3  col-md-2 col-lg-2">' + tracks[track].artists[0].name + '</div>'+
    '<div class="noTextWrapping hidden-xs hidden-sm col-md-3 col-lg-3">' + tracks[track].album.name + '</div>'+
    '<div class="noTextWrapping hidden-xs hidden-sm col-md-1 col-lg-1">' + tracks[track].popularity + '</div>'+
    '<div class="noTextWrapping hidden-xs hidden-sm col-md-1 col-lg-1">' + Trackster.msToDuration(tracks[track].duration_ms) + '</div></div>';
    $('#results').append(trackRow);
  }
};

/*
  Given a search term as a string, query the Spotify API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: "https://api.spotify.com/v1/search?type=track&q=" + title.replace(" ","+") + "&limit=50",
    dataType: "json",
    beforeSend: function () {
      /*
        Animate between logo and looking
      */
      $("#tracksterLogo").queue( function () {
        $("#tracksterLogo").fadeOut(1000);
        $(this).dequeue();
      });
      $("#tracksterLogo").queue( function () {
        $("#tracksterLogo").html("<h1>L<i class=\"fa fa-eye\" aria-hidden=\"true\"></i><i class=\"fa fa-eye\" aria-hidden=\"true\"></i>king...</h1>");
        $(this).dequeue();
      });
      $("#tracksterLogo").queue( function () {
        $("#tracksterLogo").fadeIn(1000).delay(500);
        $(this).dequeue();
      });
      },
    success: function (data) {
      Trackster.renderTracks(data["tracks"]["items"]);
      },
    complete: function () {
      /*
        Animate between looking and logo
      */
      $("#tracksterLogo").promise().done( function () {
        $("#tracksterLogo").queue( function () {
          $("#tracksterLogo").fadeOut(1000)
          $(this).dequeue();
        });
        $("#tracksterLogo").queue( function () {
          $("#tracksterLogo").html("<h1>trackster</h1>");
          $(this).dequeue();
        });
        $("#tracksterLogo").queue( function () {
          $("#tracksterLogo").fadeIn(1000);
          $(this).dequeue();
        });
      });
    }
  });
};
