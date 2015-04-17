
$(document).ready(function() {
  

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var player = $('#player'); 

  var mx,my; 
  var speed=10; 
  var ObjWidth = parseInt(player.css('width'), 10); 
  var ObjHeight = parseInt(player.css('height'), 10); 
  $.fn.rotate = function (radian) {

    $(this).css({
      '-webkit-transform' : 'rotate(' + radian + 'rad)',
      '-moz-transform' : 'rotate(' + radian + 'rad)',
      '-ms-transform' : 'rotate(' + radian + 'rad)',
      'transform' : 'rotate(' + radian + 'rad)'
    });

  };


  $(document).on('mousemove',function (e) {
    mx = e.pageX;
    my = e.pageY;
  });


  setInterval(function () { 

   var ObjTop = parseInt(player.css('top'), 10);
   var ObjLeft = parseInt(player.css('left'), 10);

   var a = my - (ObjTop + ObjHeight/2); 
   var b = mx - (ObjLeft + ObjWidth/2); 
   var len = Math.sqrt(a * a + b * b);
   if(len < 10) {
    return false;
  }
  if (len) {

   a = a / len * speed; 
   b = b / len * speed;
 }

 ObjTop+=a;
 ObjLeft+=b;
 player.css('left', ObjLeft  + 'px');
 player.css('top', ObjTop + 'px');
 var angle = Math.atan2(a, b);
 //player.rotate(angle); 
}, 30);
});