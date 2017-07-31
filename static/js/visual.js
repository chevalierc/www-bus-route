var map, heatmap;

function initMap() {
    map = new google.maps.Map( document.getElementById( 'map' ), {
        zoom: 11,
        center: {
            lat: 42.3601,
            lng: -71.0589
        },
        mapTypeId: 'satellite'
    } );

    $.get( "/api/visual", function( result ) {
        if ( !result.success ) {
            $( "#error" ).text( result.message )
        } else {
            displayResults( result.data )
        }
    } );

}

function displayResults(results){
    cleanData = []
    for(var i = 0; i < results.length; i++){
        var newPoint = new google.maps.LatLng( results[i].lat, results[i].long )
        cleanData.push( newPoint )
    }
    heatmap = new google.maps.visualization.HeatmapLayer( {
        data: cleanData,
        map: map
    } );
    heatmap.set( 'radius', 20 )
}
