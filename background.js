function checkForValidUrl(tabId, changeInfo, tab) {
  if (tab.url.indexOf('my.nuevaschool.org') == 7 || tab.url.indexOf('my.nuevaschool.org') == 8) {
    chrome.pageAction.show(tabId);
  }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);