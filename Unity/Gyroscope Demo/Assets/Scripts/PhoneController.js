#pragma strict
import UnityEngine.UI;

enum GyroType {attitude, gravity}
public var gyroMode : GyroType;
public var valueLabel : Text;

private var gyroscope : GyroscopeController;

//private var attitudeOrigin : Quaternion = Quaternion.identity;
private var positionOrigin : Vector3;
//static var gravityOrigin : Vector3;
//static var currentGravity : Vector3;
//static var axisH : float;
//static var preAxisV : float;
//static var axisV : float;

/**
 * Get our initial property values when instantiated
 */
function Start () {
	// Enable the gyroscope
	Input.gyro.enabled = true;
	gyroscope = gameObject.GetComponent(GyroscopeController);
	// Set the absolute origin of the game object
	positionOrigin = transform.position;

}

/**
 * Calculate our new transform values.
 */
function LateUpdate () {

	// Device Attitude gets multiplied by the inverse of its origin and applied as a localRotation.
	if (gyroMode == GyroType.attitude) {

		transform.localRotation = gyroscope.getDeviceRotation();
		valueLabel.text = Input.gyro.attitude.ToString();

	} else {

		// Update the position with our new axes, multiplied by 
		// a modifier for the purpose of the gyroscope demo.
		var inputAxis : GyroInputAxis = gyroscope.getDevicePosition();
		Debug.Log(inputAxis);
		var pos : Vector3 = transform.position;
		pos.x = positionOrigin.x + (inputAxis.horizontal);
		pos.y = positionOrigin.y + (inputAxis.vertical * 0.25);
		transform.position = pos;
		valueLabel.text = Input.gyro.gravity.ToString();

	}
}

/**
 * Log to the screen
 */
function OnGUI() {
//	GUILayout.Label('Attitude: '+Input.gyro.attitude);
//	GUILayout.Label('Gravity: '+Input.gyro.gravity);
//	GUILayout.Label('currentGravity: '+currentGravity);
//	GUILayout.Label('gravityOrigin: '+gravityOrigin);
//	GUILayout.Label('axisH: '+axisH);
//	GUILayout.Label('axisV: '+axisV);
//	GUILayout.Label('preAxisV: '+preAxisV);
}