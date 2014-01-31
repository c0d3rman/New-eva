function checkForValidUrl(tabId, changeInfo, tab) {
	if (tab.url.indexOf('my.nuevaschool.org') == 7 || tab.url.indexOf('my.nuevaschool.org') == 8) {
		chrome.pageAction.show(tabId);
	}
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);

//var go = true;

function stayLoggedIn(timeout){
//	if (go) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", 'https://my.nuevaschool.org/', true);
		/*xhr.addEventListener("load", function(e) {
			if (xhr.responseText.match(/The Nueva School Home/)) {
				console.log(xhr.responseText);
				go = false;
			}
		}, false)*/
		xhr.send();
		setTimeout(stayLoggedIn, timeout, timeout);
//	}
}

stayLoggedIn(90000);