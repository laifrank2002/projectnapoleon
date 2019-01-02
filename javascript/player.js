var Player = (
	function(){
		var x = 0;
		var y = 0;
		
		var height = 64;
		var width = 64;
		
		var image = ["16th_light_dragoons1","16th_light_dragoons1","16th_light_dragoons1"];
		var shadow_image = ["shadow1","shadow1","shadow1"];
		var image_number = 0;
		var animation_delay = 50;
		var animation_number = 0;
		
		var bullet_fire_offset_x = 38;
		var bullet_fire_offset_y = 42;
		
		var direction = null;
		
		var velocity_y = 0;
		var velocity_x = 0;
		
		var friction = 0.2; // 0 to 1
		var brake_friction = 0.5; // faster braking
		var angle = Math.PI; // angle facing 
		var acceleration = 0.3;
		
		var mass = 10;
		var jump_force = 12;
		// hard coded limits for now, change later
		var boundingRectangle = {
			min_x: 50,
			max_x: 1000,
			min_y: 100,
			max_y: 300,
		};

		// game 
		var health = 10;
		var attack = 1;
		
		
		return {
			
			get image() {return image},
			get shadow_image() {return shadow_image},
			get image_number() {return image_number},
			get x() {return x},
			get y() {return y},
			get height() {return height},
			get width() {return width},
			get bullet_fire_offset_x() {return bullet_fire_offset_x},
			get bullet_fire_offset_y() {return bullet_fire_offset_y},
			
			initialize: function()
			{
				Player.set_direction("right");
				boundingRectangle = Engine.boundingRectangle;
			},
			
			onresize: function()
			{
				boundingRectangle = Engine.boundingRectangle;
				boundingRectangle.max_y = boundingRectangle.max_y - height;
				boundingRectangle.max_x = boundingRectangle.max_x - width;
			},
			
			set_direction: function(new_direction)
			{
				// only 2 directions for now
				if (new_direction === "left")
				{
					Engine.log("Direction set to 'left'.");
					direction = "left";
					angle = 0;
				}
				else if (new_direction === "right")
				{
					Engine.log("Direction set to 'right'.");
					direction = "right";
					angle = Math.PI;
				}
				/*
				else if (new_direction === "up")
				{
					Engine.log("Direction set to 'up'.");
					Player.direction = "up";
				}
				*/
				/*
				else if (new_direction === "down")
				{
					Engine.log("Direction set to 'down'.");
					Player.direction = "down";
				}
				*/
				else 
				{
					Engine.log("Direction not set: invalid parameters. Use 'up' 'down' 'left' or 'right'.");
				}
			},
			
			animate: function()
			{
				animation_number++;
				if (animation_number >= animation_delay)
				{
					image_number++;
					if (image_number >= image.length)
					{
						image_number = 0;
					}
					animation_number = 0;
				}
			},
			
			move_forward: function()
			{
				velocity_x = acceleration;
				Player.set_direction("right");
			},
			
			move_backward: function()
			{
				velocity_x = -acceleration;
				Player.set_direction("left");
			},
			
			move_stop: function()
			{
				velocity_x = velocity_x * (1-brake_friction);
			},
			
			move_jump: function()
			{
				// only jump on the ground, man!
				if (y <= boundingRectangle.min_y)
				{
					velocity_y += jump_force/mass;
				}
			},
			
			fire: function()
			{
				// Engine.log("Fired a bullet at " + (this.x  + bullet_fire_offset_x) + "," + (this.y + + bullet_fire_offset_y) + " to " + Engine.cursor_x + "," + Engine.cursor_y);
				// set timeout for random firing 
				
				return new Bullet(this.x + bullet_fire_offset_x, this.y + bullet_fire_offset_y, Engine.cursor_x, Engine.cursor_y);
				
			},
			// make sure min_x is not more than max_x, or else we'll be stuck in a restitution loop!
			restitute: function()
			{
				if (x < boundingRectangle.min_x)
				{
					x = boundingRectangle.min_x;
					velocity_x = 0;
				}
				if (x > boundingRectangle.max_x)
				{
					x = boundingRectangle.max_x;
					velocity_x = 0;
				}
				if (y < boundingRectangle.min_y)
				{
					y = boundingRectangle.min_y;
					velocity_y = 0;
				}
				if (y > boundingRectangle.max_y)
				{
					y = boundingRectangle.max_y;
					velocity_y = 0;
				}
			},
			
			// gets new position in relation to time 
			get_new_position(lapse)
			{
				
				// friction - only for contact, normal!
				
				velocity_x = velocity_x + Player.get_friction().x;
				// gravity
				velocity_y = velocity_y + Engine.gravity;
				
				x = x + velocity_x*lapse;
				y = y + velocity_y*lapse;
				// update animation positions
				Player.animate();
				
				// restitution 
				Player.restitute();
				
			},
			
			get_friction: function()
			{
				return {
					x: -velocity_x * friction,
					y: -velocity_y * friction,
				};
			},
		}
	}
)();