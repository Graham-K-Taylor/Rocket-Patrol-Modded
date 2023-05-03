//Graham Taylor
//Rocket Petrol (this mod is NOT gas)
//Completion: 3-5 hours ish
//Mods:
//create particles on explosion - 15 - DONE
//implement mouse control - 15 - DONE
//timer implementation - 10 - probably done
//add time for each kill - 15 - done, but remember to actually fix the time display
//speed increase after 30 seconds - 5 - probably done
// high score- 5 - done
// allow control after spaceship has been launched - 5 DONE
// alternating 2 player mode - 15
// new enemy spaceship thats cooler and faster and worth even more points - 15
//Sources: just me :3







let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }
let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, MOUSE;