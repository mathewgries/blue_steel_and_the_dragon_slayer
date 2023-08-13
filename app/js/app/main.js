// #region imports
import Game from "./game.js";
import UserInterface from "../classes/interface/UserInterface.js";
import GameContainer from "../classes/interface/GameContainer.js";
import Canvas from "../classes/interface/canvas.js";
import HudContainer from "../classes/interface/hudContainer/hudContainer.js";
import Player from "../classes/entities/player.js";
import Inventory from "../classes/inventory/inventory.js";
import { entityData } from "../../data/entityData.js";
// #endregion

// #region Userinterface classes
let viewWidth = window.innerWidth;
let viewHeight = window.innerHeight;
const gameContainer = new GameContainer({ viewWidth, viewHeight });
const canvas = new Canvas({ ...gameContainer.dimensions });

const hudContainer = new HudContainer({
    ...gameContainer.dimensions,
    diff: gameContainer.dimensions.width - canvas.dimensions.width
});
const userInterface = new UserInterface({
    gameContainer,
    canvas,
    hudContainer,
    viewWidth,
    viewHeight
});
// #endregion

// #region Initialize core class elements
const keys = {};
const inventory = new Inventory({canvas});
const player = new Player({
    ...entityData.player,
    xPosition: canvas.baseDimensions.width / 2,
    yPosition: canvas.baseDimensions.height / 2,
    canvas
});
const game = new Game({ 
    userInterface, 
    canvas, 
    player,
    inventory,
    keys 
});
// #endregion

// #region Run the game
const update = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (viewWidth !== vw || viewHeight !== vh) {
        let viewWidth = vw;
        let viewHeight = vh;
        game.resize({ viewWidth, viewHeight });
    }
    game.update();
    game.render();
    requestAnimationFrame(update);
}

function startGame() {
    update();
}

startGame();
// #endregion

// #region Event listeners
document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});
document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});
// #endregion