// Enemies our player must avoid
var Enemy = function(c) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = 50+50*c;
    this.x = -101;
    this.y = 63+83*c;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


    // Cada vez que update() es llamada, la posicion "X" se incrementa en SPEED y cuando pasa de  505(tama;o del lienzo), se resetea, basic math, lol!
    if (this.x <= 505){
        this.x += this.speed*dt;
    } else{
        this.x=-101;
    };
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.person = 'images/char-boy.png';
    this.setPosition(202,386)
}

Player.prototype.update = function() {
    this.handleCollision();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.person), this.x, this.y);
};

Player.prototype.handleCollision = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        //In order to make it more readable, I declare the enemy and player var.
        var enemy = allEnemies[i];
        var player = this;
        //enemy.x+50.5 es el centro del bug
        if (enemy.x+50 > player.x && enemy.x+50 < player.x+101 &&
            enemy.x+66 > player.x && enemy.x+66 < player.x+101 &&
            enemy.y > player.y && enemy.y < player.y+83) {
            this.setPosition(202,386)
        };
    };
};

Player.prototype.handleInput = function(key) {
    if (key == 'left' && this.x>0) {
        this.x-=101;
    };

    if (key == 'up') {
        if (this.y>386-86*3) {
            this.y-=83;
        } else
            this.setPosition(202,386);
    };

    if (key == 'right' && this.x<404) {
        this.x+=101;
    };

    if (key == 'down' && this.y<386) {
        this.y+=83;
    };
};

Player.prototype.setPosition = function(x,y) {
    this.x = x;
    this.y = y;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(new Enemy(0));
allEnemies.push(new Enemy(1));
allEnemies.push(new Enemy(2));
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
