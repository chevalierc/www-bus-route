angular.
        module('routeDetail', []);

        

        angular.
        module('routeDetail').component('routeComments', {
          templateUrl: 'proposed_routes.html'}).
          controller('ProposedRouteController',['$scope',  function($scope){
	    var route_number = location.href.split("=")[1];

	    var ctrl = this
	    ctrl.stops = {}; 
	    ctrl.times = {}
	    
	    ctrl.route_data = {};

	    var storageObject = []

	    $.get('api/route/' + route_number, function(data, status) {
			
			$scope.$apply(ctrl.route_data = data[0]);
			console.log(ctrl.route_data.times); 
			
			$scope.$apply(ctrl.stops = data[0].stops.split(","));
			$scope.$apply(ctrl.times = JSON.parse(data[0].times.toString()));
			storageObject = [ctrl.route_data.endAddress, ctrl.route_data.startAddress]
			function initMap(){
              var directionService = new google.maps.DirectionsService;
              var directionDisplay = new google.maps.DirectionsRenderer;

            var map = new google.maps.Map(document.getElementById('Amap'), {
              zoom: 7,
              center: {lat: 41.85, lng: -87.65}
            });

            directionDisplay.setMap(map);
            onChangeHandler = function(){


                calculateAndDisplayRoute(directionService, directionDisplay);

            }


            function calculateAndDisplayRoute(directionsService, directionDisplay) {

                    directionsService.route({
                        origin: storageObject[0],
                        destination: storageObject[1],
                        travelMode: 'DRIVING'
                    }, function(response, status) {
                       if (status === 'OK') {
                            directionDisplay.setDirections(response);
                        } else {
                            window.alert('Directions request failed due to ' + status);
                        }

              });


                    }
                    angular.element(document).ready(function(){
                        onChangeHandler();
                      });
            };



           initMap();
			 
		}
	    );

	    
		
	    
            this.upVote = function(route){
	     try{
              if(route.upColor['color'] =='red'){
                route.upColor = {'color': 'black'};

              }else{
                route.upColor={'color': 'red'};
                if(route.downColor['color'] =='red'){
                  route.downColor = {'color': 'black'};
                }
              }
		}
		catch(e) {
			route.upColor={'color': 'red'};
			route.downColor = {'color': 'black'};
		}
            }
            this.downVote = function(route){
	     try{
              if(route.downColor['color'] =='red'){
                route.downColor = {'color': 'black'};

              }else{
                route.downColor={'color': 'red'};
                if(route.upColor['color'] =='red'){
                  route.upColor = {'color': 'black'};
                }

              }
            
		}catch(e) {
			route.downColor={'color': 'red'};
			route.upColor = {'color': 'black'};
		
		}
	    }
            
            this.comment = "";
            ctrl.comments = [];

	    $.get('api/comment/' + route_number, function(data, status) {
		
		console.log(data);
		$scope.$apply(ctrl.comments = data);
		}); 

            

            
            this.submitComment = function(comment) {
	      var new_comment = {commuteId: route_number, 
		upVotes : 0, downVotes: 0, text: this.comment };
              
                
	      
              $.post( "/api/comment/" +route_number, new_comment, function( result ) {
                    if(!result.success){
                        alert("unable to post comment");
                    }else{
                        $scope.$apply(ctrl.comments.push(new_comment));
                    }
                });

              this.comment="";
            }



            

          }]


        );
