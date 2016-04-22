(function (document, window) {
	var useGyroscope = true,
		slowScrollMin = 6.5,
		slowScrollSpeed = 1.15,
		velocity = 0.75,
		rotation = {
			rate : 0,
			value : 0,
			origin: false,
		};

	// Scroll the window by the current rotation value
	// (either slowScrollMin * velocity or -slowScrollMin * velocity)
	var scrollWindow = function () {
		window.scrollBy(0, rotation.value);
	};

	// Fires every time the device provides data to the browser
	var handleRotation = function (event) {
		var axis = event.beta, // cache the relevant gyro info
			difference;

		// If we haven't set the origin yet, do it up dawg
		if (!rotation.origin) {
			rotation.origin = axis;
		}

		// If we're using the gyroscope....
		if (useGyroscope) {
			// Get the difference between origin and the reported data
			difference = rotation.origin - axis;

			if (difference > slowScrollMin) {
				// If the difference is greater than the minimum, scroll down
				rotation.value += slowScrollSpeed;
			} else if (difference < -slowScrollMin) {
				// If the difference is less than the inverse of the minimum, scroll up
				rotation.value -= slowScrollSpeed;
			}

			// Apply a velocity force to the value to smooth things out
			rotation.value *= velocity;

			// Get to scrolling, browser!
			scrollWindow();
		}

		return true;
	};

	// Set our method to handle the deviceorientation events
	window.addEventListener("deviceorientation", handleRotation);

	/** Button handling */
	var $toggle = document.getElementById("toggleScrolling"),
		$reset = document.getElementById("resetOrigin");

	$toggle.addEventListener("click", function (event) {

		if (this.value === "true") {
			useGyroscope = true;
			rotation.origin = false;
			this.value = "false";
			this.innerText = "Gyroscope On";
		} else {
			useGyroscope = false;
			this.value = "true";
			this.innerText = "Gyroscope Off";
		}

	});

	$reset.addEventListener("click", resetOrigin);
})(document, window, null);