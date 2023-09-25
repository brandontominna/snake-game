const { deflateRaw } = require("zlib")

let lastRenderTime = 0
const SNAKE_SPEED = 2

function main(currentTime) {
    window.requestAnimationFrame(main)
    const secondsSineLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSineLastRender < 1 / SNAKE_SPEED) return
    
    lastRenderTime = currentTime
    console.log('render')

    update()
    draw()
}

window.requestAnimationFrame(main)


