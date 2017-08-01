angular.
 module('routeList', []);

 angular.
 module('routeList').
 component('routesList', {
   templateUrl: 'proposed_route_changes.html'}).
   controller('RouteListController',['$scope','$http','$rootScope', function ($scope, $http,$rootScope, ) {
	var ctrl = this;
     
  	ctrl.routes = [{color:""},{color:""},{color:""}]; 
   
	$.get('api/route', function(data, status){
		console.log(data.commutes);
               
		$scope.$apply(ctrl.routes = data.commutes);
		
	});
    


   this.upVote = function(route){
    
	try{
     		if(route.color['color'] == 'red'){
       			route.color = {'color': 'black'};
       			route.upVotes = route.upVotes - 1;
			route.upVotes = route.upVotes.toString();
			console.log(route);

			$.ajax({
				url : '/api/route', 
				type : "PUT", 
				data : route,
				success : function(response){
					console.log(response);
					}
				});
     		}else{
       			route.color = {'color': 'red'};
       			route.upVotes = parseInt(route.upVotes) + 1;
			route.upVotes = route.upVotes.toString();
			console.log(route);

			$.ajax({
				url : '/api/route', 
				type : "PUT", 
				data : route,
				success : function(response){
					console.log(response);
					}
				});
     		}
	} catch(e) {
		        route.color = {'color': 'red'};
       			route.upVotes = parseInt(route.upVotes)  + 1;
			route.upVotes = route.upVotes.toString();
			console.log(route);

			$.ajax({
				url : '/api/route', 
				type : "PUT", 
				data : route,
				success : function(response){
					console.log(response);
					}
				});
	}
	
   }
   

   } ]);
 



