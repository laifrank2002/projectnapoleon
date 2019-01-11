// taken from tilepaper's shieldshooter
function Bullet(x, y, cx, cy, force) {
    this.x = x;
    this.y = y;
    
	this.mass = 1;
	this.force = force || 1.7;
	
    this.active = true;
    this.image = "bullet1";

    this.vector = this.get_vector(x, y, cx, cy);
    this.speed  = (0.5);
    this.offset = 1;
	
	
}

//calculates the vector, given the starting position and the end position. the length of the vector is always 1 (with bullets, at least)
Bullet.prototype.get_vector = function(start_x, start_y, end_x, end_y) {
    var vx = ((end_x - start_x) / Math.sqrt((end_x - start_x) * (end_x - start_x) + (end_y - start_y) * (end_y - start_y))) * this.force;

    var vy = ((end_y - start_y) / Math.sqrt((end_x - start_x) * (end_x - start_x) + (end_y - start_y) * (end_y - start_y))) * this.force;

    if (isNaN(vx) || isNaN(vy)) {
        this.active = false;
    }
	// randomize
    vx = vx + ((Math.random() - 0.5) * 0.03125); 
    vy = vy + ((Math.random() - 0.5) * 0.03125);

    return {
        x: vx,
        y: vy,
    };
};

Bullet.prototype.get_new_position = function(lapse) {
    this.x += this.vector.x * lapse * this.speed;
    this.y += this.vector.y * lapse * this.speed;
    
	// gravity
	this.vector.y = this.vector.y + Engine.gravity;
	
	// destroys at edges 
    if (this.x < Engine.boundingRectangle.min_x /*|| this.y < Engine.boundingRectangle.min_y*/) { // commented out to let bullets fall to the ground 
        this.active = false;
    }
    if  (this.y < Engine.boundingRectangle.min_y)
	{
		this.y = Engine.boundingRectangle.min_y;
		this.vector.x = 0;
		this.active = false;
	}
    if (this.x > Engine.boundingRectangle.max_x || this.y > Engine.boundingRectangle.max_y) {
        this.active = false;
    }
};

Bullet.prototype.draw = function(context) { // remember to flip y
    context.drawImage(image_library[this.image], (this.x - this.offset), context.canvas.height - (this.y - this.offset));
};

//also add something to detect collision, and deactivate the bullet
Bullet.prototype.collision = function() {
    //enemies handle the collision detection part, since I'm lazy
    this.active = false;
};

Bullet.prototype.destroy_at_edge = function() {
    //destroys the bullet when it's at the edge 
    if (this.x < Engine.boundingRectangle.min_x || this.y < Engine.boundingRectangle.min_y) {
        this.active = false;
    }
    
    if (this.x > Engine.boundingRectangle.max_x || this.y > Engine.boundingRectangle.max_y) {
        this.active = false;
    }
};