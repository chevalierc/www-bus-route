angular.
module( 'routeList', [] );

angular.
module( 'routeList' ).
component( 'routesList', {
    templateUrl: 'angular_directives/proposed_route_changes.html'
} ).
controller( 'RouteListController', [ '$scope', function( $scope ) {
    var ctrl = this;

    ctrl.routes = [ {
        color: ""
    }, {
        color: ""
    }, {
        color: ""
    } ];

    $.get( 'api/route', function( data, status ) {
        for(var i = 0; i < data.commutes.length; i++){
            if( data.commutes[i].upvoted == 1){
                data.commutes[i].color = {
                    'color': 'red'
                }
            }else{
                data.commutes[i].color = {
                    'color': 'black'
                }
            }
        }
        $scope.$apply(function(){
            ctrl.routes = data.commutes
        });
    } );

    this.upVote = function( i ) {
        if ( ctrl.routes[i].color[ 'color' ] == 'red') {
            ctrl.routes[i].color = {
                'color': 'black'
            };
            ctrl.routes[i].upVotes = Number( ctrl.routes[i].upVotes) -1
        } else {
            ctrl.routes[i].color = {
                'color': 'red'
            };
            ctrl.routes[i].upVotes = Number( ctrl.routes[i].upVotes) +1
        }
        console.log(ctrl)
        $.ajax( {
            url: '/api/upvote_route/' + ctrl.routes[i].id,
            type: "post",
            success: function( response ) {
                console.log( response );
            }
        } );
    }


} ] );
