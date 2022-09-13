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

let board, turn, winner

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelector('.board')

const messageEl = document.querySelector('#message')

console.log('board and message', squareEls, messageEl)
/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/

init()

function init() {
  board = [null, null, null, null, null, null, null, null, null]
  turn = 1
  winner = null
  render()
}


function render() {
  // if (board.includes(1) || board.includes(-1)) {
  //   resetButton.removeAttribute('hidden')
  // }

}