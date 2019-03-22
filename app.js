const canvas = document.getElementById('snek');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

ctx.fillStyle = "#000022";
ctx.fillRect(0,0, canvas.width, canvas.height);

let go = true;
let snek, score, apple, board, pause;

score = 0;
apple = {x: 0, y: 0, color: "#22BB00"};
board = new Board({
    width: canvas.width,
    height: canvas.height,
    cellSize: 10
});
snek = new Snek(board.midpoint.x, board.midpoint.y);

let reset = true;

function goSnekGo() {
    console.log("Go snek u can do it! 🐍")
    const gameLoop = () => {
		processPendingInput();
        reset = doPhysics(reset);
        const interval = snek.robotMode ? 10 : 50;
        setTimeout(gameLoop, interval);
    }
    setupEventListeners();
	setTimeout(gameLoop, 10);
    
    setInterval(() => {
        renderFrame();
    }, 10)
};

goSnekGo();