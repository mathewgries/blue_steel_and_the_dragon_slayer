// #region imports
import Game from "./game.js"
import UserInterface from "../classes/interface/UserInterface.js";
import GameContainer from "../classes/interface/gameContainer.js";
import Canvas from "../classes/interface/canvas.js";
import HudContainer from "../classes/interface/hudContainer/hudContainer.js";
import Player from "../classes/entities/testPlayer.js";
import { entityData } from "../../data/entityData.js";
// #endregion

// #region Userinterface classes
const viewWidth = window.innerWidth;
const viewHeight = window.innerHeight;
const gameContainer = new GameContainer({ viewWidth, viewHeight });
const canvas = new Canvas({ ...gameContainer.dimensions });
const hudContainer = new HudContainer({ ...gameContainer.dimensions });
const userInterface = new UserInterface({ gameContainer, canvas, hudContainer, viewWidth, viewHeight });
// #endregion

// #region Initialize core class elements
const keys = {};
const player = new Player({
    ...entityData.player,
    xPosition: 150,
    yPosition: 150,
    canvas
})
const game = new Game({ userInterface, canvas, player, keys });
// #endregion

// #region Run the game
const update = () => {
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