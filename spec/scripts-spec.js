import { Game } from './../js/scripts.js';

describe('Game', function() {
  let newGame;

  it('should create card array and have a number type in specific index', function() {
    newGame = new Game();
    expect(newGame.cardsArr[2][2]).not.toEqual(undefined);
    expect(newGame.cardsArr[3][3]).not.toEqual(undefined);
  });

  it('should assign first card a value', function() {
    newGame = new Game();
    newGame.selectCard(2,2);
    expect(newGame.cardsArr[2][2]).toEqual(newGame.firstCard);
  });

  it('should assign both cards a value', function(){
    newGame = new Game();
    newGame.selectCard(1,1);
    newGame.selectCard(2,3);
    expect(newGame.cardsArr[1][1]).toEqual(newGame.firstCard);
    expect(newGame.cardsArr[3][2]).toEqual(newGame.secondCard);
  });

  it('should compare the selected cards', function(){
    newGame = new Game();
    newGame.firstCard = 1;
    newGame.secondCard = 1;
    newGame.compareCards();
    expect(newGame.matches).toEqual(1);
    expect(newGame.score).toEqual(1);
    expect(newGame.firstCard).toEqual(null);
    expect(newGame.secondCard).toEqual(null);
  });

  it('should set timer to 25 after 5 seconds have passed', function(){
    newGame = new Game();
    jasmine.clock().install();
    newGame.startTimer();
    jasmine.clock().tick(5000);
    expect(newGame.timer).toEqual(25);
    jasmine.clock().uninstall();
  });

  it('should reach game over after 30 seconds have passed', function(){
    newGame = new Game();
    jasmine.clock().install();
    newGame.startTimer();
    jasmine.clock().tick(30000);
    expect(newGame.timer).toEqual(0);
    expect(newGame.status).toEqual("loss");
    jasmine.clock().uninstall();
  });

  it('should still be going at 29 seconds', function() {
    newGame = new Game();
    jasmine.clock().install();
    newGame.startTimer();
    jasmine.clock().tick(29999);
    expect(newGame.timer).toEqual(1);
    expect(newGame.status).toEqual("ongoing");
    jasmine.clock().uninstall();
  })
});
