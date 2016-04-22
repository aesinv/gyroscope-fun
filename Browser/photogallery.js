(function (document, window) {
  var $images = document.getElementsByClassName('img'),
      cooldown = false,
      active = {},
      bufferX, bufferY;
  
  if (/Android/i.test(navigator.userAgent)) {
    bufferX = 2;
    bufferY = 3;
  } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    bufferX = 80;
    bufferY = 70;
  }


  var getNextImage = function(i) {
    if (!active.hasOwnProperty('index')) {
      active.index = 0;
    } else {
      active.index = Math.min(Math.max(active.index + i, 0), $images.length - 1);
    }
    
    active.img = $images[active.index];
    if (i > 0) {
      active.img.classList.add('active');
    } else {
      active.img.classList.remove('active');
    }
  };
  
  var throwImage = function (direction) {
    active.img.classList.add('throw-'+direction);
    active.img.classList.remove('active');
    cooldown = true;
    
    window.setTimeout(function() {
      cooldown = false;
    }, 1000);
  };
  
  var retrieveImage = function () {
    getNextImage(-1);
    active.img.classList.remove('throw-right', 'throw-left');
    active.img.classList.add('active');
    cooldown = true;
    
    window.setTimeout(function() {
      cooldown = false;
    }, 1000);
  };

  function handleMotion(event) {
    var rotation  = event.rotationRate;
    
    // document.getElementById('alpha').innerText =  Math.round(rotation.alpha);
    // document.getElementById('beta').innerText = Math.round(rotation.beta);
    // document.getElementById('gamma').innerText = Math.round(rotation.gamma);
    
    if (!cooldown) {
      console.log('[', Math.round(rotation.alpha), ',', Math.round(rotation.beta), ',', Math.round(rotation.gamma), ']');

      if (rotation.beta > bufferX) {
        console.log('throwing right');
        throwImage('right');
        getNextImage(1);
      }

      if (rotation.beta < -bufferX) {
        console.log('throwing left');
        throwImage('left');
        getNextImage(1);
      }

      if (rotation.alpha > bufferY) {
        console.log('retrieving image');
        retrieveImage();
      }

      console.log('Device not rotating fast enough.');
    }
  };
  
  getNextImage(1);
  window.addEventListener("devicemotion", handleMotion);

})(document, window, null);