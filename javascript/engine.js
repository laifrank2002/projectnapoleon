/** 
	Portable lightweight engine. 
	With the greatest of thanks to tilepaper (clocks in a cooler), 
	Whose code I had no difficulty in adapating.
	@author Frank Lai 2002
	@version 2018-12-11
	https://github.com/laifrank2002
	https://github.com/Clocks-in-a-Cooler/shield_shooter/blob/master/javascript/engine.js
 */

var Engine = (
	function()
	{
		
		// private fields
		var _log = false;
		var _debug = true;
		
		var objects = [];
		var bullets = [];
		
		//stores cursor's position from the top left corner; x corresponds to left-right; y corresponds to up-down
		var cursor = {
			x: 0,
			y: 0,
		};
		
		//for animation
		var last_time = null; 
		var lapse = 0;
		var paused = false;
		
		var frame_count = 0;
		
		// physics 
		var gravity = -0.1;
		
		//for the game
		var difficulty    = 0; //good luck
		var max_enemies   = 2;
		var spawn_delay   = 1500; //good luck
		var score         = 0; //good luck
		
		var boundingRectangle = { // in which action is allowed to take place
			min_x: 0,
			max_x: 1000,
			min_y: 100,
			max_y: 300,
		};
		
		return {
			
			get boundingRectangle() {return boundingRectangle},
			get cursor_x() { return cursor.x; },
			get cursor_y() { return cursor.y; },
			get bullets() { return bullets; },
			get gravity() { return gravity; },
			
			initialize: function()
			{
				Engine.log("Initializing Engine...");
				//set up the mouse move event listeners
				document.onmousemove = function(event) {
					cursor.x = event.pageX;
					cursor.y = Canvas.canvas.height - event.pageY; // flip y!
				}
				
				Canvas.initialize();
				boundingRectangle = {
					min_x: 0,
					max_x: 1000,
					min_y: 23,
					max_y: 800,
				};
				window.onresize = function()
				{
					Canvas.onresize();
					Engine.onresize();
				}
				key_handler.initialize();
				mouse_handler.initialize();
				Player.initialize();
				
				requestAnimationFrame(Engine.animate); // init animation when all is ready
				
			},
			
			onresize: function()
			{
				Player.onresize();
				boundingRectangle = {
					min_x: 0,
					max_x: 1000,
					min_y: 23,
					max_y: 800};
			},
			
			log: function(message)
			{
				if (_log)
				{
					console.log(message);
				}
			},
			
			debug: function()
			{
				setInterval(function()
				{
					Engine.log(frame_count);
					frame_count = 0;
				}, 1000);
			},
			// animation
			animate: function(time)
			{
				if (last_time === null)
				{
					lapse = 0;
				}
				else 
				{
					lapse = time - last_time;
				}
				
				last_time = time;
				
				if(!paused) 
				{
					Engine.draw_frame(lapse);
				}
				
				if (_debug) frame_count++; // debugging
				requestAnimationFrame(Engine.animate);
			},
			
			draw_frame: function(lapse)
			{
				// call canvas handler
				Canvas.draw(lapse);
				
			},
			
			toggle_pause: function()
			{
				paused = !paused;
			},
			
			// handle key
			handle_key: function()
			{
				switch (event.keyCode) 
				{
					case 87:
					case 38:
						Engine.log("UP key pressed");
						Player.move_jump();
						break;

					case 83:
					case 40:
						Engine.log("DOWN key pressed");
						Player.move_stop();
						break;
						
					case 65:
					case 37:
						Engine.log("LEFT key pressed");
						Player.move_backward();
						break;

					case 68:
					case 39:
						Engine.log("RIGHT key pressed");
						Player.move_forward();
						break;
					case 32: 
						Engine.log("FIRE(space) key pressed");
						bullets.push(Player.fire());
						
						break;
				}
			},
			
			handle_click: function()
			{
				if (event.button === 0)
				{
					Engine.log("FIRE(mouse left) clicked");
					bullets.push(Player.fire());
				}
				else if (event.button === 2)
				{
					event.preventDefault(); // stop right click context menu
					Engine.log("MOVETO(mouse right) clicked");
				}
			},
			// physics
			
		}
	}
)();