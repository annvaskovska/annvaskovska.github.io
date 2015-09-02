
$(document).ready(function(){

	$('.bridge').hide();

	$('.cloud1').hide();
	$('.cloud2').hide();
	$('.cloud3').hide();
	$('.cloud4').hide();

	$('.stick1').hide();
	$('.stick2').hide();
	$('.stick3').hide();
	$('.stick4').hide();
	$('.stick5').hide();
	$('.stick6').hide();
	$('.stick7').hide();
	$('.stick8').hide();
	$('.stick9').hide();
	$('.stick10').hide();
	$('.stick11').hide();
	$('.stick12').hide();
	$('.stick13').hide();
	$('.stick14').hide();
	$('.building1').hide();
	$('.building2').hide();
	$('.building3').hide();
	$('.building4').hide();

	$('.river').hide();
	$('.boat1').hide();
	$('.boat2').hide();
	$('.boat3').hide();

	$('.words').hide();
	
	$('.sun').hide().fadeIn('slow').delay(2000);

	var c1 = setTimeout ( function(){
		$('.cloud1').hide().fadeIn('slow');
	}, 600)
	var c2 = setTimeout ( function(){
		$('.cloud2').hide().fadeIn('slow');
	}, 1000)
	var c3 = setTimeout ( function(){
		$('.cloud3').hide().fadeIn('slow');
	}, 1400)
	var c4 = setTimeout ( function(){
		$('.cloud4').hide().fadeIn('slow');
	}, 1800)



	var my = setTimeout ( function(){
		$('.bridge').fadeIn('slow');
		$('.bridge-border-left').hide();
		$('.bridge-border').hide();
		$('.bridge-border-right').hide();
		$('.sticks').hide();

	}, 2000)

	var br = setTimeout ( function(){
		$('.bridge-border-left').fadeIn('slow');
		$('.bridge-border').fadeIn('slow');
		$('.bridge-border-right').fadeIn('slow');

	}, 3000)

	var s1 = setTimeout(function(){
		$('.stick1').fadeIn();
	},3500)
	var s2 = setTimeout(function(){
		$('.stick2').fadeIn();
	},3750)
	var s3 = setTimeout(function(){
		$('.stick3').fadeIn();
	},4000)
	var s4 = setTimeout(function(){
		$('.stick4').fadeIn();
	},4250)
	var s5 = setTimeout(function(){
		$('.stick5').fadeIn();
	},4500)
	var s6 = setTimeout(function(){
		$('.stick6').fadeIn();
	},4750)
	var s7 = setTimeout(function(){
		$('.stick7').fadeIn();
	},5000)
	var s8 = setTimeout(function(){
		$('.stick8').fadeIn();
	},5250)
	var s9 = setTimeout(function(){
		$('.stick9').fadeIn();
	},5500)
	var s10 = setTimeout(function(){
		$('.stick10').fadeIn();
	},5750)
	var s11 = setTimeout(function(){
		$('.stick11').fadeIn();
	},6000)
	var s12 = setTimeout(function(){
		$('.stick12').fadeIn();
	},6250)
	var s13 = setTimeout(function(){
		$('.stick13').fadeIn();
	},6500)
	var s14 = setTimeout(function(){
		$('.stick14').fadeIn();
	},6750)

	var b1 = setTimeout(function(){
		$('.building1').fadeIn();
	},7000)
	var b2 = setTimeout(function(){
		$('.building2').fadeIn();
	},7500)
	var b3 = setTimeout(function(){
		$('.building3').fadeIn();
	},8000)
	var b4 = setTimeout(function(){
		$('.building4').fadeIn();
	},8500)

	var r = setTimeout(function(){
		$('.river').fadeIn();
	},9000)

	var boat = setTimeout(function(){
		$('.river').fadeIn();
	},9000)


	var boat = setTimeout(function(){
		$('.boat1').fadeIn();
	},9500)


	var boat = setTimeout(function(){
		$('.boat2').fadeIn();
	},10000)

	var boat = setTimeout(function(){
		$('.boat3').fadeIn();
		move(document.getElementById('boat'));
	},10500)

	var words = setTimeout(function(){
		$('.words').fadeIn();
	},10500)

});


function move(elem) {

	var left=530;
	function frame() { 

		left=left+1;;
		elem.style.left = left + 'px' 
		if (left == 700) { 
			clearInterval(id); 
			moveAgain(document.getElementById('boat'));
		}

	}

	var id = setInterval(frame, 80)

}

function moveAgain(elem){
	var left=700;
	function frame() { 

		left=left-1;;
		elem.style.left = left + 'px' 
		if (left == 530) { 
			clearInterval(id); 
			move(document.getElementById('boat'));
		}

	}

	var id = setInterval(frame, 80)
}

