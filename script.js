const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const winning = [
    [0, 1 ,2], [3, 4 ,5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell')
const board = document.getElementById('board')
const text = document.getElementById('message')
const btn = document.getElementById('restart')
const winningText = document.querySelector('[data-message-text]')

let circleTurn

startGame()

btn.addEventListener('click', startGame)

function startGame(){
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true})
    })
    setBoardHover()
    text.classList.remove('show')
}

function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        gameOver(false)
    }
    else if(equal()){
        gameOver(true)
    }
    else{
    swapTurns()
    setBoardHover()
    }
}

function gameOver(draw){
    if(draw){
        winningText.innerText = 'Draw!'
    }
    else{
        winningText.innerHTML = `${circleTurn ? "O" : "X"} Wins!`
    } 
    text.classList.add('show')
}

function equal(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHover(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)

    }
    else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
   return winning.some(combo => {
        return combo.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
   })
}