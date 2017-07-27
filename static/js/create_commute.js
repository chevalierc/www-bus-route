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
    data.sun = $("#sunday_checkbox").prop('checked')? 1: 0
    data.mon = $("#monday_checkbox").prop('checked')? 1: 0
    data.tue = $("#tuesday_checkbox").prop('checked')? 1: 0
    data.wed = $("#wednesday_checkbox").prop('checked')? 1: 0
    data.thu = $("#thursday_checkbox").prop('checked')? 1: 0
    data.fri = $("#friday_checkbox").prop('checked')? 1: 0
    data.sat = $("#saturday_checkbox").prop('checked')? 1: 0
    data.time =$("#time").val()

    console.log(data)

    //submit
    $.get(getGeocodeURL(data.startAddress), function(res){
        if(res.status != "OK"){
            $("#error").text("Start Address Error. Please make sure the address is complete.")
            return
        }
        data.startLocationLong = res.results[0].geometry.location.lng
        data.startLocationLat = res.results[0].geometry.location.lat
        $.get(getGeocodeURL(data.endAddress), function(res){
            if(res.status != "OK"){
                $("#error").text("Start Address Error. Please make sure the address is complete.")
                return
            }
            data.endLocationLong = res.results[0].geometry.location.lng
            data.endLocationLat = res.results[0].geometry.location.lat
            console.log(data)
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

    var location = {
        lat: 40.71,
        lng: 74
    }

    var map = new google.maps.Map(document.getElementById('Amap'), {
        zoom: 9,
        center: location
    });
    directionDisplay.setMap(map);


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(userLocation){
            location.lat = userLocation.coords.latitude
            location.lng = userLocation.coords.longitude
            map.setCenter(location);
        });
    }

    $('#startAddress').on("click", onChangeHandler)
    $('#endAddress').on("blur", onChangeHandler)

    function onChangeHandler() {
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
