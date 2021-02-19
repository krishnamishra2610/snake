const squares = document.querySelectorAll('.grid div')
const startGame = document.querySelector('.start')
const controls = document.querySelector('.controls')
const result = document.querySelector('.score')
let currentSnake = [2, 1, 0]
let direction = 1
let appleId = 0
let width = 20
let interval = 650
let speed = 0.9
let score = 0
let int
let startFlag = true

startGame.addEventListener('click', start)

function start() {
    score = 0
    result.textContent = score
    squares[appleId].classList.remove('apple')
    clearInterval(int)
    appleId = Math.floor(Math.random() * 400)
    for (j = 0; j < 400; j++) {
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

    if (currentSnake[0] > 399 || currentSnake[0] < 0) {
        clearInterval(int)
        let inte = setTimeout(() => {
            alert('Game Over, click on Start/Restart to play again')
        }, 1000);

    } else {
        squares[currentSnake[0]].classList.remove('head')
        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake', 'head')
        currentSnake.unshift(currentSnake[0] + direction)
        if (currentSnake[0] > 399 || currentSnake[0] < 0) {

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
                }, 1000);

            }


            if (squares[currentSnake[0]].classList.contains('apple')) {
                currentSnake.push(tail)
                squares[currentSnake[0]].classList.remove('apple')
                appleId = Math.floor(Math.random() * 399)
                if (squares[appleId].classList.contains('snake', 'head', 'apple')) {
                    appleId = Math.floor(Math.random() * 399)
                }
                squares[appleId].classList.add('apple')
                score++
                result.textContent = score
                clearInterval(int)
                interval = interval * speed
                int = setInterval(move, interval);
            }

        }
    }

}



















































// function right() {


//     for (j = 1; j <= n; j++) {
//         squares[i + j].classList.add('snake')
//     }
//     squares[i].classList.remove('snake')
//     squares[i + n - 1].classList.remove('head')
//     i++
//     squares[i + n - 1].classList.add('head')
//     headId = i + n
//     if (headId === appleId) {
//         squares[appleId - 1].classList.remove('head', 'snake')
//         squares[appleId].classList.remove('apple')
//         n++
//         generateApple()
//     }

// }

// function generateApple() {
//     appleId = Math.floor(Math.random() * 400)

//     squares[appleId].classList.add('apple')
// }

// generateApple();

// controls.addEventListener('click', walk)

// function walk(e) {
//     if (e.target.id == "right") {
//         clearInterval(interval2)
//         interval1 = setInterval(right, 100);
//     } else if (e.target.id == "down") {
//         clearInterval(interval1)
//         interval2 = setInterval(down, 100);
//     }
// }

// function down() {
//     for (j = 0; j <= n; j++) {
//         squares[i + j * 20].classList.add('snake')
//     }
//     squares[headId].classList.remove('head')
//     squares[headId + 20].classList.add('head')


// }