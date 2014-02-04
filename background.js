function checkForValidUrl(tabId, changeInfo, tab) {
	if (tab.url.indexOf('my.nuevaschool.org') == 7 || tab.url.indexOf('my.nuevaschool.org') == 8) {
		chrome.pageAction.show(tabId);
	}
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.alarms.create("Refresh Nueva Page", {"periodInMinutes": localStorage['refreshPeriod'] || 5});

function stayLoggedIn(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", 'https://my.nuevaschool.org/', false);
	xhr.send();
}

chrome.alarms.onAlarm.addListener(stayLoggedIn);