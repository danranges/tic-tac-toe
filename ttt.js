
// winning move combos
// 012, 345, 678, 036, 147, 258, 048, 246

let gameBoard  = (function() {
    board = []
    let players
    let turn = 0
    
    const container = document.getElementById('game-board-container')
    const status = document.getElementById('status')
    const btnReset = document.getElementById('reset')

    btnReset.addEventListener('click', _reset)

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

    function _winCheck() {

    }
    
    function _reset() {
        board = []
        _destroy()
    }

    function _addMove(space, marker) {
        if (!board[space]) {
            board[space] = marker
            _destroy()
            _render()
            _winCheck()
        }
    }

    function playerMove(i) {
        if (turn === 0) {
            _addMove(i, 'X')
        } else {
            _addMove(i, 'O')
        }
    }
    
    


    return {
        addMove,
        players,
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

