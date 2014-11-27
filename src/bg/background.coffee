# First-time install page
chrome.runtime.onInstalled.addListener (details) ->
	if details.reason is "install"
		chrome.tabs.create url: "src/install_page/install.html"

# show Page Action	
checkForValidUrl = (tabId, changeInfo, tab) ->
	chrome.pageAction.show tabId if tab.url.indexOf("my.nuevaschool.org") is 7 or tab.url.indexOf("my.nuevaschool.org") is 8

# Background Refresh
stayLoggedIn = (alarm) ->
	if alarm.name is "Background Refresh" and settings.get("bgr")
		#Send start message
		messageAllTabs
			method: "Background Refresh"
			type: "Initiate"

		
		#Ping the Nueva School website
		try
			$.ajax("https://my.nuevaschool.org/").done(->
				messageAllTabs
					method: "Background Refresh"
					type: "Success"

				console.log "Auto refreshed at " + Date()
			).fail ->
				messageAllTabs
					method: "Background Refresh"
					type: "Failure"

				console.log "ERROR: Auto refresh failed at " + Date()
		catch e
			console.log "because of: " + e.message

`sli = stayLoggedIn`

settings = new Store("settings",
	calendarSunday: true
	calendarSaturday: true
	calendarToday: true
	calendarNoSchool: true
	sidebox: false
	bgr: true
	bgrtime: 30
	thermo: true
	logo: true
	hw_due: true
	hw_remind: false
	hw_post: false
	tabname: true
	titlename: true
)
chrome.extension.onMessage.addListener (request, sender, sendResponse) ->
	if request.method is "getLocalStorage"
		sendResponse localStorage: settings.toObject()
	else
		sendResponse {}
	return

chrome.tabs.onUpdated.addListener checkForValidUrl
chrome.alarms.create "Background Refresh",
	periodInMinutes: settings.get("bgrtime")

messageAllTabs = (message) ->
	chrome.tabs.query {}, (tabs) ->
		chrome.tabs.sendMessage tabs[i].id, message for i in [0..tabs.length]

chrome.alarms.onAlarm.addListener stayLoggedIn
