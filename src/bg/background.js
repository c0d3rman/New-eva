// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

var settings = new Store("settings", {
	"calendarSunday": true,
	"calendarSaturday": true,
	"calendarToday": true,
	"calendarNoSchool": true,
	"sidebox": false,
	"bgr": true,
	"bgrtime": 30,
	"thermo": true,
	"logo": true
});

//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.method == "getLocalStorage") {
			sendResponse({localStorage: settings.toObject()});
		} else {
			sendResponse({});
		}
	}
);
	

// show Page Action	
function checkForValidUrl(tabId, changeInfo, tab) {
	if (tab.url.indexOf('my.nuevaschool.org') == 7 || tab.url.indexOf('my.nuevaschool.org') == 8) {
		chrome.pageAction.show(tabId);
	}
};
chrome.tabs.onUpdated.addListener(checkForValidUrl);


// Auto Refresh
if (settings.bgr) {
	chrome.alarms.create("Refresh Nueva Page", {"delayInMinutes": settings.bgrtime});
}
function stayLoggedIn(){
	if (settings.bgr) {
		$.ajax('https://my.nuevaschool.org/')
		.done(function() {
			console.log("Auto refreshed at " + Date());
			chrome.alarms.create("Refresh Nueva Page", {"delayInMinutes": settings.bgrtime});
		})
		.fail(function() {
			console.log("ERROR: Auto refresh failed at " + Date());
		});
	}
}
chrome.alarms.onAlarm.addListener(stayLoggedIn);