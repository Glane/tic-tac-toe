
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'veggies';
var player2 = 'junkfood';
var currentPlayer = null;
var winner = "winner" 

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]
    // TODO: Check for rest of game winning cases
    || spaces[0] === spaces[3] && spaces[3] === spaces[6]
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[2] === spaces[5] && spaces[5] === spaces[8]
    || spaces[0] === spaces[4] && spaces[4] === spaces[8]
    || spaces[6] === spaces[4] && spaces[4] === spaces[2]
  )
  {
    console.log('somebody won');
    // TODO: Trigger 'game-win' event with the winning player as the event data
    $(document).trigger('game-win', currentPlayer);
  }
};

$('#start_button').on('click', function(e) {
  $("#board").fadeIn();
  spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];
//  THIS IS UNFINISHED... NEED TO "RESET CLASS BACK TO ORIGINAL"
})


$(document).on('click', '#board .space', function (e) {
  var spaceNum = $(e.currentTarget).index();
  console.log('You clicked on space #' + spaceNum);
  
  if (spaces[spaceNum]) {
    alert("that space is already taken");
  }
  else {
    // Space is open to play 
    spaces[spaceNum] = currentPlayer;
    $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);

    checkForWinner();
    setNextTurn();
  }

  // Mark the space with the current player's name
  // TODO: Don't mark it unless the space is blank
  // Add class to elem so css can take care of the visuals
  

});

$(document).on('game-win', function (e, winner) {
  // TODO: Alert who won the game
  alert(winner + " is the WINNER!");
});

// Start the game
setNextTurn();
