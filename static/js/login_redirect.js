//if on logged in page and logged in redirect to create_commute page
$( document ).ready( function() {
    $.ajax( {
        url: '/api/me',
        type: 'GET',
        success: function(){
            document.location.href = window.location.origin + "/create_commute"
        }
    } );
} )
