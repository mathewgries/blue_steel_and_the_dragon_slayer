import { Player } from "../classes/entities/testPlayer.js";
import { Zombie, Skeleton } from "../classes/entities/enemy.js";
import { entityData } from "../../data/entityData.js";
import { checkAABBCollision } from "../physics/collisionDetection.js";
{/**************************************************************************************************
    
                SET UP THE CANVAS AND GAME SPEED 

***************************************************************************************************/}
// Get the canvas element
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scale = 3
const tile_ratio = 16;
const tileSize = tile_ratio * scale
const width = 256;
const height = 240;
canvas.width = width * scale;
canvas.height = height * scale;
// Get the Weapon Selector Element
const weaponSelector = document.getElementById('weapon-selector')
// Set your desired frame rate (e.g., 30 FPS)
const targetFPS = 60;
// Initialize lastTimestamp with the current timestamp
let lastTimestamp = performance.now();
let deltaTime = 0;
{/**************************************************************************************************
    
                        SET UP THE PLAYER

***************************************************************************************************/}
const player = new Player({ ...entityData.player, xPosition: canvas.width / 2, yPosition: canvas.height / 2, ctx })
const inventory = player.inventory;
{/**************************************************************************************************
    
                        SET UP THE ENEMIES

***************************************************************************************************/}
// Create an array to store enemies
const enemies = [];
// Function to create a new enemy and add it to the enemies array
function createZombie() {
    const enemy = new Zombie({ ...entityData.zombie, ctx })
    enemies.push(enemy);
}
function createSkeleton(x, y, speedX, speedY) {
    const enemy = new Skeleton({ x, y, speedX, speedY })
    enemies.push(enemy);
}
createZombie();
// createZombie(450, 550, 50, 0, 50);
// createSkeleton(250, 250, 50, 0, 50);
// createSkeleton(150, 150, 50, 0, 50);
// createSkeleton(550, 150, 50, 0, 50);
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
    player.update(keys, deltaTime, canvas);
    inventory.update(keys, deltaTime)

    for (const enemy of enemies) {
        enemy.update(deltaTime, ctx, canvas);
        if (checkAABBCollision(player.bounds, enemy.bounds)) {
            player.takeDamage(enemy);
        }
        // if (player.getIsAttacking()) {
        //     player.attackEnemy(enemy);
        //     if (enemy.getHealth() <= 0) {
        //         const index = enemies.indexOf(enemy);
        //         enemies.splice(index, 1);
        //     }
        // }
    }

    // Request the next animation frame with a controlled frame rate
    setTimeout(() => {
        requestAnimationFrame(update);
    }, 1000 / targetFPS);
}

// Start the game loop
// requestAnimationFrame(update);
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