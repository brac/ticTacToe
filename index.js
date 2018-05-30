// jshint asi:true
// TODO: Display something when clicked
//     Alternate players on click on empty space
//     Dispaly the correct symbol depending on player
//     Check for win
//     Flash winning row
//     Flash tied grid
//     Reset board, keep score


(function () {

  class Gameboard{
    constructor(element) {
      this.turnCount = 0
      this.element = element
    }
  }


  document.addEventListener('DOMContentLoaded', () => {
    const gameboard = new Gameboard(document.querySelector('.gameboard'))

    gameboard.element.addEventListener('click', (event) => {
      console.log(event.target)

    })
  })
})()