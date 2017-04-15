/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
$( document ).ready(function() {
    console.log( "ready!" );

    /*
      Search button handler
    */
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
