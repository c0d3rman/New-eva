//Inject dynamic.js (credit to StackOverflow user Rob W)
var s = document.createElement('script');
s.src = chrome.extension.getURL("dynamictag.js");
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);
//Done injecting

//Remove logout timer bar (visual)
var parent = document.getElementById("__thermo").parentElement;
parent.parentElement.removeChild(parent);

//Create hash of title-text -> class name
var titlehash = {
	//verified
	'For class "9th CESL".': 'CESL',
	'For class "9th Comp Sci - Elegant Logic 2013-2014.1".': 'Advanced Programming',
	'For class "9th DT Liquid 2013-2014.1".': 'Design Thinking',
	'For class "9th English Baldwin 2013-2014.1".': 'English',
	'For class "9th History Rousseau 2013-2014.1".': 'History',
	'For class "9th Math Khayyam 2013-2014.1".': 'Math',
	'For class "9th QUEST - All Grade 2013-2014.1".': 'Quest',
	'For class "9th Quest 2 2013-2014.1".': 'Quest',
	'For class "9th Robotics 2013-2014.1".': 'Robotics',
	'For class "9th Science and Society 2013-2014.1".': 'Science and Society',
	'For class "9th Science Liquid 2013-2014.1".': 'Science',
	'For class "9th Science of Mind Liquid 2013-2014.1".': 'Science of Mind',
	//educated guesses
	'For class "9th DT Solid 2013-2014.1".': 'Design Thinking',
	'For class "9th DT Gas 2013-2014.1".': 'Design Thinking',
	'For class "9th DT Plasma 2013-2014.1".': 'Design Thinking',
	'For class "9th Science Solid 2013-2014.1".': 'Science',
	'For class "9th Science Gas 2013-2014.1".': 'Science',
	'For class "9th Science Plasma 2013-2014.1".': 'Science',
	'For class "9th Science of Mind Solid 2013-2014.1".': 'Science of Mind',
	'For class "9th Science of Mind Gas 2013-2014.1".': 'Science of Mind',
	'For class "9th Science of Mind Plasma 2013-2014.1".': 'Science of Mind',
	'For class "9th English Locke 2013-2014.1".': 'English',
	'For class "9th History Machiavelli 2013-2014.1".': 'History',
	'For class "9th Math Turing 2013-2014.1".': 'Math',
	'For class "9th Comp Sci - Computing in Everything 2013-2014.1".': 'Advanced Programming',
};

//Require sum.js
var sum = require('lib/sum');

//Make summarize function to request and summarize pages (code adapted from google manual)
function summarize (url) {
	var outertext = ""; //initialize outertext to pass out text
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
		var text = xhr.responseText;
		text = (/<td class="blogPostBody">(.*?)<\/td>/.exec(text))[0]; //Get HTML from HW post
		text = text.replace(/<(.*?)>/g, ""); //Strip HTML
		text = sum({'corpus': text, 'nSentences': 3}); //Call sum.js to summarize
		outertext = text;
	  }
	}
	xhr.send();
	return outertext;
}

//Process all elements
var all = document.getElementsByTagName("*");
var max = all.length; //save length to prevent NodeList funkiness
for (i = max-1; i > 0; i--) {
	//Handle homework assignments
	if ((all[i].className == 'hw_due') ) {
		all[i].removeChild(all[i].firstChild); //Kill "due today"s
		all[i].style.listStyleType = 'none'; //Remove bullet points
		all[i].innerHTML = titlehash[all[i].firstChild.title] + ": " + all[i].innerHTML; //Add classname
		all[i].firstChild.title = summarize(all[i].firstChild.title); //Replace title-text with assignment summary
	}
	//Kill browser warning, .hw_post, and .hw_remind
	else if ((all[i].className == 'hw_post') || (all[i].className == 'hw_remind') || all[i].className == 'errorMessage') {
		all[i].parentNode.removeChild(all[i]);
	}
	//Replace all non-crucial occurrences of "The Nueva School" with "Nueva"
	else if (all[i].innerHTML.match(/(<[^>]*?>[^><]*?)The Nueva School([^><]*?<)/ig)) {
		all[i].innerHTML = all[i].innerHTML.replace(/(<[^>]*?>[^><]*?)The Nueva School([^><]*?<)/ig, "$1Nueva$2");
	}
}

//Work some CSS magic on no-school days
var noschool = document.getElementsByClassName("calendarNoSchool");

for (var i = 0; i < noschool.length; i++) {
	var img = document.createElement('img')
	img.setAttribute("src", "http://fc02.deviantart.net/fs71/f/2012/025/b/b/no_school_by_wilpah-d4nn1c2.png");
	img.style.width = "95%";
	img.style.display = "block";
    img.style.margin = "0 auto";
	noschool[i].appendChild(img);
}