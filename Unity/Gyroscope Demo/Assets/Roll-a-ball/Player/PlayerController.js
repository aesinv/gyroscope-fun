#pragma strict

// Private Vars
private var rb : Rigidbody;
private var gyro : Gyroscope;
private var jumpRestraint : float;
private var isFalling : boolean;

// Configurable Properties
public var moveSpeed : float;
public var moveAcceleration : float;
public var gyroDeadspace : Vector3;
public var useGyro : boolean;

//** =============================
//	test variables
public var showLabels : boolean;
private var gravityOrigin : Vector3;
private var currentGravity : Vector3;
private var axisH : float;
private var axisV : float;


private function setOrigins() {
	gravityOrigin = Input.gyro.gravity;
	currentGravity = Vector3.zero;
}

// END TEST

// Instantiate our gyro and rigidbody
function Start () {
	rb = GetComponent.<Rigidbody>();

	// This needs to be extracted into a Singleton eventually....
    if (useGyro) {
		gyro = Input.gyro;
		gyro.enabled = true;
	}

	// TEST STUFF
//	positionOrigin = transform.position;
	setOrigins();
}

// Compares the raw gyroscope data to the configured deadspace
// and returns a calculated result.
public function getGyroInput () : Vector3 {
//	var gyroResult : Vector3 = gyro.gravity - gyroDeadspace;
//
//	var step = moveAcceleration * Time.deltaTime;
//	var result : Vector3 = Vector3.MoveTowards(gyroResult, gyro.gravity, step);
//
//	if (result.z < -0.2f) {
//		Debug.Log("result.z pre-smooth : "+ result.z);
//		var zVelocity : float = (moveAcceleration / 10.0f) * Time.deltaTime;
//		result.z = Mathf.SmoothDamp(result.z, gyro.gravity.z, zVelocity, Time.deltaTime);
//		Debug.Log("result.z post-smooth : "+ result.z);
//	}
//
//	return result;
	Debug.Log('Getting gyro input');
	var gravity : Vector3 = Input.gyro.gravity;

	if (Input.touchCount > 0) {
		setOrigins();
	}

	currentGravity = Vector3.Lerp(currentGravity, gravity - gravityOrigin, Time.deltaTime / 0.5f);
	axisH = Mathf.Clamp(currentGravity.x, -1, 1);
	axisV = Mathf.Clamp(
		-1 * (Mathf.Abs(gravityOrigin.y - currentGravity.y) - Mathf.Abs(gravityOrigin.z - currentGravity.z)),
		-1 * Mathf.Abs((gravityOrigin.y + gravityOrigin.z) - 1),
		Mathf.Abs(gravityOrigin.y + gravityOrigin.z) + 1
	);

	var result : Vector3 = new Vector3(axisH, 0, -axisV);

	return result;
}

// Handles our movements
function FixedUpdate () {
	var moveX : float;
	var moveZ : float;

	if (useGyro) {
		var gyroInput : Vector3 = getGyroInput();
		moveX = gyroInput.x;
		moveZ = gyroInput.z;
	} else {
		moveX = Input.GetAxis('Horizontal');
		moveZ = -Input.GetAxis('Vertical');
	}

	rb.AddForce(new Vector3(moveX, 0, -moveZ) * moveSpeed);
}



// TEST
function OnGUI() {
	if (showLabels) {
		GUILayout.Label('Gravity: '+Input.gyro.gravity);
		GUILayout.Label('currentGravity: '+currentGravity);
		GUILayout.Label('gravityOrigin: '+gravityOrigin);
		GUILayout.Label('axisH:'+axisH);
		GUILayout.Label('axisV:'+axisV);
	}
}