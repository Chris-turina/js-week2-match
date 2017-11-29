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
      // htmlString += `<div class='card-wrapper'><div class='card' value="${newGame.cardsArr[i][j]}" x-coord="${j}" y-coord="${i}"><img src="${gifArr[newGame.cardsArr[i][j]]}"></div></div>`;
      htmlString += `<div class='card-wrapper'><div class='card' value="${newGame.cardsArr[i][j]}" x-coord="${j}" y-coord="${i}"><img src="${gifArr[newGame.cardsArr[i][j]]}"></div></div>`;
        }
    htmlString += `</div>`;
  }
  $("#board").append(`${htmlString}`);
}

function loseGame() {
  $.ajax({
    url: "http://api.giphy.com/v1/gifs/random?api_key=UEPKY1Th8yey7GKEx6Ma3W5GMpJ0Sszq&tag=loser&rating=pg&fmt=json",
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
  $(".title").addClass("title-win");
}

$(document).ready(function(){
  let gameDiff = 0;
  // get all yo pics
  const randomTags = ["crazy", "wild", "unicorn", "pokemon", "cute", "lemur"];
  let randomTag = randomTags[Math.floor(Math.random()*randomTags.length)];
  $.ajax({
    url: `http://api.giphy.com/v1/gifs/search?api_key=UEPKY1Th8yey7GKEx6Ma3W5GMpJ0Sszq&q=${randomTag}&limit=8&rating=pg&lang=en&fmt=json`,
    type: "GET",
    data: {
      format: "json"
    },
    success: function(response) {
      for (let k = 0; k < 8; k++){
        gifArr.push(response.data[k].images.fixed_width.url);
        console.log("got yo pics");
      }
    },
    error: function() {
      alert("OOPS IT BROKE");
    }
  });

  $(".difficulty").click(function(){
    gameDiff = parseInt($(this).find(".diff-val").html());
    if (gameDiff === 0) {
      $(".easy").addClass("click-easy");
      $(".medium").removeClass("click-medium");
      $(".hard").removeClass("click-hard");
    } else if (gameDiff === 1) {
      $(".medium").addClass("click-medium");
      $(".easy").removeClass("click-easy");
      $(".hard").removeClass("click-hard");
    } else if (gameDiff === 2) {
      $(".hard").addClass("click-hard");
      $(".medium").removeClass("click-medium");
      $(".easy").removeClass("click-easy");
    }
  });


  $("#start").click(function(){
    $("#start").hide();
    $(".difficulty").hide();
    $("#timer").show();
    $("#score").show();
    newGame.setDifficulty(gameDiff);
    generateBoard();
    updateScoreboard();

    //cheat code
    $(".title h1").click(function(){
      winGame();
    });

    $(".card").each(function(){
      $(this).click(function(){
        // First card clicked starts timer
        if (newGame.status === "ready"){
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
          setTimeout(function(){
            $(".selected").removeClass("selected");
          }, 1000) // flips back

          // before $(".selected").removeClass("selected");
        }
      });
    });
  });

  // refresh-button click code
  // fix this later? since they have to press the start button again 😤 🤗
  $("#refresh-button").click(function(){
    location.reload();
  });
});
