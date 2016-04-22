(function (document, window) {
  var state = {};
  var els = {
    type : document.getElementById("eventType"),
    acceleration : document.getElementById("acceleration"),
    gravity : document.getElementById("gravity"),
    rotation : document.getElementById("rotationRate"),
    alpha : document.getElementById("alpha"),
    beta : document.getElementById("beta"),
    gamma : document.getElementById("gamma")
  };

  function getVector3String(x, y, z) {
    return "<li>X: "+ x +"</li>"
          +"<li>Y: "+ y +"</li>"
          +"<li>Z: "+ z +"</li>";
  }

  function updateDom() {
    var s, el;
    
    for (var key in state) {
      s = state[key];
      el = els[key];
      
      if (key == 'acceleration' || key == 'gravity') {
        el.innerHTML = getVector3String(s.x, s.y, s.z);
      } else if (key == 'rotation') {
        el.innerHTML = getVector3String(s.beta, s.gamma, s.alpha);
      } else {
        el.innerText = s;
      }
      
      i = null;
      el = null;
    }
  }

  function handleMotion(event) {
    state.type          = event.type;
    state.acceleration  = event.acceleration;
    state.gravity       = event.accelerationIncludingGravity;
    state.rotation      = event.rotationRate;
    updateDom();
  }

  function handleOrientation(event) {
    state.alpha = event.alpha;
    state.beta  = event.beta;
    state.gamma = event.gamma;
  }

  window.addEventListener("devicemotion", handleMotion);
  window.addEventListener("deviceorientation", handleOrientation);
})(document, window, null);