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

//Process all elements
var all = document.getElementsByTagName("*");
var max = all.length; //save length to prevent NodeList funkiness
for (i = max-1; i > 0; i--) {
	//Kill all .hw_post and .hw_remind (and browser message)
	if ((all[i].className == 'hw_post') || (all[i].className == 'hw_remind') || (all[i].className == 'errorMessage')) {
		all[i].parentNode.removeChild(all[i]);
	}
	//Kill "due today"s
	else if (all[i].className == 'hw_due') {
		all[i].removeChild(all[i].firstChild);
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