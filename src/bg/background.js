(function() {
  var checkForValidUrl, messageAllTabs, settings, stayLoggedIn;

  checkForValidUrl = function(tabId, changeInfo, tab) {
    if (tab.url.indexOf("my.nuevaschool.org") === 7 || tab.url.indexOf("my.nuevaschool.org") === 8) {
      return chrome.pageAction.show(tabId);
    }
  };

  stayLoggedIn = function(alarm) {
    var e;
    if (alarm.name === "Background Refresh" && settings.get("bgr")) {
      messageAllTabs({
        method: "Background Refresh",
        type: "Initiate"
      });
      try {
        return $.ajax("https://my.nuevaschool.org/").done(function() {
          messageAllTabs({
            method: "Background Refresh",
            type: "Success"
          });
          return console.log("Auto refreshed at " + Date());
        }).fail(function() {
          messageAllTabs({
            method: "Background Refresh",
            type: "Failure"
          });
          return console.log("ERROR: Auto refresh failed at " + Date());
        });
      } catch (_error) {
        e = _error;
        return console.log("because of: " + e.message);
      }
    }
  };

  sli = stayLoggedIn;

  settings = new Store("settings", {
    calendarSunday: true,
    calendarSaturday: true,
    calendarToday: true,
    calendarNoSchool: true,
    sidebox: false,
    bgr: true,
    bgrtime: 30,
    thermo: true,
    logo: true,
    hw_due: true,
    hw_remind: false,
    hw_post: false
  });

  chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method === "getLocalStorage") {
      sendResponse({
        localStorage: settings.toObject()
      });
    } else {
      sendResponse({});
    }
  });

  chrome.tabs.onUpdated.addListener(checkForValidUrl);

  chrome.alarms.create("Background Refresh", {
    periodInMinutes: settings.get("bgrtime")
  });

  messageAllTabs = function(message) {
    return chrome.tabs.query({}, function(tabs) {
      var i, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = tabs.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push(chrome.tabs.sendMessage(tabs[i].id, message));
      }
      return _results;
    });
  };

  chrome.alarms.onAlarm.addListener(stayLoggedIn);

}).call(this);
