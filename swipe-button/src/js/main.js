let $ = require('jquery');

let initialMouse = 0;
let slideMovementTotal = 0;
let mouseIsDown = false;
const slider = $('#slider');

slider.on('mousedown touchstart', function (event) {
  mouseIsDown = true;
  slideMovementTotal = $('#button-background').width() - $(this).width() + 10;
  initialMouse = event.clientX || event.originalEvent.touches[0].pageX;
});

$(document.body, '#slider').on('mouseup touchend', function (event) {
  if (!mouseIsDown)
    return;
  mouseIsDown = false;
  let currentMouse = event.clientX || event.changedTouches[0].pageX;
  let relativeMouse = currentMouse - initialMouse;

  if (relativeMouse < slideMovementTotal) {
    $('.slide-text').fadeTo(300, 1);
    slider.animate({
      left: "-10px"
    }, 300);
    return;
  }
  slider.addClass('unlocked');
  $('#locker').text('lock_outline');
  setTimeout(function () {
    slider.on('click tap', function () {
      if (!slider.hasClass('unlocked'))
        return;
      slider.removeClass('unlocked');
      $('#locker').text('lock_open');
      slider.off('click tap');
    });
  }, 0);
});

$(document.body).on('mousemove touchmove', function (event) {
  if (!mouseIsDown)
    return;

  let currentMouse = event.clientX || event.originalEvent.touches[0].pageX;
  let relativeMouse = currentMouse - initialMouse;
  let slidePercent = 1 - (relativeMouse / slideMovementTotal);

  $('.slide-text').fadeTo(0, slidePercent);

  if (relativeMouse <= 0) {
    slider.css({'left': '-10px'});
    return;
  }
  if (relativeMouse >= slideMovementTotal + 10) {
    slider.css({'left': slideMovementTotal + 'px'});
    return;
  }
  slider.css({'left': relativeMouse - 10});
});
