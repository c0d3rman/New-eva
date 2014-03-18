//create sidebox with hw for tomorrow
var sidebox = $(document.createElement('div'));
var c = $(document.createElement('div'));
//sidebox.innerHTML = "<span style='font: 10px gray'>" + Math.floor((Date.now() - localStorage['date']) / 60000) + " minutes since last updated</span>"; //Display time since last updated
//sidebox.innerHTML += localStorage["homework"]; //get homework from memory
sidebox.html($('.calendarToday').children().eq(1).html());
sidebox.children(":first").children(":first").text("Tomorrow's Homework (" + sidebox.children(":first").children(":first").text() + ")"); //set title
//style sidebox
sidebox.css("position", "fixed")
.css("padding", "10 5")
.css("zIndex", 1000)
.css("width", 100)
.css("marginTop", 100)
.css("marginRight", "10px")
.css("marginLeft", ($(window).width() - 126))
.css("border", "3px solid black")
.css("backgroundColor", "#CCCCCC")
.prependTo($("body")); //add to beginning of page

//set onResize to keep sidebox on right side
$(window).resize(function(){
	sidebox.css('marginLeft', $(window).width() - 126);
});