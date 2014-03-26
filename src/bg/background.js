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
	"logo": true,
	"hw_due": true
});

//Settings dispenser
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


// Background Refresh
chrome.alarms.create("Background Refresh", {"periodInMinutes": settings.get('bgrtime')});

var messageAllTabs = function (message) {
	chrome.tabs.query({}, function(tabs) {
		for (var i = 0; i < tabs.length; ++i) {
			chrome.tabs.sendMessage(tabs[i].id, message);
		}
	});
}

function stayLoggedIn(alarm){
	if (alarm.name == "Background Refresh" && settings.get('bgr')) {
		//Send start message
		messageAllTabs({method: "Background Refresh", type: "Initiate"});
		//Ping the Nueva School
		try {
			$.ajax('https://my.nuevaschool.org/')
			.done(function() {
				messageAllTabs({method: "Background Refresh", type: "Success"});
				console.log("Auto refreshed at " + Date());
			})
			.fail(function() {
				messageAllTabs({method: "Background Refresh", type: "Failure"});
				console.log("ERROR: Auto refresh failed at " + Date());
			});
		} catch (e) {
				console.log("because of: " + e.message);
		}
	}
}
chrome.alarms.onAlarm.addListener(stayLoggedIn);