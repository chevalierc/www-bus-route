$( document ).ready( function() {
    $.ajax( {
        url: '/api/me',
        type: 'GET',
        error: function(){
            document.location.href = window.location.origin
        }
    } );
} )
