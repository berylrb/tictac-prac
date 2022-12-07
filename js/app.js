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


// confetti stuff -------

const colors1 = ['#FAA1AE', '#E29376']
const colors2 = ['#8ED6FE', '#7BFAC1']

const duration = 5 * 1000;
const end = Date.now() + duration;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelector('.board')

const messageEl = document.querySelector('#message')

const messageDiv = document.querySelector('.message-div')

const resetButton = document.querySelector('button')


// audio -----------

const winAudio = new Audio("./assets/win-sound2.wav")
const turnAudio = new Audio("./assets/spot-click2.wav")
const errAudio = new Audio("./assets/wrong.wav")

/*----------------------------- Event Listeners -----------------------------*/

squareEls.addEventListener('click', handleClick)
resetButton.addEventListener('click', resetBoard)


/*-------------------------------- Functions --------------------------------*/
// if player 1 wins
function frame1() {
  confetti({
    particleCount: 3,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors1,
  });
  confetti({
    particleCount: 3,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors1,
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame1);
  }
}

//if player 2 wins
function frame2() {
  confetti({
    particleCount: 3,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors2,
  });
  confetti({
    particleCount: 3,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors2,
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame2);
  }
}

// from https://codepen.io/kimdontdoit/pen/wvdKLJo & https://www.skypack.dev/view/canvas-confetti 

init()

function init() {
  board = [null, null, null, null, null, null, null, null, null]
  turn = 1
  winner = null
  resetButton.style.visibility = 'hidden'
  messageDiv.classList.add("message-div-styling")
  render()
}

function resetBoard(evt) {
  let tempImgs = document.querySelectorAll('#temp')

  tempImgs.forEach(img => {
    img.remove()
  })
  messageDiv.classList.add("message-div-styling")
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
    messageEl.textContent = 'Select an empty space'
    errAudio.play()
    return
  }

  if (winner !== null) {
    return
  }

  board[squareIndex] = turn
  turn = turn * -1

  getWinner()
  render(squareIndex)
}

function boardChange(idx) {
  let squares = squareEls.children
  if (turn === 1 && winner === null) {
    messageDiv.style.backgroundColor = "#ffb5c0"
  } else if (turn === -1 && winner === null){
    messageDiv.style.backgroundColor = "#8dd6fe"
  }
  for (let i = 0; i < squares.length; i++) {
    if (board[i] === 1) {
      squares[i].style.backgroundColor = "#ffb5c0"
      squares[i].innerHTML = '<img id="temp" src="./assets/cupcake.png">'
      turnAudio.play()
      
    } else if (board[i] === -1) {
      squares[i].style.backgroundColor = "#8dd6fe"
      squares[i].innerHTML = '<img id="temp" src="./assets/ice-cream.png">'
      turnAudio.play()
      
    } else {
      squares[i].style.backgroundColor = "#fff"
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
      messageDiv.style.backgroundColor = "#8dd6fe"
      winAudio.play()
      frame2()
    } else {
      messageEl.textContent = `Player ${winner} wins!`
      messageDiv.style.backgroundColor = "#ffb5c0"
      winAudio.play()
      frame1()
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