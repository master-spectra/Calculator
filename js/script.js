'use strict';
let slideIndex 	= 1,
	img 		= document.querySelectorAll('img'),
	btnPrev 	= document.querySelector('.prev'),
	btnNext 	= document.querySelector('.next'),
	dots 		= document.querySelectorAll('.dot'),
	dotsWrap	= document.querySelector('.dots');

img.forEach((elem) => (elem.classList.remove('animate-lists')));
img[slideIndex - 1].classList.add('animate-lists');

function showSlides(n) {
	if (n > img.length) {
		slideIndex = 1;
	} else if (n < 1) {
		slideIndex = img.length;
	};

	img.forEach((elem) => (elem.classList.remove('animate-lists')));
	dots.forEach((elem) => (elem.style.background = "transparent"));

	dots[slideIndex - 1].style.background = "#000";
	img[slideIndex - 1].classList.add('animate-lists');
};

function plusSlides(n) {
	showSlides(slideIndex += n); 
};

function misunSlides(n) {
	showSlides(slideIndex -= n);
};

function currentSlide(n) {
	showSlides(slideIndex = n);
}

btnNext.addEventListener('click', function() {
	plusSlides(1);
});

btnPrev.addEventListener('click', function() {
	misunSlides(1);
});

dotsWrap.addEventListener('click', function(e) {
	for (let i = 0; i < dots.length + 1; i++) {
		if (e.target.classList.contains('dot') && e.target == dots[i - 1]) {
			currentSlide(i);
		}
	}
});


// calc 
let inputFirst = document.querySelector('.first-input'),
	inputSecond = document.querySelector('.second-input'),
	selectBase = document.querySelector('.select-base'),
	options = document.querySelectorAll('option'),
	total = document.querySelector('.total'),
	request,
	btnSend = document.querySelector('.submit');

function calc() {
	let totalMoney,
		people,
		days,
		base;

	inputFirst.addEventListener('input', function() {
		people = inputFirst.value;
		setSetting();
	});
 
	inputSecond.addEventListener('input', function() {
		days = +inputSecond.value;
		setSetting();
	});

	function select() {
		base = selectBase.options[selectBase.selectedIndex].textContent.toLowerCase();
		setSetting();	
	};

	select();

	selectBase.addEventListener('click', function() {
		base = selectBase.options[selectBase.selectedIndex].textContent.toLowerCase();
		setSetting();
	});

	function setSetting() {
		request = new XMLHttpRequest();

	    request.open('GET', 'js/current.json');
	    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	    request.send(); 

	    request.addEventListener('readystatechange', function() {
	    	if (request.readyState === 4 && request.status == 200) {
	    		let data = JSON.parse(request.response);

	    		if (people != null && days != null) {
	    			if (base == 'америка') {
						total.textContent = people * data.america + (days * data.americaDays) + ' $'; 
					} else if (base == 'италия') {
						total.textContent = (people * data.italy) + (days * data.italyDays) + ' $'; 
					} else if (base == 'германия') {
						total.textContent = (people * data.germany) + (days * data.germanyDays) + ' $'; 
					};
	    		} else {
	    			total.textContent = 0;
	    		};
	    	}
	    });
	};

	setSetting();
};

calc();
