import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { checkAABBCollision } from "./collisionDetection.js";

{/**************************************************************************************************
    
                SET UP THE CANVAS AND GAME SPEED 

***************************************************************************************************/}

// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 3
const tile_ratio = 16;
const tileSize = tile_ratio * scale
const width = 256;
const height = 240;
canvas.width = width * scale;
canvas.height = height * scale;

// Set your desired frame rate (e.g., 30 FPS)
const targetFPS = 60;

// Initialize lastTimestamp with the current timestamp
let lastTimestamp = performance.now();
let deltaTime = 0;

{/**************************************************************************************************
    
                        SET UP THE PLAYER

***************************************************************************************************/}

const player = new Player(canvas.width / 2, canvas.height / 2, tileSize, tileSize, 100, 60, 6, tileSize)

{/**************************************************************************************************
    
                        SET UP THE ENEMIES

***************************************************************************************************/}

// Create an array to store enemies
const enemies = [];

// Function to create a new enemy and add it to the enemies array
function createEnemy(x, y, width, height, speedX, speedY, baseSpeed, attackDamage) {
    const enemy = new Enemy(x, y, width, height, speedX, speedY, baseSpeed, attackDamage);
    enemies.push(enemy);
}

// Create some enemies for testing
createEnemy(450, 50, tileSize, tileSize, 50, 0, 50, 1, 1);
createEnemy(655, 55, tileSize, tileSize, 0, 50, 50, 1, 1);
createEnemy(460, 460, tileSize, tileSize, 50, 0, 50, 1, 1);
createEnemy(365, 365, tileSize, tileSize, 0, 50, 50, 1, 1);
createEnemy(270, 270, tileSize, tileSize, 50, 0, 50, 1, 1);
createEnemy(175, 175, tileSize, tileSize, 0, 50, 50, 1, 1);

// const gridSize = 16; // Number of squares in the grid along one axis
// const tileSpacing = 16; // Spacing between each square

// for (let row = 0; row < gridSize; row++) {
//     for (let col = 0; col < gridSize; col++) {
//         const x = col * (tileSize + tileSpacing);
//         const y = row * (tileSize + tileSpacing);
//         const enemy = new Enemy(x, y, tileSize, tileSize, 0, 0, 0, 1, 1);
//         enemies.push(enemy);
//     }
// }


{/************************************************************************************************** 
    
                        RUNNING THE GAME

***************************************************************************************************/}

function update(timestamp) {
    // Calculate the elapsed time since the last frame
    deltaTime = (timestamp - lastTimestamp) / 450; // Convert to seconds
    lastTimestamp = timestamp;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height, tileSize)

    // Update player and get new position
    player.updatePlayer(keys, ctx, canvas, deltaTime);
    const playerBoundingBox = player.getBoundingBox();

    // updateEnemies();
    for (const enemy of enemies) {
        enemy.updatePosition(deltaTime, ctx, canvas);
        const enemyBoundingBox = enemy.getBoundingBox();

        if (checkAABBCollision(playerBoundingBox, enemyBoundingBox)) {
            // Handle collision here (e.g., reduce player health, remove enemy, etc.)
            player.handleCollisionWithEnemy(enemy);

            // For example, removing the enemy from the game:
            // const index = enemies.indexOf(enemy);
            // enemies.splice(index, 1);
        }

        if (player.getIsAttacking()) {
            player.attackEnemy(enemy, ctx);
            console.log(`E/H: ${enemy.health}`)
            if (enemy.health <= 0) {
                const index = enemies.indexOf(enemy);
                enemies.splice(index, 1);
            }
        }
    }



    // Request the next animation frame with a controlled frame rate
    setTimeout(() => {
        requestAnimationFrame(update);
    }, 1000 / targetFPS);
}

// Start the game loop
requestAnimationFrame(update);
{/************************************************************************************************** 
    
                        KEY BINDINGS

***************************************************************************************************/}

// Keyboard input handling
const keys = {};
document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});
document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});


{/************************************************************************************************** 
    
                        TILE GRID FOR REFERENCE

***************************************************************************************************/}

function drawGrid(ctx, canvasWidth, canvasHeight, cellSize) {
    ctx.strokeStyle = 'lightgray'; // Set the color of the grid lines
    ctx.lineWidth = 1; // Set the line width to 1 for sharp grid lines

    // Draw vertical grid lines
    for (let x = 0; x <= canvasWidth; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
    }

    // Draw horizontal grid lines
    for (let y = 0; y <= canvasHeight; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
    }
}