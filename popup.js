document.addEventListener('DOMContentLoaded', function () {
	document.getElementById("button").onclick = function() {
		//get input NodeLists
		var inputs = document.getElementsByTagName("input");
		var selects = document.getElementsByTagName("select");
​		
		//build css from inputs
		var css = [];
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i] != "") {
				css.push(inputs[i].id + ": " + inputs[i].value);
			}
		}
		for (var i = 0; i < selects.length; i++) {
			css.push(selects[i].id + ": " + selects[i].value);
		}
		
		//apply css
		chrome.tabs.executeScript(null, {
			code: "var style = document.createElement('style'); style.innerHTML = 'p,a,li {" + css.join("; ") + "}'; document.head.appendChild(style);"
		});	
	};
});