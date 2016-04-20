#pragma strict
import UnityEngine.SceneManagement;

public var loadingScreen : GameObject;


function LoadScene(level : int) {
	loadingScreen.SetActive(true);
	SceneManager.LoadScene(level);
}