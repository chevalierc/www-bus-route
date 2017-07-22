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
    $('#panel').remove()
    for ( i = 0; i < results.length; i++ ) {
        var new_panel = $panel.clone();
        new_panel.find('.start').text( results[ i ].startAddress );
        new_panel.find('.end').text(results[ i ].endAddress);
        new_panel.find('.panel-body').text( createBody(results[i]) );
        $( '#content' ).append( new_panel );
    }
}

function createBody( commute ){
    var string = ""
    var days = getDaysOfCommuteAsArray(commute)
    for(var i = 0; i < days.length; i++){
        string += days[i]
        if( i == days.length-2){
            string += " and "
        }else if (i < days.length-2){
            string += ", "
        }
    }
    if(commute.timeType){
        string += " leaving at "
    }else{
        string += " arriving at "
    }
    string += commute.time;//TODO: cleanup date
    return string
}

function getDaysOfCommuteAsArray(commute){
    var days = []
    if(commute.sun){
        days.push("Sunday")
    }
    if(commute.mon){
        days.push("Tuesday")
    }
    if(commute.wed){
        days.push("Wednesday")
    }
    if(commute.thu){
        days.push("Thursday")
    }
    if(commute.fri){
        days.push("Friday")
    }
    if(commute.sat){
        days.push("Saturday")
    }
    return days
}
