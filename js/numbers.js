
var numArray = [];
var Totalflag=false;


window.onblur = function () {
	document.title='Вернись!'
	Totalflag=false;
}
window.onfocus = function () {
	document.title='Birds'
	Totalflag=true;
}


$(document).ready(function (event) {


	var mainAudio = document.getElementsByTagName("audio")[15];
	//mainAudio.play();

	var finAudio = document.getElementsByTagName("audio")[16];


	$('#modal_close, #overlay').click( function(){ 
		$('#modal_form')
		.animate({opacity: 0, top: '45%'}, 200, 
			function(){ 
				$(this).css('display', 'none'); 
				$('#overlay').fadeOut(400); 
				mainAudio.play();
				finAudio.pause();
				Totalflag=true;
				
			}
			);
	});

	$('#buttom').click(function(){ 
		$('.congrats').slideUp();
		Totalflag=true;
		score = 0;
	});

	$('#score').click(function(){
		$('.del').html('');
		$('.congrats').slideDown();
	})


	fillArray();

	var starCount =0;
	function stars() { 

		starCount++;
		if(starCount<10){
			var rand  =  getRandom();
			var rand2 = randomInt(10, 100);
			var rand3 = randomInt(1, 50);
			$('.night').append('<div class="star" style="top: ' + rand*rand2 + 'px; left: ' + rand2*rand3 + 'px"><div id="star"></div></div>');
		}
	}

	function adding() { 
		if(Totalflag==true){
			var rand  =  getRandom();
			if($('.num' + rand).length) { //exist
				$('.num' + rand).remove();
			}

			$('.numbers').append('<img src="img/'+ rand + '.png" class="num'+ rand + ' food" onload="move(this)">');
			$('.num'+rand).css( {top: randomInt(10, 400), left:  window.screen.width });
		}
	};


	var addNumbers = setInterval(adding, 1800);


	function addingNegative() { 
		if(Totalflag==true){
			var rand  =  getRandom();
			if($('.numNegative' + rand).length) { //exist
				$('.numNegative' + rand).remove();
			}

			$('.numbers').append('<img src="img/'+ rand + 'm.png" class="numNegative'+ rand + ' food" onload="move(this)">');
			$('.numNegative'+rand).css( {top: randomInt(10, 400), left:  window.screen.width });
		}
	};

	var addNegativeNumbers = setInterval(addingNegative, 4200);
	
	
	function addingRed() { 
		if(Totalflag==true){
			var rand  =  getRandom();
			if($('.numRed' + rand).length) { //exist
				$('.numRed' + rand).remove();
			}
			
			$('.numbers').append('<div id="Red' + rand + '" class="numRed'+ rand + '"><h4>' + rand + '</h4></div');
			$('.numRed'+rand).css( {top: randomInt(10, 400), left:  window.screen.width });
			moveColor($('#Red' + rand));
		}
	};

	var addred = setInterval(addingRed, 20000);
	

	function addingBlue() { 
		if(Totalflag==true){
			var rand  =  getRandom();
			if($('.numBlue' + rand).length) { //exist
				$('.numBlue' + rand).remove();
			}
			
			$('.numbers').append('<div id="blue' + rand + '" class="numBlue'+ rand + '"><h4>' + rand + '</h4></div');
			$('.numBlue'+rand).css( {top: randomInt(10, 400), left:  window.screen.width });
			moveColor($('#blue' + rand));
		}
	};

	var addBlue = setInterval(addingBlue, 10000);

	function addingPurple() { 
		if(Totalflag==true){
			var rand  =  getRandom();
			if($('.numPurple' + rand).length) { //exist
				$('.numPurple' + rand).remove();
			}
			
			$('.numbers').append('<div id="purple' + rand + '" class="numPurple'+ rand + '"><h4>' + rand + '</h4></div');
			$('.numPurple'+rand).css( {top: randomInt(10, 400), left:  window.screen.width });
			moveColor($('#purple' + rand));
		}
	};


	var addPurple = setInterval(addingPurple, 12000);

	function addingYellow() { 
		if(Totalflag==true){
			var rand  =  getRandom();
			if($('.numYellow' + rand).length) { //exist
				$('.numYellow' + rand).remove();
			}
			
			$('.numbers').append('<div id="yellow' + rand + '" class="numYellow'+ rand + '"><h4>' + rand + '</h4></div');
			$('.numYellow'+rand).css( {top: randomInt(10, 400), left:  window.screen.width });
			moveColor($('#yellow' + rand));
		}
	};


	var addYellow = setInterval(addingYellow, 9000);


	var score = 0;
	var lavel = 10;


	setInterval(function() { //перевірка чи з'їв
		for (var i = 10; i >= 0; i--) {    
			if($('.num' + i).length > 0){
				if(collides(i)){
					score+=i;
					if(score>500){
						score = 0;
						$('#overlay').fadeIn(400, 
							function(){ 
								$('#modal_form') 
								.css('display', 'block') 
								.animate({opacity: 1, top: '50%'}, 200); 
								mainAudio.pause();
								finAudio.play();
								flag=false;
							});
					}

					$('.num' + i).css('width','150').css('height', '150').css('opacity', '0.1');
					$('.score h').html(score);
					var audio = document.getElementsByTagName("audio")[randomInt(0,3)];
					audio.play();
					/*
					if(score>lavel){
						lavel *= 3;
						clearInterval(addNumbers);
						var addNumbers = setInterval(adding, lavel*50)
						clearInterval(addNegativeNumbers);
						var addNegativeNumbers = setInterval(addingNegative, lavel*50)
						console.log('nnew lavel!' + lavel)
					}
					*/
					
				}
			}

			if($('.numNegative' + i).length > 0){
				if(collidesColor($('.numNegative' + i))){
					score-=i;
					$('.numNegative' + i).css('width','150').css('height', '150');
					$('.numNegative' + i).css('opacity', '0.1');
					$('.score h').html(score);
					var audio = document.getElementsByTagName("audio")[randomInt(4,9)];
					audio.play();
				}
			}
			if($('.numRed' + i).length > 0){
				if(collidesColor($('.numRed' + i))){
					score = 0;
					$('.score h').html(score);
					$('.numRed' + i).css('width','150').css('height', '150').css('opacity', '0');
					var audio = document.getElementsByTagName("audio")[randomInt(10,11)];
					audio.play();
				}
			}
			if($('.numBlue' + i).length > 0){
				if(collidesColor($('.numBlue' + i))){
					score+=i;
					$('.score h').html(score);
					document.getElementById("picture").src = "img/bird.gif";
					setTimeout('document.getElementById("picture").src = "img/birdsmall.gif"',3000);
					$('.numBlue' + i).css('width','150').css('height', '150').css('opacity', '0');
					var audio = document.getElementsByTagName("audio")[randomInt(12,13)];
					audio.play();
				}
			}

			if($('.numPurple' + i).length > 0){
				if(collidesColor($('.numPurple' + i))){
					score+=i;
					$('.score h').html(score);
					$('.numPurple' + i).css('opacity', '0');
					$('.container').css('background-color','#512DA8');
					$('.night').css('visibility', 'visible');
					var star = setInterval(stars, 100);
					setTimeout(" $('.container').css('background-color','#00BCD4');$('.night').css('visibility', 'hidden').html('');",10000);
					starCount = 0;
					$('.numPurple' + i).css('width','150').css('height', '150').css('opacity', '0');
					var audio = document.getElementsByTagName("audio")[3];
					audio.play();
				}
			}

			if($('.numYellow' + i).length > 0){
				if(collidesColor($('.numYellow' + i))){
					score+=i;
					$('.score h').html(score);
					movethief($('.thief'));
					$('.numYellow' + i).css('width','150').css('height', '150').css('opacity', '0');	
					var audio = document.getElementsByTagName("audio")[randomInt(12,13)];
					audio.play();
				}
			}
			
		}
	}, 60);


function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};


function getRandom(){
	if(IsEmpty()) {
		fillArray();
	}else
	{}
	while(true){
		var rand = randomInt(0, 9);
		if(IsFree(rand)){
			delElem(rand);
			return rand;
		}
	}

}

function IsFree(elem){
	flag = false;
	for (var i = 0; i <10; i++) {
		if(numArray[i]!=elem){
			flag=false;
		}
		else{
			return true;
		}
	};
	return flag;
}

function fillArray(){
	for (var i = 0; i <10; i++) {
		numArray[i]=i;
	};

};

function delElem(elem){
	for (var i = 0; i <10; i++) {
		if(numArray[i]==elem){
			numArray[i]=-1;
		};
	};
};

	function IsEmpty(){ //пустий якщо всы -1; пустий -тру

		var emptyCount=0;
		for (var i = 0; i <10; i++) {
			if(numArray[i]==-1){
				emptyCount++;
			}
		};

		if(emptyCount==10)
			return true;
		return false;
	}

	function collides(i)
	{
		var a = $('#player');
		var offsetA = a.offset();
		var b = $('.num' + i);
		var offsetB = b.offset();

		if (offsetA.left < offsetB.left &&
			offsetA.left + a.width() > offsetB.left + b.width() &&
			offsetA.top < offsetB.top  &&
			offsetA.top + a.height() > offsetB.top + b.height()
			) return true;
	}

function collidesColor(b)
{
	var a = $('#player');
	var offsetA = a.offset();
	var offsetB = b.offset();

	if (offsetA.left < offsetB.left &&
		offsetA.left + a.width() > offsetB.left + b.width() &&
		offsetA.top < offsetB.top  &&
		offsetA.top + a.height() > offsetB.top + b.height()
		) return true
}



});


