//Inject dynamic.js (credit to StackOverflow user Rob W)
function inject (file) {
	var s = document.createElement('script');
	s.src = chrome.extension.getURL(file);
	s.onload = function() {
		this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(s);
};
inject("dynamictag.js"); //inject dynamic script tag
//inject sum.js and dependencies
/*inject("lib/sum_js/lib/porter-stemmer.js");
inject("lib/sum_js/lib/underscore-1.2.3.js");
inject("lib/sum_js/lib/underscore.string-2.0.0.js");
inject("lib/sum_js/sum.js");*/
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
	'For class "9th Spanish Inca 2013-2014.1".': 'Spanish',
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

//Process all elements (necessary on all pages for "The Nueva School" regex without reloading HTML)
var all = document.getElementsByTagName("*");
var max = all.length; //save length to prevent NodeList funkiness
for (var i = max-1; i > 0; i--) {
	//Kill browser warning, .hw_post, and .hw_remind
	if (all[i].className == 'hw_post' || all[i].className == 'hw_remind' || all[i].className == 'errorMessage') {
		all[i].parentNode.removeChild(all[i]);
	}
	//Handle homework assignments
	else if (all[i].className == 'hw_due') {
		all[i].removeChild(all[i].firstChild); //Kill "due today"s
		//handle comment
		var comment = /\s+Comment: (.*)$/.exec(all[i].firstChild.title);
		all[i].firstChild.title = all[i].firstChild.title.replace(/\s+Comment: .*$/, "");
		var title = titlehash[all[i].firstChild.title]; //Save title-text for reference (firstChild problems), hash lookup for performance
		if (comment) {
			comment = comment[1];
			all[i].firstChild.title = comment; //Set title-text to comment 
			all[i].firstChild.innerHTML = '<span style="color: red">' + title + "</span>: " + all[i].firstChild.innerHTML + '<span style="color: green"> Comment: ' + comment + '</span>'; //Add classname & comment
		} else {
			all[i].firstChild.title = all[i].firstChild.title; //Set title-text to classname 
			all[i].firstChild.innerHTML = '<span style="color: red">' + title + "</span>: " + all[i].firstChild.innerHTML; //Add classname
		}
		all[i].style.listStyleType = 'none'; //Remove bullet points
	} else if ((all[i].className == "calendarDay" && (all[i] == all[i].parentNode.firstChild || all[i] == all[i].parentNode.lastChild)) || all[i].className == "calendarNoSchool" || all[i].className == "calendarToday") {
		// || (all[i].className == "calendarDay" && (all[i] == all[i].parentNode.firstChild || all[i] == all[i].parentNode.lastChild))
		var filename = all[i].className; //save filename for special case handling
		
		//handle sundays and saturdays
		//if ((localStorage["weekend"] == "0" && all[i].className == "calendarToday") || (localStorage["weekend"] == "1" && all[i].className == "calendarDay")) {
		if (all[i].className == "calendarDay") {
			if (all[i] == all[i].parentNode.firstChild) {
				filename = "calendarSunday";
			} else {
				filename = "calendarSaturday";
			}
		}
		
		//Work some magic on certain days (add pictures)
		var img = document.createElement('img')
		img.setAttribute("src", chrome.extension.getURL("images/" + filename + ".png"));
		img.style.width = "95%";
		img.style.display = "block"; //center
		img.style.margin = "0 auto"; //center
		all[i].appendChild(img);
	}
	
	//Replace all non-crucial occurrences of "The Nueva School" with "Nueva"
	if (all[i].innerHTML.match(/(<[^>]*?>[^><]*?)The Nueva School([^><]*?<)/ig)) {
		all[i].innerHTML = all[i].innerHTML.replace(/(<[^>]*?>[^><]*?)The Nueva School([^><]*?<)/ig, "$1Nueva$2");
	}
}

//create sidebox with hw for tomorrow
var sidebox = document.createElement('div');
var c = document.createElement('div');
sidebox.innerHTML = document.getElementsByClassName('calendarToday')[0].nextSibling.innerHTML; //get tomorrow's assignments
sidebox.firstChild.firstChild.innerText = "Tomorrow's Homework (" + sidebox.firstChild.firstChild.innerText + ")"; //set title
//style sidebox
sidebox.style.position = "fixed";
sidebox.style.padding = "10 5";
sidebox.style.zIndex = 1000;
sidebox.style.width = 100;
sidebox.style.marginTop = 100;
sidebox.style.marginRight = "10px";
//sidebox.style.float = "right";
sidebox.style.marginLeft = (window.innerWidth - 126);
sidebox.style.border = "3px solid black";
sidebox.style.backgroundColor = "#CCCCCC";
document.body.insertBefore(sidebox, document.body.firstChild); //add to beginning of page

//set onResize to keep sidebox on right side
window.onresize = function(){
	sidebox.style.marginLeft = (window.innerWidth - 126);
};