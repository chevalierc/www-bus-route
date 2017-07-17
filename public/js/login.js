$( document ).ready( function() {
    $( "#login" ).click( function( e ) {
        var email = $( "#email" ).val()
        var password = $( "#password" ).val()

        var data = {
            "email": email,
            "password": password
        }

        $.post( "/api/authenticate", data, function( result ) {
                if(!result.success){
                    $("#error").text(result.message)
                }else{
                    document.cookie='access_token=' + result.token //store access token in cookies
                }
            }
        );

    } )
} )
