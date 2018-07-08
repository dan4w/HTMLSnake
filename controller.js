/**
 * Controls for the HTML5 Snake game.
 *
 *
 * @Author: Daniel Forwood
 * @Date:   2018-06-29T19:13:18-07:00
 * @Last modified by:   Daniel Forwood
 * @Last modified time: 2018-09-24T23:25:01-07:00
 * @Version: 1.0.1
 */

var keyState = {};

console.log("control loaded");
//Controls for the snake
window.onkeydown = function (e){ // Action based on keydown
console.log("Preseed");
  e = e || event;
  keyState[e.keyCode] = e.type == 'keydown';
  e.preventDefault();

  //key codes dictionary
  var keys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    27: 'restart'
  }


  var dx = 0;
  var dy = 0;

  // key detection and sets new speed (direction)
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
      integrate();
      break;
    default:
      return;
  }

  /* If the new direction is in the x-axis and the direction is already moving in the x direction,
  * then there will be an issue. The issue is, for example, if the snake is moving down, but the command
  * is to go up, then it intersects with itself and the user will lose.
  */
  if(dx*speed.x != 0 || dy * speed.y != 0){
    return;
  }


  //Instead of using speed variable, we use new speed just so that there will not be any conflicts
  // during comparison in the above function. The values might be the same if we change speed and then compare
  // it with itself.

  newSpeed = {
    x: dx,
    y: dy
  };

};
