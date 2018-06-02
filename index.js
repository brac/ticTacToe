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
      this.winConditions = [
      ['a1', 'a2', 'a3'],
      ['b1', 'b2', 'b3'],
      ['c1', 'c2', 'c3'],
      ['a1', 'b1', 'c1'],
      ['a2', 'b2', 'c2'],
      ['a3', 'b3', 'c3'],
      ['a1', 'b2', 'c3'],
      ['a3', 'b2', 'c1']]
    }

    input(value){
      const clickedSpace =  this.gameboard.querySelector(`.${value.classList[0]}`)

      if (this.playerTurn < 1) {
        // Add player 1 turn to state
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
        // Add player 2 turn to state
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

    // TODO: Hook this in to the flashing and score updating
    checkForWin(playerTurn, state){
      let matched = []

      // Player one check for win
      if (playerTurn < 1) {
        let moves = []

        // Gather all the moves that player one has made and put those in moves
        state.forEach(t => {
          if (t.indexOf('o') > -1) {
            moves.push(t.split('o')[0])
          }
        })
        moves.sort()

        // TODO: Ensure wins for all diagonals, currently not registering
        this.winConditions.some(winState => {
          if (matched.length == 3) {
            console.log(matched)
            return true
          } else {
            matched = []
          }
          for (let i = 0; i < moves.length; i++) {
            if (winState.indexOf(moves[i]) > -1) {
              matched.push(moves[i])
            }
          }
        })

      } else {
        // Player two check for win
        console.log('I will check for player 2 win')
      }
    }

    reset(){
      const squares = document.querySelectorAll('.gameboard-button')
      for (let i = 0; i < 9; i++) {
        let xOrY = squares[i].children
        xOrY[0].classList.add('hidden')
        xOrY[1].classList.add('hidden')
      }
      this.state = []
      this.turnCount = 0
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const ticTacToe = new TicTacToeBoard(
        document.querySelector('.gameboard'),
        document.querySelector('.scoreboard'))

    ticTacToe.gameboard.addEventListener('click', (event) => {
      // If clicked gametile already has a mark on it, do nothing
      if (event.target.classList.length < 2) {
        if (ticTacToe.turnCount === 9) {
          ticTacToe.reset()
        }
        return
      } else {
        ticTacToe.input(event.target)
      }
    })
  })
})()