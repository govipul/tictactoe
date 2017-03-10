var app = angular.module('tictacToeApp',[]);

app.controller("fullController", ['$scope', function($scope){
  $scope.player = "You always have choice..."
  $scope.isClicked = true;
  var gameBoard = ['','','',
              '','','',
              '','',''];

  var minPlayer = "O";
  var maxPlayer = "X";

  var winner = function(board, player){
    if(
      (board[0]===player && board[1]===player && board[2] === player)||//1st row
      (board[3]===player && board[4]===player && board[5] === player)||//2nd row
      (board[6]===player && board[7]===player && board[8] === player)||//3rd row
      (board[0]===player && board[3]===player && board[6] === player)||//1st column
      (board[1]===player && board[4]===player && board[7] === player)||//2nd column
      (board[2]===player && board[5]===player && board[8] === player)||//3rd column
      (board[2]===player && board[4]===player && board[6] === player)||//right diagonal
      (board[0]===player && board[4]===player && board[8] === player)//left diagonal
    ){
      return true;
    } else {
      return null;
    }
  };

  var tie = function(board){
    var moves = board.join('');
    if(moves.length === 9){
      return true;
    } else {
      return false;
    }
  };

  var validMove =  function(move, player, board){
    var newBoard = board.slice(0);
    if(newBoard[move] === ''){
      newBoard[move] = player;
      return newBoard;
    } else {
      return null;
    }
  };

  var findAiMove = function(board){
    var bestMoveScore = 100;
    let move = null;
    if(winner(board, 'X') || winner(board, 'O' || tie(board))) {
      return true;
    }
    for(var i = 0; i < board.length; i++){
      let newBoard = validMove(i, minPlayer, board);
      //If validMove returned a valid game board
      if(newBoard) {
        var moveScore = maxScore(newBoard);
        if (moveScore < bestMoveScore) {
          bestMoveScore = moveScore;
          move = i;
        }
      }
    }
    return move;
  };

  function minScore(board) {
    if (winner(board, 'X')) {
      return 10;
    } else if (winner(board, 'O')) {
      return -10;
    } else if (tie(board)) {
      return 0;
    } else {
      var bestMoveValue = 100;
      let move = 0;
      for (var i = 0; i < board.length; i++) {
        var newBoard = validMove(i, minPlayer, board);
        if (newBoard) {
          var predictedMoveValue = maxScore(newBoard);
          if (predictedMoveValue < bestMoveValue) {
            bestMoveValue = predictedMoveValue;
            move = i;
          }
        }
      }
      return bestMoveValue;
    }
  }

  function maxScore(board) {
     if(winner(board, 'X')) {
      return 10;
    } else if(winner(board, 'O')) {
      return -10;
    } else if(tie(board)) {
      return 0;
    } else {
      var bestMoveValue = -100;
      let move = 0;
      for (var i = 0; i < board.length; i++) {
        var newBoard = validMove(i, maxPlayer, board);
        if (newBoard) {
          var predictedMoveValue = minScore(newBoard);
          if (predictedMoveValue > bestMoveValue) {
            bestMoveValue = predictedMoveValue;
            move = i;
          }
        }
      }
      return bestMoveValue;
    }
  }
  var computeWinnerOrTie = function(board, player){
      if(winner(board, player)){
        $scope.player = player + " is a WINNER!";
        $scope.isClicked = false;
      } else if(tie(board)){
        $scope.player = "It's a TIE!";
        $scope.isClicked = false;
      }
  };

  $scope.claim = function(cell){
    if(validMove(cell, 'X', gameBoard)){
      var name = "value_";
      $scope[name+cell] = "X";
      gameBoard[cell] = "X";
      computeWinnerOrTie(gameBoard, 'X');
      var aiMove = findAiMove(gameBoard);
      $scope[name+aiMove] = "O";
      gameBoard[aiMove] = "O";
      computeWinnerOrTie(gameBoard, 'O');
    }
  };

  $scope.reset = function() {
    var name = "value_";
    for(var i=0; i< gameBoard.length; i++){
      gameBoard[i] = '';
      $scope[name+i] = '';
    }
    $scope.isClicked = true;
    $scope.player = "Try Again";
  };

}]);
