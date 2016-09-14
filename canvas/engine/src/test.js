function t(){
	var b = function(){ console.log('b');}
	setTimeout(b,2000);
	return {
	  done: function(a){
	  	console.log(b);
        b = a ;
	  }

	}
}; t().done(function(){console.log('a');});