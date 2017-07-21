$( document ).ready( function() {
    $("#submit").click(function(e){
        submit();
    })
})

function submit(){
    var data = {}
    $("#error").text("")

    //addresses
    if( $("#startAddress").val() !== ""){
        data.startAddress = $("#startAddress").val()
    }else{
        $("#error").text("Need Start Address")
        return
    }
    if( $("#endAddress").val() !== ""){
        data.endAddress = $("#endAddress").val()
    }else{
        $("#error").text("Need End Address")
        return
    }

    data.timeType = $('input[name=time_type]:checked').val();
    data.sun = $("#sunday_checkbox").prop('checked')
    data.mon = $("#monday_checkbox").prop('checked')
    data.tue = $("#tuesday_checkbox").prop('checked')
    data.wed = $("#wednesday_checkbox").prop('checked')
    data.thu = $("#thursday_checkbox").prop('checked')
    data.fri = $("#friday_checkbox").prop('checked')
    data.sat = $("#saturday_checkbox").prop('checked')
    data.time = $("#time").val()

    //submit
    $.get(getGeocodeURL(data.startAddress), function(res){
        data.startLocationLong = res.results[0].geometry.location.lng
        data.startLocationLat = res.results[0].geometry.location.lat
        $.get(getGeocodeURL(data.endAddress), function(res){
            data.endLocationLong = res.results[0].geometry.location.lng
            data.endLocationLat = res.results[0].geometry.location.lat
            $.post( "/api/commute", data, function( result ) {
                    if(!result.success){
                        $("#error").text(result.message)
                    }else{
                        document.location.href = window.location.origin + "/commutes.html"
                    }
                }
            );
        })
    })
}

function getGeocodeURL(address){
    var APIKEY = "AIzaSyB4Jp84_vA4ovjL_I3xPf1KsxvWlG_Tu6A"
    var address = encodeURIComponent(address);
    return "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + APIKEY
}

function initMap() {
    var directionService = new google.maps.DirectionsService;
    var directionDisplay = new google.maps.DirectionsRenderer;

    var map = new google.maps.Map(document.getElementById('Amap'), {
        zoom: 7,
        center: {
            lat: 41.85,
            lng: -87.65
        }
    });

    directionDisplay.setMap(map);

    document.getElementById('startAddress').addEventListener('blur', onChangeHandler);
    document.getElementById('endAddress').addEventListener('blur', onChangeHandler);

    var onChangeHandler = function() {
        if (document.getElementById('startAddress').value !== '' && document.getElementById('endAddress').value !== '') {
            calculateAndDisplayRoute(directionService, directionDisplay);
        }
    }
}

function calculateAndDisplayRoute(directionsService, directionDisplay) {
    directionsService.route({
        origin: document.getElementById('startAddress').value,
        destination: document.getElementById('endAddress').value,
        travelMode: 'DRIVING'
    }, function(data, status) {
        if (status === 'OK') {
            directionDisplay.setDirections(data);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
