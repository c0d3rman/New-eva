if $(".subnavTitle:contains(Homework Calendar)").length isnt 0 or (localStorage.calendar is "true" and $(".subnavTitle:contains(Calendar)").length isnt 0)
	#Apply unicorn powder to assignments
	if localStorage.hw_due is "true"	
		#Create hash of title-text -> class name
		titlehash =
			#verified
			"Comp Sci - Elegant Logic": "Programming"
			"Comp Sci - Computer Science and Programming": "Programming"
			"DT Liquid": "Design Thinking"
			"Service and Design Engineering Plasma": "Design Engineering"
			"English Baldwin": "English"
			"English Euripides": "English"
			"History Rousseau": "History"
			"History Machiavelli": "History"
			"Math Khayyam": "Math"
			"QUEST - All Grade": "Quest"
			"Quest 2": "Quest"
			"Robotics": "Robotics"
			"Robotics FRC Team": "Robotics"
			"Science and Society": "Science and Society"
			"Science Liquid": "Science"
			"Science of Mind Plasma": "Science of Mind"
			"Science of Mind Liquid": "Science of Mind"
			"Spanish Inca": "Spanish"
			"Spanish Azteca": "Spanish"
			"Psychology": "Psychology"
			"Interdisciplinary Studies of Science": "ISS"
			"History: Big History 1": "History"
			#educated guesses
			"DT Solid": "Design Thinking"
			"DT Gas": "Design Thinking"
			"DT Plasma": "Design Thinking"
			"Service and Design Engineering Solid": "Design Engineering"
			"Service and Design Engineering Liquid": "Design Engineering"
			"Service and Design Engineering Gas": "Design Engineering"
			"Science Solid": "Science"
			"Science Gas": "Science"
			"Science Plasma": "Science"
			"Science of Mind Solid": "Science of Mind"
			"Science of Mind Gas": "Science of Mind"
			"English De La Cruz": "English"
			"English Kincaid": "English"
			"English Behn": "English"
			"History Locke": "History"
			"History Hobbes": "History"
			"Math Turing": "Math"
			"Math Ramanujan": "Math"
			"Math Noether": "Math"
			"Comp Sci - Computing in Everything": "Programming"
			"Spanish Maya": "Spanish"
		
		#Function to resolve 2013-2014.1 or 2012-2013.2 issue
		titlehasher = (string) ->
			string = string.replace /^For class "\d{1,2}th (.+) Section \w \d{4}-\d{2}\.\d"\.$/, "$1"
			(titlehash[string] || string)

		
		#Deal with assignments
		hw_due = $ ".hw_due,.hw_remind,.hw_post"
		hw_due.children("em").remove() #Kill "due today"s
		hw_due.children("a").attr "target", "_blank" #Make links open in new tab
		hw_due.css "list-style-type", "none" #Remove bullet points
		hw_due.each ->
			comment = /\s+Comment: (.*)$/.exec $(this).children(":first").attr "title"
			title = titlehasher $(this).children(":first").attr("title").replace /\s+Comment: .*$/, "" #Save title-text for reference (children(":first") problems), hash lookup for performance
			if comment
				comment = comment[1]
				$(this).children(":first").attr "title", $(this) #Set title-text to comment
				 #Add attr('class') & comment
				$(this).children(":first").html """
					<span style="color: red">#{title}</span>: 
					#{$(this).children(":first").html()}
					<span style="color: green"> Comment: #{comment} </span>
				"""
			else
				$(this).children(":first").attr "title", title #Set title-text to attr('class')
				$(this).children(":first").html "<span style=\"color: red\">" + title + "</span>: " + $(this).children(":first").html() #Add attr('class')
			return

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
