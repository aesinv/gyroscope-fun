#pragma strict

private var gyroscope : GyroscopeController;

function Start () {
    gyroscope = gameObject.GetComponent(GyroscopeController);
}

function Update() {
	transform.localRotation = gyroscope.getDeviceRotation();
}