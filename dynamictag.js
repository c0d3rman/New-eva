//Define unoverridable "countdown" function to kill the page's countdown
Object.defineProperty(window, 'countdown', {
    value: function(){}
});

//Make summarize function to request and summarize pages (code adapted from google manual)
/*function summarize (url) {
	var outertext = ""; //initialize outertext to pass out text
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
		var text = xhr.responseText;
		alert(text);
		//text = (/\Q<td class="blogPostBody">\E(.*?)<\/td>/.exec(text))[0]; //Get HTML from HW post
		text = text.replace(/<(.*?)>/g, ""); //Strip HTML
		text = sum({'corpus': text, 'nSentences': 3}); //Call sum.js to summarize
		outertext = text;
	  }
	}
	xhr.send();
	return outertext;
}

var hw_due = document.getElementsByTagName("hw_due"); //get hw_due
var max = hw_due.length; //save length to prevent NodeList funkiness
for (var i = max-1; i > 0; i--) {
	hw_due[i].firstChild.title = summarize(hw_due[i].firstChild.title); //Replace title-text with assignment summary
}*/