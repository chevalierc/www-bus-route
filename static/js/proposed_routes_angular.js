angular.
        module('routeDetail', []);

        angular.
        module('routeDetail').
        component('routesSchedule', {
          template: `
          <table class="table">
            <thead>
              <tr >
                <th ng-repeat="stop in $ctrl.stops">{{stop}}</th>
              </tr>
            </thead>
            <tbody>
              <tr ng-repeat="time in $ctrl.times">

                <td ng-repeat="Atime in time">{{Atime}}</td>

              </tr>
              <tr>

              </tr>


            </tbody>
          </table>`,
          controller: ['$scope', function($scope){
            this.stops = [
              "Ruggles", "State St.","Newbury St.", "Back Bay"
            ];
            this.times = [
              ["9:00","9:15","9:20","9:25"],
              ["10:00","10:15","10:20","10:25"],
              ["11:00","11:15","11:20","11:25"],
              ["12:00","12:15","12:20","12:25"],
            ];

          }]
        })

        angular.
        module('routeDetail').component('routeComments', {
          templateUrl: 'proposed_routes.html',
          controller: ['$scope', function($scope){
            this.upVote = function(route){
              if(route.upColor['color'] =='red'){
                route.upColor = {'color': 'black'};

              }else{
                route.upColor={'color': 'red'};
                if(route.downColor['color'] =='red'){
                  route.downColor = {'color': 'black'};
                }
              }
            }
            this.downVote = function(route){
              if(route.downColor['color'] =='red'){
                route.downColor = {'color': 'black'};

              }else{
                route.downColor={'color': 'red'};
                if(route.upColor['color'] =='red'){
                  route.upColor = {'color': 'black'};
                }

              }
            }
            this.startAddress = '555 Huntington Ave. Boston, MA';
            this.endAddress = '525 Hungton Ave. Boston, MA';
            this.routeNumber = 56;
            this.comment = "";

            storageObject = [this.startAddress, this.endAddress]

            this.comments =[
              {
                text: "terrible route",
                upColor: {},
                downColor :{}
              },
              {
                text: 'The bus was late this morning.',
                upColor:{},
                downColor :{}
              },
              {
                text: "This would be a great change",
                upColor: {},
                downColor :{}
              }
            ];

            this.submitComment = function() {
              this.comments.push({text: this.comment,
                upColor: {},
                downColor :{}});


              this.comment="";
            }



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

          }]


        });
