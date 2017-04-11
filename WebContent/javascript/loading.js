function closes(){
	$("#loading").fadeOut("normal",function(){
		$(this).remove();
	});
};
var delayTime;

$.parser.onComplete = function(){
	if(delayTime){
		clearTimeout(delayTime);
	}
	delayTime = setTimeout(closes, 100);
};