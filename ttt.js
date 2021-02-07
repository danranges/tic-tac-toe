
let playerCount
let turn = 0



let gameSetup = (function() {
    const onePlayer = document.getElementById('btn-one-player')
    const twoPlayer = document.getElementById('btn-two-player')
    const playerOneName = document.getElementById('player-one-name')
    const playerTwoName = document.getElementById('player-two-name')
    const playerTwoContainer = document.getElementById('player-two-container')
    const btnSubmit = document.getElementById('btn-submit-names')
    const playerNamesContainer = document.getElementById('player-names-container')
    const playerCountContainer = document.getElementById('players-container')
    
    onePlayer.addEventListener('click', onePlayerGame)
    twoPlayer.addEventListener('click', twoPlayerGame)
    btnSubmit.addEventListener('click', submitNames)

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
        }
    }

    function submitNames() {
        // TODO
    }

})()

let gameBoard  = (function() {
    board = []
    let gameOver = false
    
    const container = document.getElementById('game-board-container')
    const status = document.getElementById('status')
    const btnReset = document.getElementById('new-game')

    btnReset.addEventListener('click', _newGame)

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
            if (tie) {
                status.textContent = 'It\'s a draw'
            } else {
                if (marker === 'X') {
                    status.textContent = 'Player One wins!'
                } else {
                    status.textContent = 'Player Two wins!'
                }
            }
        }
    }
    
    function _newGame() {
        board = []
        gameOver = false
        tie = false
        _destroy()
        _render()
    }

    function _addMove(space, marker) {
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
               setTimeout(() => {computer.simMove(board)}, 500)
            }
        } else {
            turn = 0
        }
    }

    return {
        playerMove,
        reset
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

