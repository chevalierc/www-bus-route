$( document ).ready( function() {
    $( "#login-btn" ).click( function( e ) {
        e.preventDefault()
        
        var email = $( "#login-email" ).val()
        var password = $( "#login-password" ).val()

        var data = {
            "email": email,
            "password": password
        }

        $.post( "/api/authenticate", data, function( result ) {
                if(!result.success){
                    $("#login-error").text(result.message)
                }else{
                    document.cookie='access_token=' + result.token //store access token in cookies
                    document.location.href = window.location.origin + "/cr_commute.html"
                }
            }
        );

    } )
} )
