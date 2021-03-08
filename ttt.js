let playerCount = 0
let turn = 0

let gameSetup = (function() {
    const onePlayer = document.getElementById('btn-one-player')
    const twoPlayer = document.getElementById('btn-two-player')
    const form = document.getElementById('player-names-form')
    const playerOneName = form.elements[0]
    const playerTwoName = form.elements[1]
    const playerTwoContainer = document.getElementById('player-two-container')
    const btnSubmit = document.getElementById('btn-submit-names')
    const btnBack = document.getElementById('btn-back')
    const playerNamesContainer = document.getElementById('player-names-container')
    const playerCountContainer = document.getElementById('players-container')
    const btnReset = document.getElementById('reset')
    const restartContainer = document.getElementById('start-over')
    let playerNames = []
    
    onePlayer.addEventListener('click', onePlayerGame)
    twoPlayer.addEventListener('click', twoPlayerGame)
    btnSubmit.addEventListener('click', submitNames)
    btnBack.addEventListener('click', _reset)
    btnReset.addEventListener('click', _reset)

    function onePlayerGame() {
        playerCount = 1
        chooseNames()
    }
    function twoPlayerGame() {
        playerCount = 2
        chooseNames()
    }
    
    function chooseNames() {
        playerCountContainer.style.visibility = 'hidden'
        playerNamesContainer.style.visibility = 'visible'
        
        if (playerCount === 1) {
            playerTwoContainer.style.visibility = 'hidden'
        } else {
            playerTwoContainer.style.visibility = 'visible'

        }
        
        playerOneName.focus()
    }
    
    function submitNames() {
        if ((playerCount === 1 && playerOneName.value) ||
        (playerCount === 2 && playerOneName.value && playerTwoName.value)) {
            playerNames.push(playerOneName.value)
            playerNames.push(playerTwoName.value)
            playerNamesContainer.style.visibility = 'hidden'
            playerTwoContainer.style.visibility = 'hidden'
            gameBoard.status.innerHTML = `${gameSetup.playerNames[0]}'s turn`
            gameBoard.container.style.visibility = 'visible'
            restartContainer.style.visibility = 'visible'
            
        }
    }

    function finalResult(result) {
        switch (result) {
            case 0:
                gameBoard.status.textContent = 'It\'s a draw'
                break
            case 1:
                gameBoard.status.textContent = `${playerNames[0]} wins!`
                break
            case 2:
                gameBoard.status.textContent = `${playerNames[1]} wins!`
                break
            case 3:
                gameBoard.status.textContent = `The computer wins!`
                break
        }
    }

    function _reset() {
        gameBoard.newGame()
        playerCountContainer.style.visibility = 'visible'
        playerNamesContainer.style.visibility = 'hidden'
        playerTwoContainer.style.visibility = 'hidden'
        playerNames = []
        playerOneName.value = ''
        playerTwoName.value = ''
        playerCount = ''
        gameBoard.status.innerHTML = ''
        gameBoard.container.style.visibility = 'hidden'
        restartContainer.style.visibility = 'hidden'

    }

    return {
        finalResult,
        playerNames,
        playerCount
    }

})()

let gameBoard  = (function() {
    let board = []
    let gameOver = false
    
    const container = document.getElementById('game-board-container')
    const status = document.getElementById('status')
    const btnNewGame = document.getElementById('new-game')

    btnNewGame.addEventListener('click', newGame)

    _render()

    function _render() {
        for (let i = 0; i < 9; i++) {
            let space = document.createElement('button')
            space.classList.add('space')
            space.textContent = board[i]
            space.addEventListener('click', () => {playerMove(i)})
            container.appendChild(space)
            status.textContent = ''
        }
    }

    function _destroy() {
        container.innerHTML = ''
    }

    function _winCheck(marker) {
        let tie = false
        // winning move combos
        // 012, 345, 678, 036, 147, 258, 048, 246
        if ((marker === board[0] && marker === board[1] && marker === board[2]) || 
            (marker === board[3] && marker === board[4] && marker === board[5]) ||
            (marker === board[6] && marker === board[7] && marker === board[8]) ||
            (marker === board[0] && marker === board[3] && marker === board[6]) ||
            (marker === board[1] && marker === board[4] && marker === board[7]) ||
            (marker === board[2] && marker === board[5] && marker === board[8]) ||
            (marker === board[0] && marker === board[4] && marker === board[8]) ||
            (marker === board[2] && marker === board[4] && marker === board[6])) {
                gameOver = true
            } else if (board[0] && board[1] && board[2] && board[3] && board[4] && 
                       board[5] && board[6] && board[7] && board[8]) {
                gameOver = true
                tie = true
            }

        if (gameOver) {
            console.log(marker)
            if (tie) {
                gameSetup.finalResult(0)
            } else {
                if (marker === 'X') {
                    gameSetup.finalResult(1)
                } else if (marker === 'O' && playerCount === 2 ) {
                    gameSetup.finalResult(2)
                } else {
                    gameSetup.finalResult(3)
                    
                }
            }
        } else {
            _turnStatus()
        }
    }

    function _turnStatus() {
        if (turn === 0) {
            status.innerHTML = `${gameSetup.playerNames[1]}'s turn`
        } else {
            status.innerHTML = `${gameSetup.playerNames[0]}'s turn`

        }
    }
    
    function newGame() {
        board = []
        turn = 0
        gameOver = false
        tie = false
        _destroy()
        _render()
        status.innerHTML = `${gameSetup.playerNames[0]}'s turn`
    }

    function _addMove(space, marker) {
        console.log(playerCount)
        if (!board[space]) {
            board[space] = marker
            _destroy()
            _render()
            _winCheck(marker)
        }
    }

    function playerMove(i) {

        if (turn === 0) {
            _addMove(i, 'X')
        } else {
            _addMove(i, 'O')
        }
        
        if (!turn && !gameOver) {
            turn = 1
            if (playerCount === 1) {
                status.innerHTML = 'Thinking...'
                setTimeout(() => {computer.simMove(board)}, 500)
            }
        } else {
            turn = 0
        }
    }

    return {
        playerMove,
        status,
        newGame,
        container
    }
})()

let computer = (function() {

    function simMove(board) {
        let legal = false
        while (!legal) {
            let i = Math.floor(Math.random() * Math.floor(9))
            if (!board[i]) {
                gameBoard.playerMove(i)
                legal = true
            }
        } 
    }

    return {
        simMove
    }

})()

function player(name, marker){
    this.name = name
    this.marker = marker
}

