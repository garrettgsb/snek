let colors = generateColors([255, 120, 80]);

function generateColors(start) {
    [r, g, b] = start;
    let newColors = [];
    while (r > 30 && g > 30 && b > 30) {
        newColors.unshift(`rgb(${r},${g},${b})`)
        newColors.push(`rgb(${r},${g},${b})`);
        r -= 9,
        g -= 5,
        b -= 2
    }
    return newColors;
}

function renderFrame() {
    clearBoard();
    drawSnek(snek, board);
    drawApple(apple, board);
    drawScore(scoreDisplay, snek);
    drawPath(snek.path);
    return true;
};

function clearBoard() {
    ctx.fillStyle = "#000022";
    ctx.fillRect(0,0, canvas.width, canvas.height);   
};

function drawSnek(snek, board) {
    snek.body.forEach((segment, index) => {
        const color = colors[index % (colors.length - 1)]
        drawThing(segment.x, segment.y, color, board);
    });
    colors.unshift(colors.pop());
    if (snek.robotMode) { 
        ctx.font = '24px serif';
        ctx.fillText('🤖', snek.head.x * board.cellSize, snek.head.y * board.cellSize)
    }
};

function drawApple(apple, board) {
    drawThing(apple.x, apple.y, apple.color, board);

};

function drawPath(path) {
    if (!path) { return }
    path.forEach(step => {
        drawThing(step[0], step[1], "#0F0", board);
    })
}

function drawThing(x, y, color, board) {
    const sX = board.cellSize * x;
    const sY = board.cellSize * y;
    ctx.fillStyle = color;
    ctx.fillRect(sX, sY, board.cellSize, board.cellSize);
}

function drawScore(element, snek) {
    element.innerHTML = snek.body.length;
    if (snek.justAte) {
        element.classList.add('change');
        setTimeout(() => {
            element.classList.remove('change');
        }, 500);
    }
}