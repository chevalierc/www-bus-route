$( document ).ready( function() {
    $( "#submit" ).click( function( e ) {
        submit();
    } )
    setupDayOfWeekSelector()
    setUpLeaveArriveSelector()
} )

function setUpLeaveArriveSelector() {
    $( ".leave-arrive" ).click( function( e ) {
        if ( $( this ).attr( "class" ).includes( "leave-arrive-inactive" ) ) {
            $( ".leave-arrive-active" ).each( function( index ) {
                $( this ).addClass( "leave-arrive-inactive" );
                $( this ).removeClass( "leave-arrive-active" );
            })
            $( this ).addClass( "leave-arrive-active" );
            $( this ).removeClass( "leave-arrive-inactive" );
        }
    } )
}

function getValuesForLeaveArrive() {
    var result = 0;
    $( ".leave-arrive" ).each( function( index ) {
        if ( $( this ).attr( "class" ).includes( "leave-arrive-active" ) ) {
            if( $(this).attr("id") == "leave-by"){
                result = 0
            }else{
                result = 1
            }
        }
    } );
    return result;
}

function setupDayOfWeekSelector() {
    $( ".dow" ).click( function( e ) {
        if ( $( this ).attr( "class" ).includes( "dow-active" ) ) {
            $( this ).removeClass( "dow-active" );
            $( this ).addClass( "dow-inactive" );
        } else {
            $( this ).addClass( "dow-active" );
            $( this ).removeClass( "dow-inactive" );
        }
    } )
}

function getValuesForDayOfWeek() {
    var data = {}
    $( ".dow" ).each( function( index ) {
        if ( $( this ).attr( "class" ).includes( "dow-active" ) ) {
            data[ $( this ).attr( "id" ) ] = 1;
        } else {
            data[ $( this ).attr( "id" ) ] = 0;
        }
    } );
    return data
}

function submit() {
    var data = {}
    $( "#error" ).text( "" )

    //addresses
    if ( $( "#startAddress" ).val() !== "" ) {
        data.startAddress = $( "#startAddress" ).val()
    } else {
        $( "#error" ).text( "Need Start Address" )
        return
    }
    if ( $( "#endAddress" ).val() !== "" ) {
        data.endAddress = $( "#endAddress" ).val()
    } else {
        $( "#error" ).text( "Need End Address" )
        return
    }

    data.timeType = getValuesForLeaveArrive()
    $.extend(data, getValuesForDayOfWeek() ) //add values for DayOfWeek selector
    data.time = $( "#time" ).val()

    console.log( data )

    //submit and get long lat of addresses while there
    $.get( getGeocodeURL( data.startAddress ), function( res ) {
        if ( res.status != "OK" ) {
            $( "#error" ).text( "Start Address Error. Please make sure the address is complete." )
            return
        }
        data.startLocationLong = res.results[ 0 ].geometry.location.lng
        data.startLocationLat = res.results[ 0 ].geometry.location.lat
        $.get( getGeocodeURL( data.endAddress ), function( res ) {
            if ( res.status != "OK" ) {
                $( "#error" ).text( "Start Address Error. Please make sure the address is complete." )
                return
            }
            data.endLocationLong = res.results[ 0 ].geometry.location.lng
            data.endLocationLat = res.results[ 0 ].geometry.location.lat
            console.log( data )
            $.post( "/api/commute", data, function( result ) {
                if ( !result.success ) {
                    $( "#error" ).text( result.message )
                } else {
                    document.location.href = window.location.origin + "/commutes.html"
                }
            } );
        } )
    } )
}

function getGeocodeURL( address ) {
    var APIKEY = "AIzaSyB4Jp84_vA4ovjL_I3xPf1KsxvWlG_Tu6A"
    var address = encodeURIComponent( address );
    return "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + APIKEY
}

function initMap() {
    var directionService = new google.maps.DirectionsService;
    var directionDisplay = new google.maps.DirectionsRenderer;

    var location = {
        lat: 40.71,
        lng: 74
    }

    var map = new google.maps.Map( document.getElementById( 'Amap' ), {
        zoom: 9,
        center: location
    } );
    directionDisplay.setMap( map );


    if ( navigator.geolocation ) {
        navigator.geolocation.getCurrentPosition( function( userLocation ) {
            location.lat = userLocation.coords.latitude
            location.lng = userLocation.coords.longitude
            map.setCenter( location );
        } );
    }

    $( '#startAddress' ).on( "click", onChangeHandler )
    $( '#endAddress' ).on( "blur", onChangeHandler )

    function onChangeHandler() {
        if ( document.getElementById( 'startAddress' ).value !== '' && document.getElementById( 'endAddress' ).value !== '' ) {
            calculateAndDisplayRoute( directionService, directionDisplay );
        }
    }

}

function calculateAndDisplayRoute( directionsService, directionDisplay ) {
    directionsService.route( {
        origin: document.getElementById( 'startAddress' ).value,
        destination: document.getElementById( 'endAddress' ).value,
        travelMode: 'DRIVING'
    }, function( data, status ) {
        if ( status === 'OK' ) {
            directionDisplay.setDirections( data );
        } else {
            window.alert( 'Directions request failed due to ' + status );
        }
    } );
}
