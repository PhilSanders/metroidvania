//  Create the state that will contain the whole game

var metroid = {
    preload: function() {
        game.load.spritesheet('player', 'assets/samus_run.png',32,44);
		game.load.image('slate', 'assets/slate.png');
		game.load.image('slate2', 'assets/slate2.png');
		game.load.image('block', 'assets/block.png');
		game.load.image('rock', 'assets/rock.png');
		game.load.image('pillar', 'assets/pillar.png');
		game.load.image('pipe', 'assets/pipe.png');
		game.load.image('tube', 'assets/tube.png');
		game.load.image('tube2', 'assets/tube2.png');
		game.load.image('aztek', 'assets/astek.png');
		game.load.image('aztek2', 'assets/astek2.png');
		game.load.image('ground', 'assets/ground.png');
		game.load.image('wedge', 'assets/wedge.png');
		game.load.image('wedge2', 'assets/wedge2.png');
		game.load.image('wall', 'assets/wall.png');
		game.load.image('pole', 'assets/pole.png');
		game.load.image('vent', 'assets/vent.png');
		game.load.image('coin', 'assets/coin.png');
		game.load.image('door', 'assets/door.png');
		game.load.image('door2', 'assets/door2.png');
		game.load.image('doorFrame', 'assets/door_frame.png');
		game.load.spritesheet('life', 'assets/life_small.png',16,16);
		game.load.spritesheet('orb', 'assets/orb_glow.png',16,16);
		game.load.image('fire', 'assets/fire.png');
		game.load.image('enemy', 'assets/enemy.png');
		game.load.spritesheet('enemyBug', 'assets/enemy_bug.png',16,16);
		game.load.image('bullet', 'assets/bullet_single.png');
    },

    create: function() {

		//  Scale game to window
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//  Set the background color to blue
		game.stage.backgroundColor = '#000000';
		//  Start the Arcade physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//  Add the physics engine to all game objects
		game.world.enableBody = true;
		//  Image Smoothing
		game.world.smoothed = false;

		//  Control input
		this.cursor = game.input.keyboard.createCursorKeys();
		this.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.fire = game.input.keyboard.addKey(Phaser.Keyboard.X);
		this.fire2 = game.input.keyboard.addKey(Phaser.Keyboard.M);
		this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);
		this.jumpButton2 = game.input.keyboard.addKey(Phaser.Keyboard.N);
		this.jumpTimer = 0;

		//  CREATE THE LEVEL
		//  Set the map bounds
		this.boundsOffset = 0; //  used to offset map bounds when moving through doors
		game.world.setBounds(this.boundsOffset, 0, 2304, 240);

		//  Create groups that will contain our objects
		this.doors = game.add.group();
		this.doorways = game.add.group();
		this.walls = game.add.group();
		this.rocks = game.add.group();
		this.energy = game.add.group();
		this.orbs = game.add.group();
		this.enemies = game.add.group();

		// The map
		var level = [
			'sbbbbWbsbggggbggsbbbbwbssbbbbWbssbbbbWbssbbbbWbssbbbbwggggbgbgAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxvvAsbbbbWbssbbbbAA',
			'bWwW  bbbbssbbsbbWwW  bbbWwW  bbbWwW  bbbWwW  bbbWwW  bbbssbbssbxx                     xxxxxxxxxxxxxxxxxxxxxxx                AAsbWwW  bbbWwW sb',
			'b               b       b       b       b       b             bpxx                     xxxxxxxxxxxxxxxxxxxxxxx                sbbb       b    bp',
			'                     a     a                                  ppxx                   o            o    o                      pppp            pp',
			'          btbb       P     P                                  bbxx           o                    *    *                      bbbb            bb',
			'          bsbp       AA   AA                                  Ddd-                          oo    v    v    oo                Ddd     *       Dd',
			'          pbtbb      sb   sb*                                 -dd-                                               v            -dd-  bsrrrrsb  -d',
			'          bbsbp      bp   bp                               *  -dd-       o                  *                                 -dd-       *    -d',
			'           pbtbb     pp   pp                              bttbAAxxxxxxxxxxxxxxxxxxx    xxxxxxxxxxxxxxxxxxxxxxxx     xxxxxxxxxxxxSSSSrrrrrrrrbtbb',
			'      O    bbsbp     bb   bb                                  sbxxxxxxxxxxxxxxxxxxx    xxxxxxxxxxxxxxxxxxxxxxxxfffffxxxxxxxxxxxxSssS        bsbp',
			'      v     pbbb                                              bpffxxxxxxxxxxxxxxxxxffffxxxxxxxxxxxxxxxxxxxxxxxx!!!!!xxxxxxxxxxxxssss  rrrr  pbbb',
			'   a  v  a  bbsb                                              pp!!xxxxxxxxxxxxxxxxx!!!!xxxxxxxxxxxxxxxxxxxxxxxx!!!!!xxxxxxxxxxxxAASS        bbAA',
			'   vv T vv           vvvvvvv             *                    bb!!xxxxxxxxxxxxxxxxx!!!!xxxxxxxxxxxxxxxxxxxxxxxx!!!!!xxxxxxxxxxxxsb            sb',
			'bggggbggbggggbggbggggbggbggggbggbggggbggbggggbggbggggbggbggggbgg!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!vxxxxxxxxxxxbp            bp',
			'bbssbbsbbbssbbsbbbssbbsbbbssbbsbbssbbsbbbssbbsbbbssbbsbbbssbbsbb!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!vxxxxxxxxxxxpp    bbbb    pp',
		  // 123456789012345612345678901234561234567890123456123456789012345612345678901234561234567890123456123456789012345612345678901234561234567890123456
		  // |               |               |               |               |               |               |               |               |               |
		];

		var level2 = [
			'                  AsbbbbWbssbbbbAA',
			'                  sbWwW  bbbWwW sb',
			'                  bb       b    bp',
			'                  pp            pp',
			'                  bb            bb',
			'                Ddd     *       Ddd',
			'                 dd-  bsrrrrsb  -dd',
			'                 dd-       *    -dd',
			'                  SSSSrrrrrrrrbtbb',
			'                  SssS        bsbp',
			'                  ssss  rrrr  pbbb',
			'                  AASS        bbAA',
			'                  sb            sb',
			'                  bp            bp',
			'                  pp    bbbb    pp',
			// 12345678901234561234567890123456123456789012345612345678901234561234567890123456123456789012345612345678901234561234567890123456
		  	// |               |               |               |               |               |               |               |               |
		];

		this.buildMap(level);

		//  CREATE PLAYER
		//  Create the player
		this.player = game.add.sprite(384, 193, 'player');
		this.player.smoothed = false;
		this.player.anchor.setTo(.5, 1);
		this.player.body.setSize(16,31,8,6);
		game.physics.enable(this.player, Phaser.Physics.ARCADE);
		game.camera.follow(this.player);
		this.player.body.collideWorldBounds = true;
		this.player.body.gravity.y = 600;

		//  Player animations
		this.player.animations.add('load',[0],1,true);
		this.player.animations.add('stand',[1],1,true);
		this.player.animations.add('ball',[11,12,13,14],20,true);
		this.player.animations.add('jump',[5],1,true);
		this.player.animations.add('jumpRoll',[7,8,9,10],20,true);
		this.player.animations.add('up',[6],1,true);
		//this.player.animations.add('down',[5,4,4],10,true);
		this.playerLeft = this.player.animations.add('left',[2,3,4],10,true);
		this.playerRight = this.player.animations.add('right',[2,3,4],10,true);

		this.playerLeft.enableUpdate = true;
		this.playerRight.enableUpdate = true;

		//  If jumping
		this.jumping = false;
		//  If crouching trigger
		this.crouching = false;

		//  Player energy
		this.playerEnergy = 80;

		//  Weapon stash
		this.weaponRapid = false;
		this.weaponBall = false;
		this.weaponBomb = false;
		this.weaponJump = false;

		//  CREATE WEAPON
		//  Default weapon
		this.bulletTime = 0;
		this.bullets = game.add.group();
		this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

		for (var i = 0; i < 100; i++) {
			var b = this.bullets.create(0, 0, 'bullet');
			b.name = 'bullet' + i;
			b.exists = false;
			b.visible = false;
			b.checkWorldBounds = true;
			b.events.onOutOfBounds.add(function(){
				b.kill()
			});
		}
    },

    update: function() {

		//  Make the player collide with walls
		game.physics.arcade.collide(this.player, [this.walls,this.doors,this.rocks]);

		//  Bullets collide with walls and doorways
		game.physics.arcade.collide(this.bullets, [this.walls], this.bulletKill, null, this);

		//  Open doors with bullets
		game.physics.arcade.overlap(this.doors, this.bullets, this.openDoor, null, this);

		//  Bullets break rocks
		game.physics.arcade.overlap(this.rocks, this.bullets, this.breakRock, null, this);

		//  Walk through doors
		game.physics.arcade.overlap(this.player, this.doorways, this.walkThroughDoor, null, this);

		//  Kill enemies
		game.physics.arcade.overlap(this.enemies, this.bullets, this.killEnemy, null, this);

		// pickup life
		game.physics.arcade.overlap(this.player, this.energy, this.pickupEnergy, null, this);

		// pickup weapon
		game.physics.arcade.overlap(this.player, this.orbs, this.pickupWeapon, null, this);

		// die and restart
		game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);

		//  Move the player
		if (this.cursor.left.isDown || this.left.isDown) {
			if (this.player.body.touching.down)
				this.player.play('left');
			else if (this.jumpButton.isDown || this.jumpButton2.isDown)
				this.player.play('jumpRoll');
			else
				this.player.play('jump');
			this.player.scale.x = -1;
			this.player.body.velocity.x = -100;
		}
		else if (this.cursor.right.isDown || this.right.isDown) {
			if (this.player.body.touching.down)
				this.player.play('right');
			else if (this.jumpButton.isDown || this.jumpButton2.isDown)
				this.player.play('jumpRoll');
			else
				this.player.play('jump');
			this.player.scale.x = 1;
			this.player.body.velocity.x = 100;
		}
		else if (this.cursor.up.isDown || this.up.isDown) {
			if(this.crouching){
				this.crouching = false;
				this.player.body.velocity.y = -100;
			}
			this.player.play('up');
		}
		else if ((this.cursor.down.isDown || this.down.isDown) && this.weaponBall === true) {
			this.crouching = true;
			this.player.play('ball');
		}
		else {
			this.jumping = false;
			this.player.body.setSize(16,31,8,6);
			if (game.time.now > this.jumpTimer){
				this.player.play('stand');
				this.player.body.velocity.x = 0;
			}
		}
		if ((this.jumpButton.isDown || this.jumpButton2.isDown) && game.time.now > this.jumpTimer && this.player.body.touching.down) {
			//console.log('jumping');
			this.jumpging = true;
			this.player.play('jump');
			this.player.body.velocity.y = -310;
			this.jumpTimer = game.time.now + 300;
		}
		//  Crouching ball spin
		if (this.crouching){
			this.player.body.setSize(16,16,8,15);
			this.player.play('ball');
		}

		this.fireWeapon();

	},

	fireWeapon: function() {
		if ((this.fire.isDown || this.fire2.isDown) && this.crouching === false) {
			if (game.time.now > this.bulletTime) {
				bullet = this.bullets.getFirstExists(false);
				if (bullet) {
					bullet.lifespan = 100;
					bullet.anchor.setTo(0.5, 0.5);
					//  fire left
					if (this.player.scale.x === 1){
						bullet.reset(this.player.x + 16, this.player.y - 28);
						bullet.body.velocity.x = 400;
					}
					//  fire right
					if (this.player.scale.x === -1){
						bullet.reset(this.player.x - 16, this.player.y - 28);
						bullet.body.velocity.x = -400;
					}
					// fire up
					if (this.cursor.up.isDown || this.up.isDown){
						bullet.body.velocity.y = -400;
						if (this.player.scale.x === 1)
							bullet.reset(this.player.x + 2, this.player.y - 50);
						else
							bullet.reset(this.player.x - 2, this.player.y - 50);
					}
					// fire down ( must be jumping )
					if ((this.cursor.down.isDown || this.down.isDown)){
						bullet.body.velocity.y = 400;
					}
					this.bulletTime = game.time.now + 200;
				}
			}
		}
	},

	//  Function to kill a coin
	pickupEnergy: function(player, energy) {
		energy.kill();
		this.playerEnergy +=  2;
		console.log(this.playerEnergy);
	},

	//  Pickup weapon
	pickupWeapon: function(player, orb) {
		orb.kill();
		this.weaponBall = true;
	},

	//  Function to restart the game
	restart: function() {
		this.playerEnergy -=  2;
		console.log(this.playerEnergy);
		if (this.playerEnergy <= 0)
			game.state.start('metroid');
	},

	bulletKill: function(bullet){
		bullet.kill();
	},

	killEnemy: function(enemy,bullet){
		bullet.kill();
		enemy.kill();
	},

	breakRock: function(rock,bullet){
		bullet.kill();
		rock.kill();
	},

	openDoor: function(door,bullet){
		bullet.kill();
		door.kill();
		console.log('door open');
		game.time.events.add(Phaser.Timer.SECOND + 300, function(){
			console.log('door rest');
			door.reset(door.x,door.y);
		}, this).autoDestroy = true;
	},

	walkThroughDoor: function(){
		boundsWidth = game.world.bounds.width;
		if (this.player.scale.x === 1){
			this.player.x += 9; //  numdge player through door
			//game.world.setBounds(boundsWidth,0,1024,240);
			this.boundsOffset = this.boundsOffset + boundsWidth;
		}
		else {
			this.player.x -= 9; //  nudge player through door
			//game.world.setBounds(0,0,1024,240);
			this.boundsOffset = this.boundsOffset - boundsWidth;
		}
		console.log(this.boundsOffset);
	},

	buildMap: function(level){
		//  Create the level by going through the array
		for (var i = 0; i < level.length; i++) {
			for (var j = 0; j < level[i].length; j++) {
				//  Create a poll and add it to the 'walls' group
				if (level[i][j] == 's') {
					var slate = game.add.sprite(16*j, 16*i, 'slate');
					slate.body.immovable = true;
					this.walls.add(slate);
				}
				else if (level[i][j] == 'S') {
					var slate2 = game.add.sprite(16*j, 16*i, 'slate2');
					slate2.body.immovable = true;
					this.walls.add(slate2);
				}
				else if (level[i][j] == 'W') {
					var wedge = game.add.sprite(16*j, 16*i, 'wedge');
					wedge.body.immovable = true;
					this.walls.add(wedge);
				}
				else if (level[i][j] == 'w') {
					var wedge2 = game.add.sprite(16*j, 16*i, 'wedge2');
					wedge2.body.immovable = true;
					this.walls.add(wedge2);
				}
				else if (level[i][j] == 'b') {
					var block = game.add.sprite(16*j, 16*i, 'block');
					block.body.immovable = true;
					this.walls.add(block);
				}
				else if (level[i][j] == 'r') {
					var rock = game.add.sprite(16*j, 16*i, 'rock');
					rock.body.immovable = true;
					this.rocks.add(rock);
				}
				else if (level[i][j] == 'g') {
					var ground = game.add.sprite(16*j, 16*i, 'ground');
					ground.body.immovable = true;
					this.walls.add(ground);
				}
				else if (level[i][j] == 'p') {
					var pillar = game.add.sprite(16*j, 16*i, 'pillar');
					pillar.body.immovable = true;
					this.walls.add(pillar);
				}
				else if (level[i][j] == 't') {
					var tube = game.add.sprite(16*j, 16*i, 'tube');
					tube.body.immovable = true;
					this.walls.add(tube);
				}
				else if (level[i][j] == 'T') {
					var tube2 = game.add.sprite(16*j, 16*i, 'tube2');
					tube2.body.immovable = true;
					this.walls.add(tube2);
				}
				else if (level[i][j] == 'a') {
					var aztek = game.add.sprite(16*j, 16*i, 'aztek');
					aztek.body.immovable = true;
					this.walls.add(aztek);
				}
				else if (level[i][j] == 'A') {
					var aztek2 = game.add.sprite(16*j, 16*i, 'aztek2');
					aztek2.body.immovable = true;
					this.walls.add(aztek2);
				}
				else if (level[i][j] == 'P') {
					var pipe = game.add.sprite(16*j, 16*i, 'pipe');
					pipe.body.immovable = true;
					this.walls.add(pipe);
				}
				else if (level[i][j] == '|') {
					var pole = game.add.sprite(16*j, 16*i, 'pole');
					pole.body.immovable = true;
					this.walls.add(pole);
				}
				else if (level[i][j] == 'v') {
					var vent = game.add.sprite(16*j, 16*i, 'vent');
					vent.body.immovable = true;
					this.walls.add(vent);
				}
				//  Create a wall and add it to the 'walls' group
				else if (level[i][j] == 'x') {
					var wall = game.add.sprite(16*j, 16*i, 'wall');
					wall.body.immovable = true;
					this.walls.add(wall);
				}
				else if (level[i][j] == 'D') {
					var door = game.add.sprite(16*j, 16*i, 'door');
					door.body.setSize(32,48,16,0);
					door.body.immovable = true;
					this.doors.add(door);
				}
				else if (level[i][j] == 'E') {
					var door2 = game.add.sprite(16*j, 16*i, 'door2');
					door2.body.setSize(8,48,0,0);
					door2.body.immovable = true;
					this.doors.add(door2);
				}
				else if (level[i][j] == 'd') {
					var doorFrame = game.add.sprite(16*j, 16*i, 'doorFrame');
					doorFrame.body.immovable = true;
					this.doorways.add(doorFrame);
				}
				//  Create a coin and add it to the 'coins' group
				else if (level[i][j] == 'o') {
					var life = game.add.sprite(16*j, 16*i, 'life');
					life.animations.add('glow',[0,1],20,true);
					life.play('glow');
					this.energy.add(life);
				}
				else if (level[i][j] == 'O') {
					var orb = game.add.sprite(16*j, 16*i, 'orb');
					orb.animations.add('glow',[0,3],20,true);
					orb.play('glow');
					this.orbs.add(orb);
				}
				//  Create a enemy and add it to the 'enemies' group
				else if (level[i][j] == '!') {
					var enemy = game.add.sprite(16*j, 16*i, 'enemy');
					this.enemies.add(enemy);
				}
				else if (level[i][j] == '*') {
					var enemyBug = game.add.sprite(16*j, 16*i, 'enemyBug');
					//enemyBug.anchor.setTo(.5, .5);
					enemyBug.animations.add('wiggle',[0,1],10,true);
					enemyBug.play('wiggle');
					this.enemies.add(enemyBug);
				}
				//  Create a enemy and add it to the 'enemies' group
				else if (level[i][j] == 'f') {
					var fire = game.add.sprite(16*j, 16*i, 'fire');
					this.enemies.add(fire);
				}
			}
		}
	},

	render: function() {
		//game.debug.spriteInfo(this.player, 32, 32);
		//game.debug.body(this.player, 'rgba(173,255,47,0.5)');
		//this.walls.forEachAlive(this.renderGroup, this, 'rgba(167, 255, 0, 0.2)');
		//this.doors.forEachAlive(this.renderGroup, this, 'rgba(255, 0, 186, 0.2)');
		//this.doorways.forEachAlive(this.renderGroup, this, 'rgba(255, 0, 186, 0.2)');
		//this.enemies.forEachAlive(this.renderGroup, this, 'rgba(255, 0, 186, 0.2)');
		//this.rocks.forEachAlive(this.renderGroup, this, 'rgba(255, 108, 0, 0.5)');
	},

	renderGroup: function (group,color) {
		game.debug.body(group,color);
	}
};

//  Initialize the game and start our state
var game = new Phaser.Game(256, 240);
game.state.add('metroid', metroid);
game.state.start('metroid');
