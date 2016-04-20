#pragma strict

// Private Vars
private var rb : Rigidbody;
private var gyroscope : GyroscopeController;
private var jumpRestraint : float;
private var isFalling : boolean;

// Configurable Properties
public var moveSpeed : float;
public var moveAcceleration : float;
public var useGyro : boolean;


// Instantiate our gyro and rigidbody
function Start () {
	rb = GetComponent.<Rigidbody>();

	// This needs to be extracted into a Singleton eventually....
    if (useGyro) {
		Input.gyro.enabled = true;
		gyroscope = gameObject.GetComponent(GyroscopeController);
	}

}

// Handles our movements
function FixedUpdate () {
	var moveX : float;
	var moveZ : float;

	if (useGyro) {
		var gyroInput : GyroInputAxis = gyroscope.getDevicePosition();
		moveX = gyroInput.horizontal;
		moveZ = -gyroInput.vertical;
	} else {
		moveX = Input.GetAxis('Horizontal');
		moveZ = -Input.GetAxis('Vertical');
	}

	rb.AddForce(new Vector3(moveX, 0, -moveZ) * moveSpeed);
}