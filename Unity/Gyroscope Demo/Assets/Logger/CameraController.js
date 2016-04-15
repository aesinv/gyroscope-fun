#pragma strict

public var showLabels : boolean;
private var origin : Quaternion = Quaternion.identity;

function Start () {
    Input.gyro.enabled = true;
    origin = Input.gyro.attitude;
}

function Update() {
	if (Input.touchCount > 0 || origin == Quaternion.identity) {
		origin = Input.gyro.attitude;
	}

	transform.localRotation = Quaternion.Inverse(Quaternion.Inverse(origin) * Input.gyro.attitude);
}

function OnGUI() {
	if (showLabels) {
	    var attitude : Quaternion = Input.gyro.attitude;
	    
	    GUILayout.Label("Origin: "+ origin.eulerAngles);
	    GUILayout.Label("Gyroscope: "+ attitude.eulerAngles);
	    GUILayout.Label("Inverse Gyroscope:"+ Quaternion.Inverse(attitude));
	    GUILayout.Label("localRotation: "+ transform.localRotation.eulerAngles);
	}
}