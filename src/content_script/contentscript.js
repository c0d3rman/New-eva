//Create hash of title-text -> class name
var titlehash = {
	//verified
	'For class "9th CESL".': 'CESL',
	'For class "9th Comp Sci - Elegant Logic 2013-2014.1".': 'Programming',
	'For class "9th Comp Sci - Computer Science and Programming 2013-2014.1".': 'Programming',
	'For class "9th DT Liquid 2013-2014.1".': 'Design Thinking',
	'For class "9th Service and Design Engineering Plasma 2013-2014.1".': 'Design Engineering',
	'For class "9th English Baldwin 2013-2014.1".': 'English',
	'For class "9th English Euripides 2013-2014.1".': 'English',
	'For class "9th History Rousseau 2013-2014.1".': 'History',
	'For class "9th History Machiavelli 2013-2014.1".': 'History',
	'For class "9th Math Khayyam 2013-2014.1".': 'Math',
	'For class "9th QUEST - All Grade 2013-2014.1".': 'Quest',
	'For class "9th Quest 2 2013-2014.1".': 'Quest',
	'For class "9th Robotics 2013-2014.1".': 'Robotics',
	'For class "9th Robotics FRC Team 2013-2014.1".': 'Robotics',
	'For class "9th Science and Society 2013-2014.1".': 'Science and Society',
	'For class "9th Science Liquid 2013-2014.1".': 'Science',
	'For class "9th Science of Mind Plasma 2013-2014.1".': 'Science of Mind',
	'For class "9th Science of Mind Liquid 2013-2014.1".': 'Science of Mind',
	'For class "9th Spanish Inca 2013-2014.1".': 'Spanish',
	'For class "9th Spanish Azteca 2013-2014.1".': 'Spanish',
	//educated guesses
	'For class "9th DT Solid 2013-2014.1".': 'Design Thinking',
	'For class "9th DT Gas 2013-2014.1".': 'Design Thinking',
	'For class "9th DT Plasma 2013-2014.1".': 'Design Thinking',
	'For class "9th Service and Design Engineering Solid 2013-2014.1".': 'Design Engineering',
	'For class "9th Service and Design Engineering Liquid 2013-2014.1".': 'Design Engineering',
	'For class "9th Service and Design Engineering Gas 2013-2014.1".': 'Design Engineering',
	'For class "9th Science Solid 2013-2014.1".': 'Science',
	'For class "9th Science Gas 2013-2014.1".': 'Science',
	'For class "9th Science Plasma 2013-2014.1".': 'Science',
	'For class "9th Science of Mind Solid 2013-2014.1".': 'Science of Mind',
	'For class "9th Science of Mind Gas 2013-2014.1".': 'Science of Mind',
	'For class "9th English De La Cruz 2013-2014.1".': 'English',
	'For class "9th English Kincaid 2013-2014.1".': 'English',
	'For class "9th English Behn 2013-2014.1".': 'English',
	'For class "9th History Locke 2013-2014.1".': 'History',
	'For class "9th History Hobbes 2013-2014.1".': 'History',
	'For class "9th Math Turing 2013-2014.1".': 'Math',
	'For class "9th Math Ramanujan 2013-2014.1".': 'Math',
	'For class "9th Math Noether 2013-2014.1".': 'Math',
	'For class "9th Comp Sci - Computing in Everything 2013-2014.1".': 'Programming',
	'For class "9th Spanish Maya 2013-2014.1".': 'Spanish',
};

//Function to resolve 2013-2014.1 or 2012-2013.2 issue
var titlehasher = function (string) {
	string = string.replace(/\d{4}-\d{4}\.\d/, '2013-2014.1');
	return titlehash[string];
}

