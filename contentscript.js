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
//alert(max);
for (i = max-1; i > 0; i--) {
//	alert("i is " + i);
	//Kill all .hw_post and .hw_remind (and browser message)
	if ((all[i].className == 'hw_post') || (all[i].className == 'hw_remind') || (all[i].className == 'errorMessage')) {
//		alert("Killing b/g");
		all[i].parentNode.removeChild(all[i]);
	}
	//Kill "due today"s
	else if (all[i].className == 'hw_due') {
//		alert("Killing due");
		all[i].removeChild(all[i].firstChild);
	}
	//Replace all non-crucial occurrences of "The Nueva School" with "Nueva"
	else if (all[i].innerHTML.match(/(<[^>]*?>[^><]*?)The Nueva School([^><]*?<)/ig)) {
//		alert("Replacing");
		all[i].innerHTML = all[i].innerHTML.replace(/(<[^>]*?>[^><]*?)The Nueva School([^><]*?<)/ig, "$1Nueva$2");
	}
}
//alert("ho");
//alert("Went over " + i + " out of " + max + " elements");
/*var html = document.documentElement.innerHTML;
html = html.replace(/(<[^>]*?>[^><]*?)The Nueva School([^><]*?<)/ig, "$1Nueva$2");
document.documentElement.innerHTML = html;*/

//Kill all .hw_post and .hw_remind
/*var hw_post = document.getElementsByClassName('hw_post');
var hw_remind = document.getElementsByClassName('hw_remind');
while(hw_post[0]) {
    hw_post[0].parentNode.removeChild(hw_post[0]);
}
while(hw_remind[0]) {
    hw_remind[0].parentNode.removeChild(hw_remind[0]);
}*/

//Work some CSS magic on no-school days
var noschool = document.getElementsByClassName("calendarNoSchool");

for (var i = 0; i < noschool.length; i++) {
	//noschool[i].style.background-color = "green";
	//noschool[i].style.color = "pink";
	//noschool[i].insertBefore(img, noschool[i].parentNode.firstChild);
	var img = document.createElement('img')
	img.setAttribute("src", "http://fc02.deviantart.net/fs71/f/2012/025/b/b/no_school_by_wilpah-d4nn1c2.png");
	//"file://localhost/Users/yonlern/Documents/Programming/Chrome/New-eva/images/noschool.png"
	img.style.width = "95%";
	img.style.display = "block";
    img.style.margin = "0 auto";
	noschool[i].appendChild(img);
}
/*var style = document.createElement('style');
style.innerHTML = "calendarNoSchool {font-size: 50px}";
document.head.appendChild(style);*/