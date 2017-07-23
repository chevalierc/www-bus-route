angular.
 module('routeList', []);

 angular.
 module('routeList').
 component('routesList', {
   templateUrl: 'proposed_route_changes.html',
   controller:['$scope', function RouteListController($scope) {
     this.routes = [
       {
         id:"1",
         title: 'Bus to Cambridge',
         snippet: 'this bus will go to Cambridge.',
         comments: 1,
         upVotes : 140,
         color: {}
       }, {
         id:"2",
         title: 'Bus from fort point to Sommerville',
         snippet: 'This bus will go from Fort Point ot Sommerville through down town boston',
         comments: 2,
         upVotes : 34,
         color: {}
       }, {
         id:"2",
         title: 'Bus to go through quincy to Braintree',
         snippet: 'this bus will go to Braintree through Quincy.',
         comments: 3,
         upVotes : 12,
         color: {}
       }
     ];

   this.upVote = function(route){
     if(route.color['color'] =='red'){
       route.color = {'color': 'black'};
       route.upVotes = route.upVotes - 1;
     }else{
       route.color={'color': 'red'};
       route.upVotes = route.upVotes  + 1;
     }
   }

   } ]
 });
