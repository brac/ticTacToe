# Tic Tac Toe Exercise

Build Tic Tac Toe in the browser. [Something like this](https://playtictactoe.org/)

## Skills

- Can write JavaScript for the browser
- Can query the DOM for nodes
- Can bind to user events like `click`
- Can use CSS & HTML to create a Tic Tac Toe board

## Specs

- two people can play Tic Tac Toe in the same browser window
- all rules of Tic Tac Toe are respected

## Stretch

- Computer Player

### Understand
Create a 2 player Tic-Tac-Toe game.
The players share a mouse, clicking on the game board until a winner or a tie is decided.
They can click again to reset the board while the app keeps track of the score.

### Plan
Display a game board
  Player Names
  Player scores
  Tie and Tie Score

Listening for clicks on the game board
  Depending on who's turn it was, display O or X

After turn 5, start checking game board or win state
  Check rows 1, 2 and 3
  Check columns 1, 2 and 3
  Check diagonals 1 and 2

On Win
  Flash winning row/column/diagonal
  Increment score count

On Tie
  Flash board grid
  Increment tie count

Any click on a solved game board will reset and the other player starts.

### Divide
HTML
  Game Board
    Xs and Os
  Score Count
    Player Name
    Player Score
    Tie name and Tie Score

CSS
  Normalize.js
  Black BG
  White Text
  Grid Layout
    3x3 game board
    Single row Scores

Javascript
  TicTacToe Constructor((element){
    this.turnCount = 0
    this.element = element

    checkForWin(){
      if (rows/columns/diagonals match) win
    } else {
      lose
    }

    win(row){
      flash row
      score++
      this.reset()
    }

    lose(){
      flash grid
      tie++
      this.reset()
    }

    flash(){
      if(params) { flash params }
      else { flash grid }
    }

    reset(){
      reset board to 0
        Hide elements
      turnCount = 0
    }
  })

  new gameBoard = querySelector gameBoard

  gameBoard.element.addEventListener(click {
    if (gameOver) {
     gameboard.reset()
    }

    determine who's turn it is
    display X or O

    if gameBoard.turnCount > 5 {
      gameboard.checkForWin()
    }
  })


  gameboard.turnCount++







