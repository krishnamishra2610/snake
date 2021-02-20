const squares = document.querySelectorAll('.grid div')
const startGame = document.querySelector('.start')
const controls = document.querySelector('.controls')
const result = document.querySelector('.score')
let currentSnake = [2, 1, 0]
let direction = 1
let appleId = 0
let width = 16
let interval = 500
let speed = 0.997
let score = 0
let int
let startFlag = true

startGame.addEventListener('click', start)

function start() {
    score = 0
     interval = 500
    result.textContent = score
    squares[appleId].classList.remove('apple')
    clearInterval(int)
    appleId = Math.floor(Math.random() * 255)
    for (j = 0; j < 255; j++) {
        squares[j].classList.remove('head', 'snake', 'apple')
    }
    currentSnake = [2, 1, 0]
    squares[currentSnake[0]].classList.add('head')
    direction = 1
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    squares[appleId].classList.add('apple')
    int = setInterval(move, interval);
}
controls.addEventListener('click', control)

function control(e) {
    if (e.target.id === 'right' && direction != -1) {
        direction = 1
    } else if (e.target.id === 'left' && direction != 1) {
        direction = -1
    } else if (e.target.id === 'down' && direction != -width) {
        direction = width
    } else if (e.target.id === 'up' && direction != width) {
        direction = -width
    }
}

function move() {

    if (currentSnake[0] > 255 || currentSnake[0] < 0) {
        clearInterval(int)
        let inte = setTimeout(() => {
            alert('Game Over, click on Start/Restart to play again')
        }, 300);

    } else {
        squares[currentSnake[0]].classList.remove('head')
        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake', 'head')
        currentSnake.unshift(currentSnake[0] + direction)
        if (currentSnake[0] > 255 || currentSnake[0] < 0) {

        } else {
            currentSnake.forEach(index => squares[index].classList.add('snake'))
            squares[currentSnake[0]].classList.add('head')



            if (
                (direction == 1 && (currentSnake[0]) % width == 0) ||
                (direction == -1 && (currentSnake[0] + 1) % (width) == 0) ||
                (squares[currentSnake[0] + direction].classList.contains('snake'))
            ) {
                clearInterval(int)
                let inte = setTimeout(() => {
                    alert('Game Over, click on Start/Restart to play again')
                }, 300);

            }


            if (squares[currentSnake[0]].classList.contains('apple')) {
                currentSnake.push(tail)
                squares[currentSnake[0]].classList.remove('apple')
                appleId = Math.floor(Math.random() * 255)
                if (squares[appleId].classList.contains('snake', 'head', 'apple')) {
                    appleId = Math.floor(Math.random() * 255)
                }
                squares[appleId].classList.add('apple')
                score++
                result.textContent = score
                clearInterval(int)
                interval =500
                int = setInterval(move, interval);
            }

        }
    }

}