function move(elem) {

	var left=window.screen.width;
    function frame() { // функция для отрисовки

    	left=left-2;;
    	elem.style.left = left + 'px' 
    	if (left == -130) { 
      		clearInterval(id); // завершить анимацию
      	}

      }

  var id = setInterval(frame, 10) // рисовать каждые 10мс

}


function moveColor(elem){

	if(elem.length) { //exist
		elem.css({left:window.screen.width});
		var left0=window.screen.width;
		function colormove(){
			left0=left0-3;
			elem.offset({left:left0})
			if (left0 == -130) { 
      		clearInterval(mColor); // завершить анимацию
      	}

      }
      var mColor = setInterval(colormove, 10);
  }
}

function movethief(elem){

	var left0 = -200;
	var top0 = 0;
	function moveT(){
		left0=left0+10;
		top0=200+Math.sin(1/3*(left0*Math.PI/180))*100;
		elem.offset({left:left0})
		elem.offset({top:top0})
		
		for (var i = 10; i >= 0; i--) {   
			if($('.num' + i).length > 0){
				if(collidesThief(i)){
					$('.num' + i).css('width','150').css('height', '150').css('opacity', '0.1');

				}

				if($('.numBlue' + i).length > 0){
					if(collidesThiefColor($('.numBlue' + i))){
						$('.numBlue' + i).css('width','150').css('height', '150').css('opacity', '0');
						console.log('collided blue');
					}
				}

				if($('.numPurple' + i).length > 0){
					if(collidesThiefColor($('.numPurple' + i))){
						$('.numPurple' + i).css('width','150').css('height', '150').css('opacity', '0');
						console.log('collided Purpure');
					}
				}

			}
		}

		if (left0 > window.screen.width + 150) { 
			clearInterval(mt);
			elem.offset({left:-200})
			elem.offset({top: -200})
		}
	}
	function collidesThiefColor(b)
	{
		var a = $('.thief');
		var offsetA = a.offset();
		var offsetB = b.offset();

		if (offsetA.left < offsetB.left &&
			offsetA.left + a.width() > offsetB.left + b.width() &&
			offsetA.top < offsetB.top  &&
			offsetA.top + a.height() > offsetB.top + b.height()
			) return true
	}
var mt = setInterval(moveT,20);
}

function collidesThief(i)
{
	var a = $('.thief');
	var offsetA = a.offset();
	var b = $('.num' + i)
	var offsetB = b.offset();

	if (offsetA.left < offsetB.left &&
		offsetA.left + a.width() > offsetB.left + b.width() &&
		offsetA.top < offsetB.top  &&
		offsetA.top + a.height() > offsetB.top + b.height()
		) return true
}

function collidesThiefColor(i)
{
	var a = $('.thief');
	var offsetA = a.offset();
	var offsetB = b.offset();

	if (offsetA.left < offsetB.left &&
		offsetA.left + a.width() > offsetB.left + b.width() &&
		offsetA.top < offsetB.top  &&
		offsetA.top + a.height() > offsetB.top + b.height()
		) return true
}
