import Phaser from 'phaser';


// bind scene to new Scene instance object
// const scene = new Phaser.Scene('game');

// AUTO uses WebGL first, falls back on Canvas
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  // scene: scene
}

// create a game object that sets up game settings
// prior to running. the game needs a scene, hence 
// scene defined above. 
const game = new Phaser.Game(config)


// now we create scene functions which run at certain intervals
// we are EXTENDING our scene objects via functions (function expression syntax)
// init => sets up vars like lives, health, ammo, etc
// preload => preloads assets into the game prior to render
// create => loaded once preload has finished, position character, add text etc
// update => core function of the game, runs 60x/second used for interaction
// end => called once the game is over, ie out of lives, end of level

scene.init = function() {

}

scene.preload = function() {

}

scene.create = function() {

}

scene.update = function() {

}

scene.end = function() {

}
