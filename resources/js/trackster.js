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
    });

    $("#searchButton").click(function() {
      if ($('#searchInput').val().trim() !== '') {
        Trackster.searchTracksByTitle($('#searchInput').val());
      }

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
    });
});

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  $('#results').empty();
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
