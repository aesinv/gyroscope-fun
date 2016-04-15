#pragma strict
import UnityEngine.UI;

enum GyroType {attitude, gravity}
public var gyroMode : GyroType;
public var gravityMovementRate : float;
public var valueLabel : Text;

private var attitudeOrigin : Quaternion = Quaternion.identity;
private var positionOrigin : Vector3;
static var gravityOrigin : Vector3;
static var currentGravity : Vector3;
static var axisH : float;
static var axisV : float;

/**
 * Get our initial property values when instantiated
 */
function Start () {
	// Enable the gyroscope
	Input.gyro.enabled = true;

	// Set the absolute origin of the game object
	positionOrigin = transform.position;

	// Set the origins of the gyroscope for relative results
	setOrigins();
}

/**
 * Sets the origins of the devices orientation so we get relative movement
 * as opposed to absolute movements based on 1:1 translation of gyroscope
 * data and the game objects transform.
 */
private function setOrigins() {
	// The attitude represents the rotational orientation in 3d space
	attitudeOrigin = Input.gyro.attitude;

	// The gravity is the acceleration vector of gravity on the device
	// ie. the force of gravity on the device. Interchangeable with
	// `Input.acceleration`
	gravityOrigin = Input.gyro.gravity;

	// Set the "Current Gravity" to zero.
	currentGravity = Vector3.zero;
}

/**
 * Calculate our new transform values.
 */
function LateUpdate () {
	var attitude : Quaternion = Input.gyro.attitude;
	var gravity : Vector3 = Input.gyro.gravity;

	// If the user has touched the screen (or we detect the attitudeOrigin has not been set)
	// reset the origins before continuing.
	if (Input.touchCount > 0 || attitudeOrigin == Quaternion.identity) {
		setOrigins();
	}

	// Device Attitude gets multiplied by the inverse of its origin and applied as a localRotation.
	if (gyroMode == GyroType.attitude) {
		transform.localRotation = Quaternion.Inverse(attitudeOrigin) * attitude;
		valueLabel.text = attitude.ToString();
	} else {
		// Set currentGravity to the interpolation of its previous value
		// and the latest gravity report subtracted by the gravity origin.
		currentGravity = Vector3.Lerp(currentGravity, gravity - gravityOrigin, Time.deltaTime / 0.5f);

		// Set the horizontal and vertical axes
		axisH = Mathf.Clamp(currentGravity.x, -1, 1);
		axisV = Mathf.Clamp(
			// To prevent dead spots the vertical axis is the inverse of the difference between the y and z coordinates
			-1 * ((gravityOrigin.y - currentGravity.y) - (gravityOrigin.z - currentGravity.z)),
			-1 * Mathf.Abs((gravityOrigin.y + gravityOrigin.z) - 1),
			Mathf.Abs(gravityOrigin.y + gravityOrigin.z) + 1
		);

		// Update the position with our new axes, multiplied by 
		// a modifier for the purpose of the gyroscope demo.
		var pos : Vector3 = transform.position;
		pos.x = positionOrigin.x + (axisH);
		pos.y = positionOrigin.y + (axisV * 0.25);
		transform.position = pos;
		valueLabel.text = gravity.ToString();
	}
}

///**
// * Log to the screen
// */
//function OnGUI() {
//	GUILayout.Label('Attitude: '+Input.gyro.attitude, logStyle);
//	GUILayout.Label('Gravity: '+Input.gyro.gravity, logStyle);
//	GUILayout.Label('currentGravity: '+currentGravity, logStyle);
//	GUILayout.Label('gravityOrigin: '+gravityOrigin, logStyle);
//	GUILayout.Label('axisH: '+axisH, logStyle);
//	GUILayout.Label('axisV: '+axisV, logStyle);
//}