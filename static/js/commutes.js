$( document ).ready( function() {
    $.ajax( {
        url: '/api/commutes',
        type: 'GET',
        success: function( result ) {
            if ( !result.success ) {
                $( "#error" ).text( result.message )
            } else {
                displayResults( result.commutes )
            }
        },
        error: function(){
            document.location.href = window.location.origin
        }
    } );
} )

function displayResults( results ) {
    var $panel = $( '#panel' ).clone();
    $( '#panel' ).remove()
    for ( i = 0; i < results.length; i++ ) {
        var new_panel = $panel.clone();
        new_panel.css("display","block");//make visable
        new_panel.find( '.start' ).text( results[ i ].startAddress );
        new_panel.find( '.end' ).text( results[ i ].endAddress );
        new_panel.find( '.panel-body' ).text( createBody( results[ i ] ) );
        new_panel.find( '.btn' ).attr( "id", results[ i ].id );
        new_panel.find( '.btn' ).click( function( e ) {
            var id = e.target.attributes[ "id" ].value
            $.ajax( {
                url: '/api/commute/' + id,
                type: 'DELETE',
                success: function( result ) {
                    if ( result.success ) {
                        location.reload();
                    } else {
                        $( "#error" ).text( result.message )
                        console.log( error )
                    }
                }
            } );
        } )
        $( '#content' ).append( new_panel );
    }
}

function createBody( commute ) {
    var string = ""
    var days = getDaysOfCommuteAsArray( commute )
    for ( var i = 0; i < days.length; i++ ) {
        string += days[ i ]
        if ( i == days.length - 2 ) {
            string += " and "
        } else if ( i < days.length - 2 ) {
            string += ", "
        }
    }
    if ( commute.timeType ) {
        string += " leaving at "
    } else {
        string += " arriving at "
    }
    string += commute.time; //TODO: cleanup date
    return string
}

function getDaysOfCommuteAsArray( commute ) {
    var days = []
    if ( commute.sun ) {
        days.push( "Sunday" )
    }
    if ( commute.mon ) {
        days.push( "Tuesday" )
    }
    if ( commute.wed ) {
        days.push( "Wednesday" )
    }
    if ( commute.thu ) {
        days.push( "Thursday" )
    }
    if ( commute.fri ) {
        days.push( "Friday" )
    }
    if ( commute.sat ) {
        days.push( "Saturday" )
    }
    return days
}