//Deal with assignments
var hw_due = $('.hw_due');
hw_due.children("em").remove(); //Kill "due today"s
hw_due.children("a").attr("target", "_blank"); //Make links open in new tab
hw_due.css('list-style-type', 'none'); //Remove bullet points
hw_due.each(function(){
	var comment = /\s+Comment: (.*)$/.exec($(this).children(":first").attr('title'));
	var title = titlehasher($(this).children(":first").attr('title').replace(/\s+Comment: .*$/, "")); //Save title-text for reference (children(":first") problems), hash lookup for performance
	if (comment) {
		comment = comment[1];
		$(this).children(":first").attr('title', $(this)); //Set title-text to comment 
		$(this).children(":first").html('<span style="color: red">' + title + "</span>: " + $(this).children(":first").html() + '<span style="color: green"> Comment: ' + comment + '</span>'); //Add attr('class') & comment
	} else {
		$(this).children(":first").attr('title', title); //Set title-text to attr('class') 
		$(this).children(":first").html('<span style="color: red">' + title + "</span>: " + $(this).children(":first").html()); //Add attr('class')
	}
});


//Work some magic on certain days (add pictures)
var img = $(document.createElement('img'))
	.css("width", "95%")
	.css("display", "block") //center
	.css("margin", "0 auto"); //center

$('.calendarDay:first-child')
	.append(img.clone().attr("src", chrome.extension.getURL("images/calendarSunday.png")));
$('.calendarDay:last-child')
	.append(img.clone().attr("src", chrome.extension.getURL("images/calendarSaturday.png")));
$('.calendarNoSchool')
	.append(img.clone().attr("src", chrome.extension.getURL("images/calendarNoSchool.png")));
$('.calendarToday')
	.append(img.clone().attr("src", chrome.extension.getURL("images/calendarToday.png")));

/*
//Process all elements
var all = $('body').children();
all.each(function (i, element) {
	//make 'element' a jQuery element
	element = $(element);

	//Handle homework assignments
	if (element.attr('class') == 'hw_due') {
		element.children(":first").remove(); //Kill "due today"s
		element.children(":first").attr("target", "_blank"); //Make links open in new tab
		//handle comment
		var comment = /\s+Comment: (.*)$/.exec(element.children(":first").attr('title'));
		var title = titlehasher(element.children(":first").attr('title').replace(/\s+Comment: .*$/, "")); //Save title-text for reference (children(":first") problems), hash lookup for performance
		if (comment) {
			comment = comment[1];
			element.children(":first").attr('title', comment); //Set title-text to comment 
			element.children(":first").html('<span style="color: red">' + title + "</span>: " + element.children(":first").html() + '<span style="color: green"> Comment: ' + comment + '</span>'); //Add attr('class') & comment
		} else {
			element.children(":first").attr('title', title); //Set title-text to attr('class') 
			element.children(":first").html('<span style="color: red">' + title + "</span>: " + element.children(":first").html()); //Add attr('class')
		}
		element.css('list-style-type', 'none'); //Remove bullet points
	} else if (
		$(document).attr('title') == "Calendar"
		&& (
			(
				element.attr('class') == "calendarDay"
				&& (
					element.is(":first-child")
					|| element.is(":last-child")
				)
				|| element.attr('class') == "calendarNoSchool"
				|| element.attr('class') == "calendarToday"
			)
		)
	) {
		// || (element.attr('class') == "calendarDay" && (element == element.parentNode.children(":first") || element == element.parentNode.lastChild))
		var filename = element.attr('class'); //save filename for special case handling
		
		//handle sundays and saturdays
		//if ((localStorage["weekend"] == "0" && element.attr('class') == "calendarToday") || (localStorage["weekend"] == "1" && element.attr('class') == "calendarDay")) {
		if (element.attr('class') == "calendarDay") {
			if (element.is(':first-child')) {
				filename = "calendarSunday";
			} else {
				filename = "calendarSaturday";
			}
		}
		
		//Work some magic on certain days (add pictures)
		var img = $(document.createElement('img'));
		img.attr("src", chrome.extension.getURL("images/" + filename + ".png"));
		img.css("width", "95%");
		img.css("display", "block"); //center
		img.css("margin", "0 auto"); //center
		element.append(img);
	}
});
*/

//Check if current tab is homework calendar
/*if (document.getElementsByattr('class')('subnavTitle')[0].innerText == " Homework Calendar     Print") {
	localStorage["homework"] = document.getElementsByattr('class')('calendarToday')[0].nextSibling.innerHTML; //get tomorrow's assignments
	localStorage["date"] = Date.now();
}*/