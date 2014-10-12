window.onNewevaReady ->
	if $(".subnavTitle:contains(Homework Calendar)").length isnt 0 or (localStorage.calendar is "true" and $(".subnavTitle:contains(Calendar)").length isnt 0)
		#Apply unicorn powder to assignments
		if localStorage.hw_due is "true"
			#Deal with assignments
			hw_due = $ ".hw_due,.hw_remind,.hw_post"
			hw_due.children("em").remove() #Kill "due today"s
			hw_due.children("a").attr "target", "_blank" #Make links open in new tab
			hw_due.css "list-style-type", "none" #Remove bullet points
			hw_due.each ->
				comment = /\s+Comment: (.*)$/.exec $(this).children(":first").attr "title"
				title = window.titlehasher $(this).children(":first").attr("title").replace /\s+Comment: .*$/, "" #Save title-text for reference (children(":first") problems), hash lookup for performance
				#Set assignment text
				$(this).children(":first").html """
					<span style="color: red">#{title}</span>: 
					#{$(this).children(":first").html() || "&lt;untitled&gt;"}
				"""
				if comment
					comment = comment[1]
					$(this).children(":first").attr "title", $(this) #Set title-text to comment
					#Add comment
					$(this).children(":first").html """
						#{$(this).children(":first").html()}
						<span style="color: green"> Comment: #{comment}</span>
					"""
				else
					$(this).children(":first").attr "title", title #Set title-text to attr('class')

			$(".hw_remind").css "background-color", "rgba(255,255,0,0.2)"
			$(".hw_post").css "background-color", "rgba(0,255,0,0.2)"
		
		#Work some magic on certain days (add pictures)
		#center
		img = $(document.createElement("img")).css("width", "95%").css("display", "block").css("margin", "0 auto") #center
		$(".calendarDay:first-child").append img.clone().attr("src", chrome.extension.getURL("images/calendarSunday.png"))	if localStorage.calendarSunday is "true"
		$(".calendarDay:last-child").append img.clone().attr("src", chrome.extension.getURL("images/calendarSaturday.png"))	 if localStorage.calendarSaturday is "true"
		$(".calendarNoSchool").append img.clone().attr("src", chrome.extension.getURL("images/calendarNoSchool.png"))	 if localStorage.calendarNoSchool is "true"
		$(".calendarToday").append img.clone().attr("src", chrome.extension.getURL("images/calendarToday.png"))	 if localStorage.calendarToday is "true"
		
		#kill reminders (yellow)
		$(".hw_remind").remove()	unless localStorage.hw_remind is "true"
		
		#Kill postings (green)
		$(".hw_post").remove()	unless localStorage.hw_post is "true"