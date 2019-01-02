/** 
	Wrapper for canvas object. Does much of the animation.
	Some code taken from clocks-in-a-cooler.
	https://github.com/Clocks-in-a-Cooler
	@author Frank Lai 2002
	@version 2018-12-11
	https://github.com/laifrank2002
 */

var Canvas = (
	function()
	{
		// constants 
		var DEFAULT_CANVAS = "main_canvas";
		
		// private fields
		var canvas;
		var context;
		return {
			get canvas() {return canvas},
			
			initialize: function()
			{
				Engine.log("Initializing Canvas...");
				canvas = document.getElementById(DEFAULT_CANVAS);
				context = canvas.getContext("2d");
				
				context.canvas.width = window.innerWidth;
				context.canvas.height = window.innerHeight;
			},
			
			draw: function(lapse)
			{
				Player.get_new_position(lapse);
				//up to this point, nothing has been drawn yet!
				
				// clear and draw
				context.clearRect(0, 0, canvas.width, canvas.height);
				// note that we're converting everything from canvas to cartesian, so y flips
				
				// draw the background
				for (var x = 0; x < canvas.width; x+= 64)
				{
					for (var y = 0; y < canvas.height; y+= 64)
					{
						context.drawImage(image_library["sky1"], x, y); // temp
					}
				}
				// draw the ground 
				for (var x = 0; x < canvas.width; x+= 64)
				{
					context.drawImage(image_library["grass1"], x, canvas.height - 64); // temp
				}
				
				// draw bullets 
				var bullets = Engine.bullets;
				bullets = bullets.filter(function(bullet) {return bullet.active;}); // filter out inactive ones 
				bullets.forEach(function(bullet) {
					with (bullet) {
						get_new_position(lapse);
						draw(context);
					}
				});
				
				// draw the player! // y flips 
				context.drawImage(image_library[Player.image[Player.image_number]], Player.x, canvas.height - (Player.y) - Player.height);
				// shadow 
				context.drawImage(image_library[Player.shadow_image[Player.image_number]], Player.x, canvas.height - Player.height - Engine.boundingRectangle.min_y); 
				
				// make a 100px line, always
				
				// draw a dotted line from the player to the cursor 
				
				context.beginPath();
				context.setLineDash([5])
				context.strokeStyle = "red";
				var line = Canvas.get_fixed_length_line(Player.bullet_fire_offset_x + Player.x
				,canvas.height - (Player.y) - Player.bullet_fire_offset_y
				,Engine.cursor_x
				,canvas.height - Engine.cursor_y
				,100);
				context.moveTo(line.x1, line.y1)
				context.lineTo(line.x2, line.y2)
				context.stroke();
				
			},
			
			onresize: function()
			{
				context.canvas.width = window.innerWidth;
				context.canvas.height = window.innerHeight;
				
				context = canvas.getContext("2d"); // get new context so everything doesn't blank out on zoom
			},
			
			get_fixed_length_line: function(x1,y1,x2,y2,length)
			{
				var big_height = y2 - y1;
				var big_width = x2 - x1;
				// you must check which quadrant we're in, then we use -atan and -cos
				// this way we can have our full circle!
				if (big_width >= 0)
				{
					var theta = Math.atan(big_height / big_width);
					var width = length * Math.cos(theta);
				}
				else 
				{
					var theta = -Math.atan(big_height / big_width);
					var width = length * -Math.cos(theta);
				}
				var height = length * Math.sin(theta);
				
				return {x1: x1,y1: y1,x2: x1 + width,y2: y1 + height};
			},
		}
	}
)();