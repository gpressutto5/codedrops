let Pressure = require('pressure');
let frameRate = 29.97;
let video = document.getElementById('video');
let warning = document.getElementById('warning');
let frame = 0;
let playing = false;

let touchFinalFrame = 120;
let videoMaxFrame = 155;
let wasRecentlyCalled = false;

let updateFrame = function () {
  if (playing) {
    return;
  }

  if (frame < 0) {
    frame = 0;
  }

  if (frame > videoMaxFrame) {
    frame = videoMaxFrame;
  }

  if (frame >= touchFinalFrame) {
    playing = true;
    video.play();
  }

  video.currentTime = frame/frameRate;
  console.log(frame);
};

updateFrame();

document.addEventListener('keydown', function(e) {
  e = e || window.event;
  if (e.keyCode === 37) {
    frame--;
    updateFrame();
  }
  else if (e.keyCode === 39) {
    frame++;
    updateFrame();
  }
});

video.addEventListener('ended',function(){
  frame = 0;
  playing = false;
});

Pressure.set('#video', {
  start: function(){
    warning.style.display = 'none';
  },
  change: function(force){
    if (wasRecentlyCalled) {
      return;
    }
    wasRecentlyCalled = true;
    setTimeout(function () {
      wasRecentlyCalled = false;
    }, 80);
    frame = parseInt(Pressure.map(force, 0, 1, 0, touchFinalFrame));
    updateFrame();
  },
  unsupported: function(){
    warning.style.display = 'block';
  }
}, {
  polyfill: false
});
