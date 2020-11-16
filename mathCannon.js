class Laser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'laser')
  }

  fire(x, y) {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setVelocity(-900);
  }
}

class LaserGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    
    this.createMultiple({
      classType: Laser,
      frameQuantity: 30,
      active: false,
      visible: false,
      key: 'laser'
    })
  }
}

// bind scene to new Scene instance object
const spaceScene = new Phaser.Scene('game');

const config = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  physics: {
      default: 'arcade',
      arcade: {
          fps: 60,
          gravity: {y : 0},
        }
      },
      scene: spaceScene
    };
    
const game = new Phaser.Game(config);

// we are EXTENDING our scene objects via functions (function expression syntax)
// now we create scene functions which run at certain intervals

// init => sets up vars like lives, health, ammo, etc
spaceScene.init = function() {
  this.score = 0;
  this.lives = 3;
  this.scoreText;
  this.equation;
  
}

// preload => preloads assets into the game prior to render
spaceScene.preload = function() {
  this.load.image('background', 'assets/img/space-bg.jpg')
  this.load.image('crosshair', 'assets/img/crossair_blueOutline.png')
  this.load.image('laser', 'assets/img/laserGreen03.png')
  this.load.audio('laserSound', 'assets/sounds/laser1.ogg')
}

// create => loaded once preload has finished, position character, add text etc
let ch;
// let laser;
let laserGroup

spaceScene.create = function() {
  this.laserGroup = new LaserGroup(this);
  let bg = this.add.sprite(0, 0, 'background');
  bg.setOrigin(0, 0);

  ch = this.physics.add.sprite(config.width/2, config.height/2, 'crosshair')
  ch.body.setCollideWorldBounds(true)

  // laser = this.physics.add.sprite(config.width/2, config.height , 'laser')

  this.anims.create({
    key: 'laserAnim',
    frames: this.anims.generateFrameNumbers('laser'),
    frameRate: 20, 
    repeat: -1
  })

  // remember this.setScale

  // add.text(x, y, 'text', {styling object props})
  this.scoreText = this.add.text(16, 16, 'score : '+ this.score, {fontSize: '20px', fill: '#fff'})
  this.liveText = this.add.text(16, config.height-50, 'Lives : ' + this.lives, {fontSize: '20px', fill: '#fff'})
}

function addEvents() {
  this.input.on('pointermove', pointer => {
    ch.x = pointer.x
  })
  this.input.on('pointerdown', pointer => {

  })
}

// function resetLasers (laser) {
//   laser.y = config.height
// }

// function fireLasers (laser, speed) {
//   laser.x = ch.x;
//   laser.y -= speed;
  
//   if (laser.y < ch.y + ch.height/2) {
//     this.resetLasers(laser)
//   }
// }
function fireLasers (x, y) {
  const laser = this.getFirstDead(false);
  if (laser) {
    laser.fire(x, y);
  }
}


let cursors;

// update => core function of the game, runs 60x/second used for interaction
spaceScene.update = function() {

  // fireLasers(laser, 20)

  cursors = this.input.keyboard.createCursorKeys();

  // player movement
  if (cursors.left.isDown) ch.x -= 10;
  if (cursors.right.isDown) ch.x += 10;
  if (cursors.up.isDown) ch.y -= 10;
  if (cursors.down.isDown) ch.y += 10;

  if (cursors.space.isDown) {
    this.sound.play('laserSound')
  } 
  
}

// end => called once the game is over, ie out of lives, end of level
spaceScene.end = function() {

}