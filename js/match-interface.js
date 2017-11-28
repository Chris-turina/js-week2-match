import { Game } from './../js/scripts.js';

let newGame = new Game();

function updateTimer() {
  $("#timer h2").text(`Time: ${newGame.timer}`);
  if (newGame.timer === 0) {
    endGame();
  }
}

function generateBoard() {
  let htmlString = "";
  for( let i = 0; i < 4; i++){
    htmlString += `<div class='card-row'>`;
    for( let j = 0; j < 4; j++){
      htmlString += `<div class='card' value="${newGame.cardsArr[i][j]}" x-coord="${j}" y-coord="${i}">${newGame.cardsArr[i][j]}</div>`;
    }
    htmlString += `</div>`;
  }
  $("#board").append(`${htmlString}`);
}

function endGame() {
  $(".card").off("click");
}

$(document).ready(function(){
  $("#start").click(function(){
    generateBoard();
    updateTimer();

    $(".card").each(function(){
      $(this).click(function(){
        if (newGame.timer === 30 && newGame.status === "ready"){
          newGame.startTimer();
          setInterval(function() {
            updateTimer();
          }, 1000);
        }
        let cardY = $(this).attr("y-coord");
        let cardX = $(this).attr("x-coord");
        newGame.selectCard(cardX, cardY);
        $(this).addClass("selected");
        if(newGame.secondCard !== null){
          let result = newGame.compareCards();
          if (result === true) {
            $(".selected").off("click");
            $(".selected").addClass("matched");
          }
          $(".selected").removeClass("selected");
        }
      });
    });
  });
});
