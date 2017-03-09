var app = angular.module('tictacToeApp',[]);


app.controller("fullController", ['$scope', function($scope){

  $scope.matrix = [[-1,-1,-1],
                   [-1,-1,-1],
                   [-1,-1,-1]];

  $scope.fillBox = function(){
    if($scope.matrix[0][1] == -1){
      $scope.matrix[0][1] = 1;
    } else {
      alert("Filled");
    }
  };
}]);
