const canvas = document.getElementById('tetris');
const context =canvas.getContext('2d');

context.scale(20, 20);

const matrix = [
   [0, 0, 0],
   [1, 1, 1],
   [0, 1, 0],    
];

function createMatrix(w, h) {
	const matrix = [];
	while (h--) {
		matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function draw() {
	context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
 	  row.forEach((value, x) => {
		if (value !== 0) {
			context.fillStyle = 'red';
			context.fillRect(x + offset.x,
				             y + offset.y, 
				             1, 1);
		}

	  });
    });
}
function playerDrop() {
	player.pos.y++;
    dropCouncter = 0;
}

let dropCouncter = 0;
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0) {
	const deltaTime = time - lastTime;
	lastTime = time;
	
	dropCouncter += deltaTime;
	if (dropCouncter > dropInterval) {
		playerDrop();
	}

	draw();
	requestAnimationFrame(update);
}

const arena  = createMatrix(12, 20);
console.log(arena); console.table(arena);

const player = {
	pos: {x: 5, y: 5},
	matrix: matrix,
}

document.addEventListener('keydown', event => {
	if (event.keyCode === 37) {
		player.pos.x--; 
	} else if (event.keyCode === 39) {
			player.pos.x++;
	} else if (event.keyCode === 40) {
		playerDrop();
	}
});

update();