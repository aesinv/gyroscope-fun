(function (document, window) {
	var rateThreshold = 3,
		rotation = {
			rate : 0,
			value : 0,
			origin: false,
		};

	var scrollWindow = function () {
		window.scrollBy(0, rotation.value);
	};

	var handleMotion = function (event) {
		var rate = event.rotationRate;
		
		if (rate < rateThreshold && rate > -rateThreshold) {
			rotation.rate = 0;
		} else {
			rotation.rate = 1;
		}

		return true;
	};

	var handleRotation = function (event) {
		var axis = event.beta;

		if (!rotation.origin && rotation.rate == 0) {
			rotation.origin = axis;
		}

		if (rotation.rate == 1) {
			rotation.value = rotation.origin - axis;
		} else {
			rotation.value = 0;
		}

		scrollWindow();
		return true;
	};

	window.addEventListener("devicemotion", handleMotion);
	window.addEventListener("devicerotation", handleRotation);
})(document, window, null);