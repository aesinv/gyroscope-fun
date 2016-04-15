#pragma strict

public var playerObj : GameObject;

private var playerCtrl : PlayerController;
private var cameraOffset : Vector3;

// Configurable Constants
// - Camera Movement
public var cameraTilt : float;

// Store our Player Controller and dictate our camera offset
function Start () {
	playerCtrl = playerObj.GetComponent(PlayerController);
	cameraOffset = transform.position - playerObj.transform.position;
	transform.rotation = Quaternion.Euler(27.0f, 0.0f, 0.0f);
}

// Determine whether we need to move on a rotational axis
private function getRotationAxis (velocity : float) {
	if (velocity > 0.0f) {
		return 1;
	} else if (velocity < 0.0f) {
		return -1;
	} else {
		return 0;
	}
}

// Use the PlayerControllers gyroscope input function to manuever the camera
function LateUpdate () {
	var horizontalVelocity : float;
	var verticalVelocity : float;
	if (playerCtrl.useGyro) {
		var gyroInput : Vector3 = playerCtrl.getGyroInput();
		horizontalVelocity = gyroInput.x;
		verticalVelocity = gyroInput.z;
	} else {
		horizontalVelocity = Input.GetAxis('Horizontal');
		verticalVelocity = Input.GetAxis('Vertical');
	}

	var tiltMovement : Vector3 = new Vector3(horizontalVelocity / -cameraTilt, 0.0f, verticalVelocity / cameraTilt);
	var movement : Vector3 = (playerObj.transform.position + cameraOffset) + tiltMovement;

	var yRotation : int = getRotationAxis(verticalVelocity);
	var xRotation : int = getRotationAxis(horizontalVelocity);

	transform.position = movement;
	transform.LookAt(playerObj.transform);
}