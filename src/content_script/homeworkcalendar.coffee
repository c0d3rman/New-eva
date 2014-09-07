if $(".subnavTitle:contains(Homework Calendar)").length isnt 0 or (localStorage.calendar is "true" and $(".subnavTitle:contains(Calendar)").length isnt 0)
	#Apply unicorn powder to assignments
	if localStorage.hw_due is "true"	
		#Create human class name hash
		titlehash =
			"Advanced Physics": "Physics"
			"Computer Programming Workshop": "Programming"
			"History: Big History 1": "History"
			"Interdisciplinary Studies of Science": "ISS"
			"Math Calculus": "Math"
			#deprecated (2013-2014)
			"Comp Sci - Computer Science and Programming": "Programming"
			"Comp Sci - Computing in Everything": "Programming"
			"Comp Sci - Elegant Logic": "Programming"
			"DT Gas": "Design Thinking"
			"DT Liquid": "Design Thinking"
			"DT Plasma": "Design Thinking"
			"DT Solid": "Design Thinking"
			"English Baldwin": "English"
			"English Behn": "English"
			"English De La Cruz": "English"
			"English Euripides": "English"
			"English Kincaid": "English"
			"History Hobbes": "History"
			"History Locke": "History"
			"History Machiavelli": "History"
			"History Rousseau": "History"
			"Math Khayyam": "Math"
			"Math Noether": "Math"
			"Math Ramanujan": "Math"
			"Math Turing": "Math"
			"Psychology": "Psychology"
			"QUEST - All Grade": "Quest"
			"Quest 2": "Quest"
			"Robotics FRC Team": "Robotics"
			"Robotics": "Robotics"
			"Science and Society": "Science and Society"
			"Science Gas": "Science"
			"Science Liquid": "Science"
			"Science of Mind Gas": "Science of Mind"
			"Science of Mind Liquid": "Science of Mind"
			"Science of Mind Plasma": "Science of Mind"
			"Science of Mind Solid": "Science of Mind"
			"Science Plasma": "Science"
			"Science Solid": "Science"
			"Service and Design Engineering Gas": "Design Engineering"
			"Service and Design Engineering Liquid": "Design Engineering"
			"Service and Design Engineering Plasma": "Design Engineering"
			"Service and Design Engineering Solid": "Design Engineering"
			"Spanish Azteca": "Spanish"
			"Spanish Inca": "Spanish"
			"Spanish Maya": "Spanish"
		
		#Function to parse and resolve human class names
		titlehasher = (string) ->
			string = string										#For class "9th/10th Elective: Physics Section A 2014-15.2".
				.replace(/^For class "(.+)"\.$/, "$1")			#9th/10th Elective: Physics Section A 2014-15.2
				.replace(/^\d{1,2}th\/\d{1,2}th (.+)$/, "$1")	#Elective: Physics Section A 2014-15.2
				.replace(/^\d{1,2}th (.+)$/, "$1")				#Elective: Physics Section A 2014-15.2
				.replace(/^(.+) \d{4}-\d{2}\.\d$/, "$1")		#Elective: Physics Section A
				.replace(/^(.+) Section \w$/, "$1")				#Elective: Physics
				.replace(/^Elective: (.+)$/, "$1")				#Physics
			(titlehash[string] || string)

		
		#Deal with assignments
		hw_due = $ ".hw_due,.hw_remind,.hw_post"
		hw_due.children("em").remove() #Kill "due today"s
		hw_due.children("a").attr "target", "_blank" #Make links open in new tab
		hw_due.css "list-style-type", "none" #Remove bullet points
		hw_due.each ->
			comment = /\s+Comment: (.*)$/.exec $(this).children(":first").attr "title"
			title = titlehasher $(this).children(":first").attr("title").replace /\s+Comment: .*$/, "" #Save title-text for reference (children(":first") problems), hash lookup for performance
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
