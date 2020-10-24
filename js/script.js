'use strict';
// calc 
let inputFirst = document.querySelector('.first-input'),
	inputSecond = document.querySelector('.second-input'),
	selectBase = document.querySelector('.select-base'),
	options = document.querySelectorAll('option'),
	total = document.querySelector('.total'),
	btnSend = document.querySelector('.submit'),
	request;

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
