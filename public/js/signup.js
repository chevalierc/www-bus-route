$( document ).ready( function() {
    $( "#signup" ).click( function( e ) {
        var email = $( "#email" ).val()
        var password = $( "#password" ).val()

        var data = {
            "email": email,
            "password": password
        }

        $.post( "/api/users", data, function( result ) {
                if(!result.success){
                    $("#error").text(result.message)
                }
            }
        );

    } )
} )
