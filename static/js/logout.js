 $( document ).ready( function() {
    $("#logout").click(function(e){
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.location.href = window.location.origin
    })
 } )
