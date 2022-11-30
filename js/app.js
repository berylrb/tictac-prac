/*--------------------------------
1) Define the required variables used to track the state of the game

2) Store cached element references

3) Upon loading, the game state should be initialized, and a function should be 
called to render this game state

4) The state of the game should be rendered to the user

5) Define the required constants

6) Handle a player clicking a square with a `handleClick` function

7) Build the `getWinner` function

8) Create Reset functionality
--------------------------------*/


/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [2, 5, 8]
]

/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner, winningComboIdx

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelector('.board')

const messageEl = document.querySelector('#message')

const resetButton = document.querySelector('button')

console.log('board and message', squareEls, messageEl)
/*----------------------------- Event Listeners -----------------------------*/

squareEls.addEventListener('click', handleClick)
resetButton.addEventListener('click', resetBoard)


/*-------------------------------- Functions --------------------------------*/

init()

function init() {
  board = [null, null, null, null, null, null, null, null, null]
  turn = 1
  winner = null
  resetButton.style.visibility = 'hidden'
  render()
}

function resetBoard(evt) {
  init()
}


function render(idx) {
  if (board.includes(1) || board.includes(-1)) {
    resetButton.style.visibility = 'visible'
  }
  boardChange(idx)
  winnerMsg()
}

function handleClick(evt) {
  let squareIndex = Number((evt.target.id).charAt(2))
  console.log(squareIndex, board)

  if (board[squareIndex] !== null) {
    messageEl.textContent = 'Please select an empty space'
    return
  }

  board[squareIndex] = turn
  turn = turn * -1

  getWinner()
  render(squareIndex)
}

function boardChange(idx) {
  let squares = squareEls.children

  for (let i = 0; i < squares.length; i++) {
    if (board[i] === 1) {
      squares[i].style.backgroundColor = "#ffb5a4"
    } else if (board[i] === -1) {
      squares[i].style.backgroundColor = "#ffd5a4"
    } else {
      squares[i].style.backgroundColor = "#fcf2e9"
    }
  }
}

function winnerMsg() {
  if (winner === null) {
    if (turn === 1) {
      messageEl.textContent = `You're up, Player ${turn}!`
    } else if (turn === -1) {
      messageEl.textContent = `You're up, Player 2`
    }
  } else if (winner !== null && winner !== 'T') {
    if (winner === -1) {
      messageEl.textContent = 'Player 2 wins!'
    } else {
      messageEl.textContent = `Player ${winner} wins!`
    }
  } else if (winner === 'T') {
    messageEl.textContent = "It's a tie!"
  }
}

function getWinner() {
  winningCombos.forEach((combo) => {
    let sum = []
    for (let i = 0; i < combo.length; i++) {
      sum.push(board[combo[i]])
    }
    let reduceSum = Math.abs(sum.reduce((a, b) => a + b, 0))
    if (reduceSum === 3) {
      winner = sum[0]
      winningComboIdx = winningCombos.indexOf(combo)
    }
  })
  if (winner === null && board.includes(null) === false) {
    winner = 'T'
  }
}