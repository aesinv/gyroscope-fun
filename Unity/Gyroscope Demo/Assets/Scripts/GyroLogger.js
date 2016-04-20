#pragma strict
import UnityEngine.UI;

public var srcObject : GameObject;
public var logStyle : GUIStyle;
public var rotationText : Text;
public var accelText : Text;

private var currentGravity : Vector3;
private var gravityOrigin : Vector3;
private var axisH : float;
private var axisV : float;

// Use this for initialization
function Start () {
	Input.gyro.enabled = true;
	getValues();
}

function getValues() {
	var control : GyroscopeController = srcObject.GetComponent(GyroscopeController);
	currentGravity = control.currentGravity;
	gravityOrigin = control.gravityOrigin;
	axisH = control.axisH;
	axisV = control.axisV;
}

function LateUpdate() {
	getValues();
	rotationText.text = Input.gyro.rotationRateUnbiased.ToString();
	accelText.text = Input.gyro.userAcceleration.ToString();
}

function OnGUI() {
//	GUILayout.Label('Attitude: '+Input.gyro.attitude, logStyle);
//	GUILayout.Label('Gravity: '+Input.gyro.gravity, logStyle);
//	GUILayout.Label('gravityOrigin: '+gravityOrigin, logStyle);
//	GUILayout.Label('currentGravity: '+currentGravity, logStyle);
//	GUILayout.Label('axisH: '+axisH, logStyle);
//	GUILayout.Label('axisV: '+axisV, logStyle);
}

