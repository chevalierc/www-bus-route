$( document ).ready( function() {
    $.get( "/api/commutes", function( result ) {
        if ( !result.success ) {
            $( "#error" ).text( result.message )
        } else {
            displayResults( result.commutes )
        }
    } );

} )

function displayResults( results ) {
    var $panel = $('#panel').clone();
    $panel.remove()
    for ( i = 0; i < results.length; i++ ) {
        var new_panel = $panel.clone(); // note the use of .clone()
        new_panel.find( '.panel-heading' ).text( results[ i ].startAddress + " to " + results[ i ].endAddress );
        // new_panel.find( '.panel-body' ).text( data.tickets[ i ].description );
        $( '.content' ).append( new_panel );
    }
}
