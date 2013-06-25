OWF.relayFile = '/owf-sample-html/js/eventing/rpc_relay.uncompressed.html';
owfdojo.addOnLoad(function(){
	OWF.ready(init);
});

var bars = [];
function init() {
	OWF.Eventing.subscribe("testChannel1", this.add);		

}

var add = function add(sender, msg){
	var objs = msg.substr(1,msg.length-1);
	objs = objs.split(",");

	
	for (var i = 0; i < objs.length; i++){
		var time = new Date(parseInt(objs[i]));
		var month = time.getMonth().toString();
		var day = time.getDate().toString();
		var year = time.getYear().toString();	
		if (month < 10){
			month = "0" + month;				
		}
		if (day < 10){
			day = "0" + day;			
		}
		year = year.substr(1,year.length);
		var date = year + month + day;
		var key = objs[i];
		var checkResult = check(key, date);
		
		if(checkResult == 0){		
			var bar = document.createElement("span");
			bar.className = "element";
			bar.style.height = 30 + "px";
			bar.id = date;
			bar.onclick = send;
			bar.keys = [];
			bar.keys.push(key);		
			bars.push(bar);
		} else if (checkResult == -1) {
				//do nothing
		} else {
			var h = checkResult.style.height;		
			checkResult.style.height = (parseInt(h.substr(0,2)) + 10) + "px";
			checkResult.keys.push(key);
		}
	}
	
	bars.sort(function(a,b) {return a.key - b.key});
	var container = document.getElementById("container");
	var current = container.childNodes;
	
	for(var i = 0; i < bars.length; i++){
	
		container.appendChild(bars[i]);

	}

};

var send = function send(){
	var date = this.id;
	var year = date.substr(0,2);
	var month = date.substr(2,4);
	var day = date.substr(4,6);

	year = "20" + year.substr(1,year.length);

	date1.setFullYear(year, month, day);
	date1.setHours(0);
	date1.setMinutes(0);
	date1.setSeconds(0);
	date1.setMilliseconds(0);
	var date2 = new Date();
	date2.setFullYear(year, month, day + 1);
//	var d1 = date1.parse();
//	var d2 = date2.parse();

	var range = "[" + date1 + "," + date2 +"]";
	OWF.Eventing.publish("testChannel2", range);

}



var check = function check(key, date){
	for(var i = 0; i < bars.length; i++){
				if(bars[i].id === date){
					for(var k = 0; k < bars[i].keys.length; k++){
							if(bars[i].keys[k] === key){
								return -1;								
								}
						}
					return bars[i];			
				} 
		}	
		return 0;		
}

