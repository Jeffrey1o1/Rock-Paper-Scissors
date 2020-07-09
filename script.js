const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
var x = 0
const SELECTION = [
    {
        name: 'rock',
        emoji: '👊🏾',
        beats: 'scissors'
    }
    ,
    {
        name: 'paper',
        emoji: '✋🏾',
        beats: 'rock'
    }
    ,
    {
        name: 'scissors',
        emoji: '✌🏾',
        beats: 'paper'
    }
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection =SELECTION.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})

function makeSelection(selection) {
    const computerSelection = randomSelection()
    const youWin = isWinner(selection, computerSelection)
    const youLose = isWinner(computerSelection, selection)
    
    addSelectionResult(computerSelection, youLose)
    addSelectionResult(selection, youWin)

    if(youWin) incrementScore(yourScoreSpan)
    if(youLose) incrementScore(computerScoreSpan)
}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}
function addSelectionResult(selection, winner) {
    if(x==10) x=2
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if(winner) div.classList.add('winner')
    if(x==0) {
        x=x+1
        finalColumn.after(div)
    }
    else if(x==1) {
        x=x+1
        finalColumn.after(div)
    }
    else if(x%2==0){
        x=x+1
        finalColumn.nextSibling.nextSibling.replaceWith(div)
    }
    else if(x%2==1){
        x=x+1
        finalColumn.nextSibling.replaceWith(div)
    }

}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTION.length)
    return SELECTION[randomIndex]
}