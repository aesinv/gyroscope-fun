(function (document, window) {
	var element = document.getElementById('skybox'),
      velocity = 0.35,
      origin = {
        reset: true,
        x : 0,
        y : 0
      },
      rotation = {
        x : 0,
        y: 0
      };
  
  var resetOrigin = function () {
    origin.reset = true;
  };
  
  var rotateCube = function () {
    var translate = "translate3d(-400px, -400px, 1000px)";
    element.style.transform = translate + " rotateX(" + rotation.x + "deg) rotateY(" + rotation.y + "deg)";
    document.getElementById("x").innerText = rotation.x;
    document.getElementById("y").innerText = rotation.y;
  };

	var handleRotation = function (event) {
		var x = event.alpha,
        y = event.gamma,
        horizontal, vertical,
        difference;
    
		// if (origin.reset) {
		// origin.x = x;
		// origin.y = y;
		// origin.reset = false;
		// console.log('setting rotation origin', rotation.origin);
		// }

    // horizontal = origin.x - x;
    // vertical = origin.y - y;
    horizontal = x;
    vertical = y;

    if (horizontal >= 0) {
      rotation.y -= horizontal;
    }

    if (horizontal <= 0) {
      rotation.y += horizontal;
    }

    if (vertical >= 0) {
      rotation.x -= vertical;
    }

    if (vertical <= 0) {
      rotation.x += vertical;
    }

      
    rotation.x *= velocity;
    rotation.y *= velocity;

    rotateCube();
		
		return true;
	};

	window.addEventListener("deviceorientation", handleRotation);
  
  /** Button handling */
  // var $reset = document.getElementById("resetOrigin");
  // $reset.addEventListener("click", resetOrigin);
})(document, window, null);