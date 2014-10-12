window.onNewevaReady ->
	#Listen for background refresh events
	chrome.extension.onMessage.addListener (request, sender, sendResponse) ->
		if request.method is "Background Refresh"
			switch request.type
				when "Initiate"
					$("#bgrstart").fadeIn()
				when "Success"
					setTimeout (->
						$("#bgrstart").fadeOut()
						$("#bgrdone").fadeIn()
						setTimeout (->
							$("#bgrdone").fadeOut()
						), 1000
					), 3000
				when "Failure"
					setTimeout (->
						$("#bgrstart").fadeOut()
						$("#bgrfail").fadeIn()
						setTimeout (->
							$("#bgrfail").fadeOut()
						), 1000
					), 3000
				else
					throw "Unexpected type of Background Refresh message"


	#Create loader image
	$(document.createElement "img")
		.hide()
		.attr("id", "bgrstart")
		.attr("src", chrome.extension.getURL "images/loading.gif")
		.css("position", "fixed")
		.attr("width", 100)
		.prependTo $("body")
	$("#bgrstart")
		.css("top", Math.max(0, (($(window).height() - $("#bgrimg").height()) / 2) + $(window).scrollTop()) + "px")
		.css("left", Math.max(0, (($(window).width() - $("#bgrimg").width()) / 2) + $(window).scrollLeft()) + "px")

	#Create success image
	$(document.createElement "img")
		.hide()
		.attr("id", "bgrdone")
		.attr("src", chrome.extension.getURL "images/success.png")
		.css("position", "fixed")
		.attr("width", 100)
		.prependTo $("body")
	$("#bgrdone")
		.css("top", Math.max(0, (($(window).height() - $("#bgrdone").height()) / 2) + $(window).scrollTop()) + "px")
		.css("left", Math.max(0, (($(window).width() - $("#bgrdone").width()) / 2) + $(window).scrollLeft()) + "px")

	#Create failure image
	$(document.createElement "img")
		.hide()
		.attr("id", "bgrfail")
		.attr("src", chrome.extension.getURL "images/error.png")
		.css("position", "fixed")
		.attr("width", 100)
		.prependTo $("body")
	$("#bgrfail")
		.css("top", Math.max(0, (($(window).height() - $("#bgrfail").height()) / 2) + $(window).scrollTop()) + "px")
		.css("left", Math.max(0, (($(window).width() - $("#bgrfail").width()) / 2) + $(window).scrollLeft()) + "px")