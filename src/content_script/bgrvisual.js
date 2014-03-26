chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.method == "Background Refresh") {
			switch (request.type) {
				case "Initiate":
					$("#bgrstart").fadeIn();
					break;
				case "Success":
					setTimeout(function(){
						$("#bgrstart").fadeOut();
						$("#bgrdone").fadeIn();
						setTimeout(function(){
							$("#bgrdone").fadeOut()
						}, 1000);
					}, 3000);
					break;
				case "Failure":
					setTimeout(function(){
						$("#bgrstart").fadeOut();
						$("#bgrfail").fadeIn();
						setTimeout(function(){
							$("#bgrfail").fadeOut()
						}, 1000);
					}, 3000);
					break;
				default:
					throw "Unexpected type of Background Refresh message";
			}
		}
	}
);

//Create loader image
$(document.createElement("img"))
	.hide()
	.attr("id", "bgrstart")
	.attr("src", chrome.extension.getURL("images/loading.gif"))
	.css("position", "fixed")
	.attr("width", 100)
	.prependTo($("body"));
$("#bgrstart")
	.css("top", Math.max(0, (($(window).height() - $("#bgrimg").height()) / 2) + $(window).scrollTop()) + "px")
	.css("left", Math.max(0, (($(window).width() - $("#bgrimg").width()) / 2) + $(window).scrollLeft()) + "px");

//Create success image
$(document.createElement("img"))
	.hide()
	.attr("id", "bgrdone")
	.attr("src", chrome.extension.getURL("images/success.png"))
	.css("position", "fixed")
	.attr("width", 100)
	.prependTo($("body"));
$("#bgrdone")
	.css("top", Math.max(0, (($(window).height() - $("#bgrdone").height()) / 2) + $(window).scrollTop()) + "px")
	.css("left", Math.max(0, (($(window).width() - $("#bgrdone").width()) / 2) + $(window).scrollLeft()) + "px");
	
//Create failure image
$(document.createElement("img"))
	.hide()
	.attr("id", "bgrfail")
	.attr("src", chrome.extension.getURL("images/error.png"))
	.css("position", "fixed")
	.attr("width", 100)
	.prependTo($("body"));
$("#bgrfail")
	.css("top", Math.max(0, (($(window).height() - $("#bgrfail").height()) / 2) + $(window).scrollTop()) + "px")
	.css("left", Math.max(0, (($(window).width() - $("#bgrfail").width()) / 2) + $(window).scrollLeft()) + "px");