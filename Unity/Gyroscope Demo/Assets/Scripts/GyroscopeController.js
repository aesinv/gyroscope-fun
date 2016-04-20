#pragma strict

public var verticalAxisMin : float = -0.6f;
public var verticalAxisMax : float = 0.8f;
public var horizontalAxisMin : float = -1.0f;
public var horizontalAxisMax : float = 1.0f;

private var attitudeOrigin : Quaternion = Quaternion.identity;
private var positionOrigin : Vector3;
static var gravityOrigin : Vector3;
static var currentGravity : Vector3;
static var axisH : float;
static var preAxisV : float;
static var axisV : float;

public class GyroInputAxis {
	public var horizontal : float;
	public var vertical : float;
}

/**
 * Get our initial property values when instantiated
 */
function Start () {
	
	Input.gyro.enabled = true; 			 // Enable the gyroscope
	positionOrigin = transform.position; // Set the absolute origin of the game object
	setOrigins(); 						 // Set the origins of the gyroscope for relative results

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
 * Returns a Quaternion value that represents the devices current
 * rotational position, relative to the rotational origin.
 */
public function getDeviceRotation() {
	return Quaternion.Inverse( Quaternion.Inverse( attitudeOrigin ) * Input.gyro.attitude );
}

/**
 * Returns a Vector3 of the devices current position in 3D space,
 * relative to the origin position.
 */
public function getDevicePosition() {

	var gravity : Vector3 = Input.gyro.gravity;
	var axis : GyroInputAxis = new GyroInputAxis();

	// Set currentGravity to the interpolation of its previous value
	// and the latest gravity report subtracted by the gravity origin.
	currentGravity = Vector3.Lerp( currentGravity, gravity - gravityOrigin, Time.deltaTime / 0.3f );

	// Set the horizontal and vertical axes
	axis.horizontal = Mathf.Clamp( currentGravity.x, horizontalAxisMin, horizontalAxisMax );

	// Get the new vertical axis
	var newAxisV : float = Mathf.Abs( currentGravity.y ) + Mathf.Abs( currentGravity.z );

	// If the current gravity has a negative y value, inverse the new axis smoothly
	if (currentGravity.y < 0) {
		preAxisV = Mathf.MoveTowards(preAxisV, -1 * newAxisV, Time.deltaTime / 0.5f);
	} else {
		preAxisV = newAxisV;
	}

	// Clamp the axis to certain boundaries
	axis.vertical = Mathf.Clamp( preAxisV, verticalAxisMin, verticalAxisMax );

	return axis;
}

function Update () {
	// Reset our origins if the user touches the screen
	// or the `attitudeOrigin` hasn't been set yet
	if ( Input.touchCount > 0 || attitudeOrigin == Quaternion.identity ) {
		setOrigins();
	}
}