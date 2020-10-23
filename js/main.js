'use strict';
let inputUah = document.getElementById('rub'),
    inputUsd = document.getElementById('usd'),
    request;

inputUah.addEventListener('input', () => {     
    function convertor() {
       let promise = new Promise(function(resolve, reject) {
            resolve();

            request.addEventListener('readystatechange', function() {
                if (request.readyState === 4 && request.status == 200) {
                    resolve();
                } else {
                    reject();
                };
            })
        });

        return promise;    
    };

    function setSetting() {
    	setTimeout(function() {
    		request = new XMLHttpRequest();

	        request.open('GET', 'js/current.json');
	        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	        request.send(); 
    	}, 500);
    };

    function convert() {
    	setTimeout(function() {
    		let data = JSON.parse(request.response);
    		inputUsd.value = Math.floor(inputUah.value / data.usd);
    	}, 1000);
    };

    function error() {
        inputUsd.value = "Что-то пошло не так!";
    };

    convertor().then(setSetting).then(convert).catch(error);
});