// jshint asi:true
// TODO:
//     Flash winning row
//     Flash tied grid


(function () {

  class TicTacToeBoard{
    constructor(gameboard, scoreboard) {
      this.turnCount = 0
      this.gameboard = gameboard
      this.scoreboard = scoreboard
      this.playerTurn = 0
      this.tieEl = scoreboard.querySelector('.scoreboard-tie')
      this.tieScoreEl = this.tieEl.children[1]
      this.tieScore = 0
      this.player1El = scoreboard.querySelector('.scoreboard-player1')
      this.player2El = scoreboard.querySelector('.scoreboard-player2')
      this.player1ScoreEl = this.player1El.children[1]
      this.player2ScoreEl = this.player2El.children[1]
      this.player1Score = 0
      this.player2Score = 0
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
        this.player1El.classList.add('unfocused')
        this.player2El.classList.remove('unfocused')

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
        this.player1El.classList.remove('unfocused')
        this.player2El.classList.add('unfocused')

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
      const playerSymbol = (playerTurn < 1) ? 'o' : 'x'

      let moves = []

      // Gather all the moves that player one has made and put those in moves
      state.forEach(t => {
        if (t.indexOf(playerSymbol) > -1) {
          moves.push(t.split(playerSymbol)[0])
        }
      })
      moves.sort()

      // Loop over the win conditions
      this.winConditions.some(winState => {
        // Check each move against the current winState array
        for (let i = 0; i < moves.length; i++) {
          // Move a successful match to the matched array
          if (winState.indexOf(moves[i]) > -1) {
            matched.push(moves[i])
          }
        }

        // If matched array is 3, we have a full match.
        //     Update the player scores and
        //     Return true to break the .some() loop
        if (matched.length == 3) {
          if (playerTurn < 1) {
            this.player1Score++
            this.player1ScoreEl.textContent = this.player1Score
          } else {
            this.player2Score++
            this.player2ScoreEl.textContent = this.player2Score
          }

          // Trigger the reset by setting the turnCount to max turns
          this.turnCount = 9
          return true

        // If we have less than 3, it was an incomplete match so reset the
        //     matched array and continue looking
        } else {
          matched = []
          if (this.turnCount >= 9 ) {
            this.tieScore++
            this.tieScoreEl.textContent = this.tieScore
            return true
          }
        }
      })
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
      // If the turn count is 9 or above, reset the gameboard
      if (ticTacToe.turnCount >= 9) {
        ticTacToe.reset()
        return
      }

      // If clicked gametile already has a mark on it, do nothing
      if (event.target.classList.length < 2) {
        return

      } else {
        ticTacToe.input(event.target)
      }
    })
  })
})()