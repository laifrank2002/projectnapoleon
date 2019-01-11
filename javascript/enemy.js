var DEFAULT_ENEMY_HEALTH = 1;

function Enemy(x, y, velocity_x, velocity_y, width, height) {
    this.x      = x;
    this.y      = y;
    this.velocity_x    = velocity_x;
    this.velocity_y    = velocity_y;
	this.width = width || 64;
	this.height = height || 64;
    this.active = true;
    this.offset = 0;
    this.speed  = 0.3;
}

Enemy.prototype.get_new_position = function(lapse) {
    this.x += lapse * this.velocity_x * this.speed;
    this.y += lapse * this.velocity_y * this.speed;
    
    this.bounce_at_edge();
    
    
    
    
	// gravity 
	this.velocity_y = this.velocity_y + Engine.gravity;
	
	// first restitute 
	this.restitute();
	
	current_enemy = this; // because this means different things
	
	//check for collisions with things like bullets or shooters
	var collision = false;
	var bullets = Engine.bullets.filter(function(bullet) {
        var same_x = (bullet.x > current_enemy.x) && (bullet.x < current_enemy.x + current_enemy.width);
        var same_y = (bullet.y > current_enemy.y) && (bullet.y < current_enemy.y + current_enemy.height);
        return (same_x && same_y);
    });
    
    bullets.forEach(function(bullet) {
        bullet.collision();
        collision = true;
    });
        
    if (collision) {
        this.active = false;
    }
}

Enemy.prototype.draw = function(context) { // remember to flip y
    var sprite = image_library["musketeer"];
    context.drawImage(sprite, (this.x - this.offset), context.canvas.height - (this.y - this.offset) - this.height);
};

Enemy.prototype.bounce_at_edge = function() {
    //bouncing ability
    if (this.x <= Engine.boundingRectangle.min_x && this.velocity_x < 0) {
        this.velocity_x = -this.velocity_x;
    }
    if (this.x >= Engine.boundingRectangle.max_x && this.velocity_x > 0) {
        this.velocity_x = -this.velocity_x;
    }
};

Enemy.prototype.restitute = function() {
	
	if (this.x < Engine.boundingRectangle.min_x)
	{
		this.x = Engine.boundingRectangle.min_x;
		velocity_x = 0;
		
	}
	if (this.x > Engine.boundingRectangle.max_x)
	{
		this.x = Engine.boundingRectangle.max_x;
		velocity_x = 0;
		
	}
	if (this.y < Engine.boundingRectangle.min_y)
	{
		this.y = Engine.boundingRectangle.min_y;
		velocity_y = 0;
	}
	if (this.y > Engine.boundingRectangle.max_y)
	{
		this.y = Engine.boundingRectangle.max_y;
		velocity_y = 0;
		
	}
	
};

Enemy.prototype.destroy_at_edge = function() {
    if (this.x <= 0 || this.x >= Engine.boundingRectangle.min_x - 25) {
        this.active = false;
    }
};

