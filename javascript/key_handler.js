var key_handler = (
	function()
	{
		var initialized = false;
		
		return {
			initialize: function()
			{
				if(!initialized)
				{
					Engine.log("Initializing key handler...");
					addEventListener("keydown", Engine.handle_key); // sort of like threads
					initialized = true;
				}
				else
				{
					Engine.log("Keyhandler is already initialized!");
				}
			},
			deinitialize: function()
			{
				if(initialized)
				{
					Engine.log("Removing keyhandler...");
					removeEventListener("keydown",Engine.handle_key);
					initialized = false;
				}
				else
				{
					Engine.log("Keyhandler has not been initialized!");
				}
			},

		} // end of return 
	}
)();