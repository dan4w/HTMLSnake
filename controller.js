/**
 * Controls for the HTML5 Snake game.
 *
 *
 * @Author: Daniel Forwood
 * @Date:   2018-06-29T19:13:18-07:00
 * @Last modified by:   Daniel Forwood
 * @Last modified time: 2018-07-03T14:18:01-07:00
 * @Version: 1.0
 */

var keyState = {};

//Without both onkeyup and onkeydown, inputting 2 keys really quick won't register one of them
window.onkeyup = window.onkeydown = function (e){
  e = e || event;
  keyState[e.keyCode] = e.type == 'keydown';
  e.preventDefault();

  var keys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    27: 'restart'
  }

  var dx = 0;
  var dy = 0;

  switch (keys[e.keyCode]){
    case 'left':
      dx = -1;
      break;
    case 'up':
      dy = 1;
      break;
    case 'down':
      dy = -1;
      break;
    case 'right':
      dx = 1;
      break;
    case 'restart':
      console.log("WOW");
      render();
      init();
      break;
    default:
      return;
  }


  if(dx*speed.x != 0 || dy * speed.y != 0){
    return;
  }
  newSpeed = {
    x: dx,
    y: dy
  };
};
