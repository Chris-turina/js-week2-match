import { Game } from './../js/scripts.js';

let newGame = new Game();
let gifArr = [];

function updateScoreboard() {
  $(".time-remaining").text(newGame.timer);
  $(".points").text(newGame.score);
  if (newGame.status === "lose") {
    loseGame();
  }
  else if (newGame.status === "win") {
    winGame();
  }
}

function generateBoard() {
  let htmlString = "";
  for( let i = 0; i < 4; i++){
    htmlString += `<div class='card-row'>`;
    for( let j = 0; j < 4; j++){
      htmlString += `<div class='card-wrapper'><div class='card' value="${newGame.cardsArr[i][j]}" x-coord="${j}" y-coord="${i}"><img src="${gifArr[newGame.cardsArr[i][j]]}"></div></div>`;
    }
    htmlString += `</div>`;
  }
  $("#board").append(`${htmlString}`);
}

function loseGame() {
  $.ajax({
    url: "http://api.giphy.com/v1/gifs/random?api_key=UEPKY1Th8yey7GKEx6Ma3W5GMpJ0Sszq&tag=lose&rating=pg&fmt=json",
    type: "GET",
    data: {
      format: "json"
    },
    success: function(response) {
      $("#board").fadeOut();
      $("#end-game").prepend(`<img src="${response.data.image_original_url}">`);
      $("#end-game").show();
    },
    error: function() {
      alert("OOPS IT BROKE... but you won~ :D");
    }
  });
}

function winGame() {
  $.ajax({
    url: "http://api.giphy.com/v1/gifs/random?api_key=UEPKY1Th8yey7GKEx6Ma3W5GMpJ0Sszq&tag=win&rating=pg&fmt=json",
    type: "GET",
    data: {
      format: "json"
    },
    success: function(response) {
      $("#board").fadeOut();
      $("#end-game").prepend(`<img src="${response.data.image_original_url}">`);
      $("#end-game").show();
    },
    error: function() {
      alert("OOPS IT BROKE... anyway, you lost.");
    }
  });
}

$(document).ready(function(){
  // test
  $.ajax({
    url: "http://api.giphy.com/v1/gifs/search?api_key=UEPKY1Th8yey7GKEx6Ma3W5GMpJ0Sszq&q=crazy&limit=8&rating=pg&lang=en&fmt=json",
    type: "GET",
    data: {
      format: "json"
    },
    success: function(response) {
      for (let k = 0; k < 8; k++){
        gifArr.push(response.data[k].images.fixed_width.url);
      }
    },
    error: function() {
      alert("OOPS IT BROKE");
    }
  });

  // make sure actually getting gif aff.
  // console.log(gifArr);



  $("#start").click(function(){
    $("#start").hide();
    $("#timer").show();
    $("#score").show();
    generateBoard();
    updateScoreboard();

    $(".card").each(function(){
      $(this).click(function(){
        // First card clicked starts timer
        if (newGame.timer === 30 && newGame.status === "ready"){
          newGame.startTimer();
          const scoreboardInterval = setInterval(function() {
            updateScoreboard();
            if (newGame.status === "win" || newGame.status === "lose") {
              clearInterval(scoreboardInterval);

            }
          }, 100);
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

  // refresh-button click code
  // fix this later since they have to press the start button again 😤 🤗
  $("#refresh-button").click(function(){
    location.reload();
  });
});
