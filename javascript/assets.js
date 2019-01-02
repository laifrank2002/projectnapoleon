// loads assets
var image_library = {
	"musketeer": create_image("image/musketeer.png"),
	"musketeer2": create_image("image/musketeer2.png"),
	"musketeer3": create_image("image/musketeer3.png"),
	"musketeer4": create_image("image/musketeer4.png"),
	"guards": create_image("image/guards.png"),
	"scots_guard": create_image("image/scots_guard.png"),
	"16th_light_dragoons1": create_image("image/16thQueensLightDragoons1.png"),
	"16th_light_dragoons2": create_image("image/16thQueensLightDragoons2.png"),
	"16th_light_dragoons3": create_image("image/16thQueensLightDragoons3.png"),
	"bullet1": create_image("image/bullet1.png"),
	"british_cannon": create_image("image/cannon1.png"),
	"hitpoints": create_image("image/hitpoints.png"),
	"grass1": create_image("image/grass1.png"),
	"grass2": create_image("image/grass2.png"),
	"sky1": create_image("image/sky1.png"),
	"shadow1": create_image("image/shadow1.png"),
}

function create_image(path) 
{
	var image = document.createElement("IMG");
	image.src = path;

	return image;
}