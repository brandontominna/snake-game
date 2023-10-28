

let snakeSpeedSelect = document.getElementById('snakeSpeed')

for(let i = 0; i <= 10; i++) {
    const option = document.createElement('option')
    option.value = i
    option.text = `${i}`
    snakeSpeedSelect.appendChild(option)
}

let gameButton = document.getElementById('gameButton')

gameButton.addEventListener('click', () => {
    window.location.href = '../gamePage/game.html'
})