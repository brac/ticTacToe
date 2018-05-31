// jshint asi:true
// TODO: Display something when clicked
//     Dispaly the correct symbol depending on player
//     Check for win
//     Flash winning row
//     Flash tied grid
//     Reset board, keep score


(function () {

  class TicTacToeBoard{
    constructor(gameboard, scoreboard) {
      this.turnCount = 0
      this.gameboard = gameboard
      this.scoreboard = scoreboard
      this.playerTurn = 0
      this.player1Score = scoreboard.querySelector('.scoreboard-player1')
      this.player2Score = scoreboard.querySelector('.scoreboard-player2')
      this.state = []
    }

    input(value){
      const clickedSpace =  this.gameboard.querySelector(`.${value.classList[0]}`)
      console.log(clickedSpace.classList[0].split('-')[1])

      if (this.playerTurn < 1) {
        // Add player turn to state
        this.state.push(`${clickedSpace.classList[0].split('-')[1]}o`)

        // Display o on the clicked square
        clickedSpace.children[0].classList.remove('hidden')

        // Switch focused and unfocused player turns
        this.player1Score.classList.add('unfocused')
        this.player2Score.classList.remove('unfocused')

        // Increment turn count
        this.turnCount++
        if (this.turnCount >= 5) {
          this.checkForWin(this.playerTurn, this.state)
        }

        // Switch to next player
        this.playerTurn++

      } else {
        // Add player turn to state
        this.state.push(`${clickedSpace.classList[0].split('-')[1]}x`)

        // Display x on the clicked square
        clickedSpace.children[1].classList.remove('hidden')

        // Switch focused and unfocused player turns
        this.player1Score.classList.remove('unfocused')
        this.player2Score.classList.add('unfocused')

        // Increment turn count
        this.turnCount++
        if (this.turnCount >= 5) {
          this.checkForWin(this.playerTurn, this.state)
        }
        // Switch to next player
        this.playerTurn--
      }
    }

    checkForWin(playerTurn, state){
      if (playerTurn < 1) {
        // get all the o entries
        let player1Moves = []
        state.forEach(t => {if (t.indexOf('o') > -1) { player1Moves.push(t) }})
      } else {
        let player2Moves = []
        state.forEach(t => {if (t.indexOf('x') > -1) { player2Moves.push(t) }})
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const ticTacToe = new TicTacToeBoard(
        document.querySelector('.gameboard'),
        document.querySelector('.scoreboard'))

    ticTacToe.gameboard.addEventListener('click', (event) => {
      // If clicked gametile already has a mark on it, do nothing
      if (event.target.classList.length < 2) {
        return
      } else {
        ticTacToe.input(event.target)
      }
    })
  })
})()