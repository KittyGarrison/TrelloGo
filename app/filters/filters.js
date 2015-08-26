(function() {
    angular
        .module('trelloGo')
        .filter('startFrom', function() {
		    return function(input, start) {
		    	// console.log(input);
		    	// console.log(start);
		        start = +start; //parse to int
		        if(input == 0 || input == undefined){
		        	return;
		        }else{
		        	return input.slice(start);	
		        }
		        
		    }
		});
})();