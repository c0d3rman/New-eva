// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

//var settings = new Store("settings", {
//	"sample_setting": "This is how you use Store.js to remember values"
//});

//example of using a message handler from the inject scripts
/*chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		chrome.pageAction.show(sender.tab.id);
		sendResponse();
	});*/
	

// show Page Action	
function checkForValidUrl(tabId, changeInfo, tab) {
	if (tab.url.indexOf('my.nuevaschool.org') == 7 || tab.url.indexOf('my.nuevaschool.org') == 8) {
		chrome.pageAction.show(tabId);
	}
};
chrome.tabs.onUpdated.addListener(checkForValidUrl);


// Auto Refresh
chrome.alarms.create("Refresh Nueva Page", {"periodInMinutes": 5});
function stayLoggedIn(){
	$.ajax('https://my.nuevaschool.org/')
	.done(function() {
		console.log("Auto refreshed at " + Date());
	})
	.fail(function() {
		console.log("ERROR: Auto refresh failed at " + Date());
	});
}
chrome.alarms.onAlarm.addListener(stayLoggedIn);