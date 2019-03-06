/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

import "phaser";
import { MainScene } from "./scenes/mainScene";
import { PreloadScene } from "./scenes/preloadScene";
import { StartScene } from "./scenes/startScene";

// main game configuration
var game;
const config: GameConfig = {
  width: 135,
  height: 203,
  type: Phaser.AUTO,
  parent: "game",
  pixelArt: true,
  scene: [PreloadScene,StartScene,MainScene],
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        width: 135,
        height: 203
      },
  physics: {
    default: "arcade",
    arcade: {
    //  debug : true,
      gravity: { y: 200 }
    }
  }
};

// game class
export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
  game = new Game(config);
 // resize();
});
//window.addEventListener("resize", () => {
// //resize();
//});
//
//function resize() {
//  var canvas = document.querySelector("canvas");
//  var windowWidth = window.innerWidth;
//  var windowHeight = window.innerHeight;
//  var windowRatio = windowWidth / windowHeight;
//  var gameRatio = game.config.width / game.config.height;
//  if(windowRatio < gameRatio)
//  {
//    canvas.style.width = windowWidth + "px";
//    canvas.style.height = (windowWidth / gameRatio) + "px";    }
//  else
//  {
//    canvas.style.width = (windowHeight * gameRatio) + "px";
//    canvas.style.height = windowHeight + "px";
//  }
//}
