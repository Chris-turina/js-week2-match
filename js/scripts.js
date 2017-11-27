export class Game{
  constructor(){
    this.timer = 30;
    this.score = 0;
    this.matches = 0;
    this.cardsArr = [];
    this.initializeCards();
    this.firstCard = null;
    this.secondCard = null;
    this.status = "ongoing";
  }
  // using 4x4 layout
  initializeCards(){
    let valueArr = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
    let rowArr = new Array(4);
    for (let i = 0; i < 4; i++){
      rowArr[i] = new Array(4);
      for (let j = 0; j < 4; j++){
        let random = Math.floor(Math.random()*valueArr.length);
        rowArr[i][j] = valueArr[random];
        valueArr.splice(random,1);
      }
    }
    this.cardsArr = rowArr;
  }

  selectCard( x,y ){
    if (this.firstCard !== null){
      // this is backwards on purpose because it goes columns to rows
      this.secondCard = this.cardsArr[y][x];
    } else {
      this.firstCard = this.cardsArr[y][x];
    }
  }

  compareCards(){
    if (this.firstCard === this.secondCard){
      this.matches++;
      this.score++;
    }
    this.firstCard = null;
    this.secondCard = null;
  }

  startTimer(){
    let timer = setInterval(() => {
      this.timer--;
      if (this.timer === 0){
        clearInterval(timer);
        this.status = "loss";
      }
    }, 1000);
  }
}
