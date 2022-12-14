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

// shake animation constants -- 

const shake = [
  { transform: 'translate(0, 0) rotate(0deg)' },
  { transform: 'translate(3px, 3px) rotate(3deg)' },
  { transform: 'translate(0, 0) rotate(0eg)' },
  { transform: 'translate(-3px, 3px) rotate(-3deg)' },
  { transform: 'translate(0, 0) rotate(0deg) '}
]

const shakeTiming = {
  duration: 200,
  iterations: 1,
}


// bounce animation constants -- 
const bounce = [
  { transform: 'translateY(0)'},
  { transform: 'translateY(-5px)'}
]

const bounceWin = [
  { transform: 'translateY(0)'},
  { transform: 'translateY(-3px)'},
  { transform: 'translateY(0)'},
  { transform: 'translateY(-3px)'}
]


/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner, winningComboIdx


// confetti stuff -------

const colors1 = ['#FAA1AE', '#E29376']
const colors2 = ['#89BAF0', '#7BFAC1']

const duration = 5 * 1000;
const end = Date.now() + duration;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelector('.board')

const messageEl = document.querySelector('#message')

const messageDiv = document.querySelector('.message-div')

const resetButton = document.querySelector('.text-button')
const resetButton2 = document.querySelector('.pic-button')


// audio -----------

const winAudio = new Audio("./assets/win-sound2.wav")
const turnAudio = new Audio("./assets/spot-click2.wav")
const errAudio = new Audio("./assets/wrong.wav")
const tieAudio = new Audio("./assets/tie1.wav")
const resetAudio = new Audio("./assets/reset-noise.wav")

/*----------------------------- Event Listeners -----------------------------*/

squareEls.addEventListener('click', handleClick)
resetButton.addEventListener('click', resetBoard)
resetButton2.addEventListener('click', resetBoard)

/*-------------------------------- Functions --------------------------------*/
// if player 1 wins
function frame1() {
  confetti({
    particleCount: 103,
    angle: 60,
    spread: 225,
    origin: { x: 0 },
    colors: colors1,
    startVelocity: 60
  });
  confetti({
    particleCount: 103,
    angle: 120,
    spread: 225,
    origin: { x: 1 },
    colors: colors1,
    startVelocity: 60
  });
}

function callFrame1() {
  setTimeout(frame1, 0)
  setTimeout(frame1, 100)
  setTimeout(frame1, 200)
  setTimeout(frame1, 300)
  setTimeout(frame1, 400)
  setTimeout(frame1, 600)
}

//if player 2 wins
function frame2() {
  confetti({
    particleCount: 103,
    angle: 60,
    spread: 205,
    origin: { x: 0 },
    colors: colors2,
    startVelocity: 60
  });
  confetti({
    particleCount: 103,
    angle: 120,
    spread: 205,
    origin: { x: 1 },
    colors: colors2,
    startVelocity: 60
  });
}

function callFrame2() {
  setTimeout(frame2, 0)
  setTimeout(frame2, 100)
  setTimeout(frame2, 200)
  setTimeout(frame2, 300)
  setTimeout(frame2, 400)
  setTimeout(frame2, 600)
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
  resetAudio.play()
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
    messageDiv.animate(shake, shakeTiming)
    messageDiv.style.backgroundColor = '#faae2b'
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
      
    } 
    else {
      squares[i].style.backgroundColor = "#fff"
    }
  }
}

function winnerMsg() {
  if (winner === null) {
    if (turn === 1) {
      messageEl.textContent = `You're up, Player ${turn}!`
      messageDiv.animate(bounce, shakeTiming)
    } else if (turn === -1) {
      messageEl.textContent = `You're up, Player 2`
      messageDiv.animate(bounce, shakeTiming)
    }
  } else if (winner !== null && winner !== 'T') {
    if (winner === -1) {
      messageEl.textContent = 'Player 2 wins!'
      messageDiv.animate(bounceWin, shakeTiming)
      messageDiv.style.backgroundColor = "#8dd6fe"
      winAudio.play()
      callFrame2()
    } else {
      messageEl.textContent = `Player ${winner} wins!`
      messageDiv.animate(bounceWin, shakeTiming)
      messageDiv.style.backgroundColor = "#ffb5c0"
      winAudio.play()
      callFrame1()
    }
  } else if (winner === 'T') {
    messageEl.textContent = "It's a tie!"
    messageDiv.style.backgroundColor = '#faae2b'
    tieAudio.play()
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