function doPhysics(reset) {
    if (reset) {
        saveScore(snek.body.length);
        updateStats();
        snek = new Snek(board.midpoint.x, board.midpoint.y);
        newApple(apple, board)
        return false;
    };

    if (!pause) { snek.move() };
    if (snek.apple(apple)) { newApple(apple, board) };
    score = snek.body.length;
    reset = snekMeetsWall(snek, board) || snek.crashIntoSelf()
    return reset;
};

function newApple(apple, board) {
    const x = Math.floor(Math.random() * board.grid.x);
    const y = Math.floor(Math.random() * board.grid.y);
    apple.x = x;
    apple.y = y;
    if (snek.coordsInBody(apple.x, apple.y)) { newApple(apple, board) }
};

function snekMeetsWall(snek, board) {
    const x = snek.head.x
    const y = snek.head.y
    crash = x < 0 || y < 0 || x > board.grid.x || y > board.grid.y
    return crash
};

function saveScore(score) {
    if (score < 2) { return };
    let scores = JSON.parse(localStorage.getItem('scores'));
    if (!scores) {
        scores = [score]
    } else {
        scores.push(score);
    }
    localStorage.setItem('scores', JSON.stringify(scores));
}

function updateStats() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [0]
    const averageScore = scores && scores.reduce((a, b) => a + b) / scores.length || 0;
    document.getElementById('average').innerHTML = Math.floor(averageScore);
    document.getElementById('best').innerHTML = Math.max(...scores) || 0;
}
