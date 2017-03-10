var app = angular.module('tictacToeApp',[]);

app.controller("fullController", ['$scope', function($scope){

  var turn = 0;

  var computeWinner = function(row, col){
    return (checkForDiagoWin(row, col));
  }

  var checkForRowWin = function(row, col){
    var val = $scope.matrix[row][col];
    for(var i=0; i < $scope.matrix.length; i++){
      if(val !== $scope.matrix[row][i]){
        return false;
      }
    }
    return true;
  }

  var checkForColWin = function(row, col){
    var val = $scope.matrix[row][col];
    for(var i=0; i < $scope.matrix.length; i++){
      if(val !== $scope.matrix[i][col]){
        return false;
      }
    }
    return true;
  }

/*
 * Need to improve the logic, need to make ot dynamic
 */
  var checkForDiagoWin = function(row, col){
    return (
      ($scope.matrix[0][0]!==-1 &&
        $scope.matrix[1][1]!==-1 &&
        $scope.matrix[2][2]!==-1) &&
        ($scope.matrix[0][0] === $scope.matrix[1][1]
      && $scope.matrix[1][1] === $scope.matrix[2][2]
      && $scope.matrix[0][0] === $scope.matrix[2][2])
      ||
      ($scope.matrix[1][1]!==-1 &&
        $scope.matrix[0][2]!==-1 &&
        $scope.matrix[2][0]!==-1) && ($scope.matrix[0][2] === $scope.matrix[1][1]
        && $scope.matrix[1][1] === $scope.matrix[2][0]
        && $scope.matrix[0][2] === $scope.matrix[2][0])
      );
  }
  var isCellAvailable = function(row, col){
    return $scope.matrix[row][col] == -1
  }

  var isFullyFilled = function(){
    //alert( $scope.matrix.length);
    for(var i=0; i < $scope.matrix.length; i++){
      for(var j=0; j < $scope.matrix[i].length; j++){
        console.log("-----------> " + i + " ------- " + j);
          if($scope.matrix[i][j] === -1){
            return false;
          }
      }
      return true;
    }
  }

  var isMyTurn = function(){
    var cellValue = ""
    if(turn%2 != 0){
      cellValue = "X";
    } else {
      cellValue = "O";
    }
    turn++;
    return cellValue;
  }

  var clearValue = function(){
    $scope.matrix = [[-1,-1,-1],
                     [-1,-1,-1],
                     [-1,-1,-1]];
    turn = 0;

    for(var i=0; i < $scope.matrix.length; i++){
      for(var j=0; j < $scope.matrix[i].length; j++){
        var name = "cellValue_"+i+"_"+j;
        $scope[name] = "";
      }
    }
  }
  clearValue();
  $scope.fillBox = function(row, col){
    if(isCellAvailable(row, col)){
      var cellValue = isMyTurn();
      var name = "cellValue_"+row+"_"+col;
      $scope.matrix[row][col] = cellValue;
      $scope[name] = cellValue;
      var isWin = computeWinner(row, col);
      if(isWin){
        alert("Game Over, " + cellValue + " is a WINNER!");
        clearValue();
        return;
      } else if(isFullyFilled()) {
        alert("Match is draw, try again");
        clearValue();
      }
    } else {
      alert("Please select different zone");
    }
  };
}]);
