$( document ).ready( function() {
    $( "#register-btn" ).click( function( e ) {
        e.preventDefault()
        
        var email = $( "#signup-email" ).val()
        var password = $( "#signup-password" ).val()
        var confirm = $( "#signup-confirm" ).val()

        var data = {
            "email": email,
            "password": password
        }

        console.log(password, confirm)

        if(password != confirm){
            return $("#signup-error").text("Paswords dont match!")
        }

        $.post( "/api/users", data, function( result ) {
                if(!result.success){
                    $("#signup-error").text(result.message)
                }else{
                    document.cookie='access_token=' + result.token //store access token in cookies
                    document.location.href = window.location.origin + "/cr_commute.html"
                }
            }
        );

    } )
} )
