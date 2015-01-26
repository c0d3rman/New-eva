#fetch settings and dump them into localStorage
chrome.runtime.sendMessage method: "getLocalStorage", (response) ->
	#dump settings
	localStorage[key] = value for key, value of response.localStorage
	
	#send ready message
	window.dispatchEvent new Event "New-eva Ready"

#create and expose function to parse and resolve human class names
window.titlehash =
	"Advanced Physics": "Physics"
	"Advanced Physics II": "Physics"
	"Computer Programming Workshop": "Programming"
	"History: Big History 1": "History"
	"History: Big History 2": "History"
	"Interdisciplinary Studies of Science": "ISS"
	"Math Calculus": "Math"
	"Quest": "Quest"
	"Spanish I": "Spanish"
	"Spanish II": "Spanish"
	"Spanish III": "Spanish"
	"Spanish IV": "Spanish"
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

window.titlehasher = (string) ->
	string = string										#For class "9th/10th Elective-Advanced Physics Section A 2014-15.2".
		.replace(/^[\s\u00a0]*(.+?)[\s\u00a0]*$/, "$1") #\u00a0 = &nsbp;
		.replace(/^(.+) Blog$/, "$1")
		.replace(/^For class "(.+)"\.$/, "$1")			#9th/10th Elective-Advanced Physics Section A 2014-15.2
		.replace(/^For BLOG (.+)\.$/, "$1")
		.replace(/^\d{1,2}th\/\d{1,2}th (.+)$/, "$1")	#Elective-Advanced Physics Section A 2014-15.2
		.replace(/^\d{1,2}th Grade (.+)$/, "$1")
		.replace(/^\d{1,2}th (.+)$/, "$1")				
		.replace(/^(.+) \d{4}-\d{2}(\.\d)?$/, "$1")		#Elective-Advanced Physics Section A
		.replace(/^(.+) \d{4}-\d{4}(\.\d)?$/, "$1")
		.replace(/^(.+) Section \w$/, "$1")				#Elective-Advanced Physics
		.replace(/^Elective-(.+)$/, "$1")				#Advanced Physics
		.replace(/^(Advisory)-.+$/, "$1")
	(titlehash[string] || string)						#Physics

window.onNewevaReady = (callback) ->
	window.addEventListener "New-eva Ready", callback

window.onNewevaReady ->
	if localStorage.thermo is "true"
		#stop countdown
		id = window.setTimeout((->), 0)
		window.clearTimeout id while id--
		
		#Remove logout timer bar (visual)
		$("#__thermo").remove()

	#make logo go to my.nuevaschool.org
	$(".col-md-2").children().first().attr "href", "https://my.nuevaschool.org/" if localStorage.logo is "true"

	#Add footer text
	$(".footer small").html (i, html) -> "#{html}<br>New-eva extension by Yoni Lerner"