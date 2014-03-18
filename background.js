//Get hash of title-text -> class name
var titlehash = {};
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
		for (line in xhr.responseText.split(/\r\n|\r|\n/)) {
			var kv = line.split(",");
			titlehash[kv[0]] = kv[1];
		}
		//console.log(titlehash);
		chrome.storage.local.set({'titlehash': titlehash});
    }
}

xhr.open("GET", 'http://txt.do/12ex/raw', true);
xhr.send();

function checkForValidUrl(tabId, changeInfo, tab) {
	if (tab.url.indexOf('my.nuevaschool.org') == 7 || tab.url.indexOf('my.nuevaschool.org') == 8) {
		chrome.pageAction.show(tabId);
	}
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.alarms.create("Refresh Nueva Page", {"periodInMinutes": localStorage['refreshPeriod'] || 5});

function stayLoggedIn(){
	var xhr2 = new XMLHttpRequest();
	xhr2.open("GET", 'https://my.nuevaschool.org/', false);
	xhr2.send();
}

chrome.alarms.onAlarm.addListener(stayLoggedIn);