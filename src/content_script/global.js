(function() {
  var id;

  chrome.runtime.sendMessage({
    method: "getLocalStorage"
  }, function(response) {
    var key, _i, _len, _ref, _results;
    _ref = response.localStorage;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      if (response.localStorage.hasOwnProperty(key)) {
        _results.push(localStorage[key] = response.localStorage[key]);
      }
    }
    return _results;
  });

  if (localStorage.thermo === "true") {
    id = window.setTimeout((function() {}), 0);
    while (id--) {
      window.clearTimeout(id);
    }
    $("#__thermo").parent().remove();
  }

  if (localStorage.logo === "true") {
    $("#mastLeft").children(":first").attr("href", "https://my.nuevaschool.org/");
  }

  $("#footer").children(":first").css("width", "auto").html(" &nbsp; &nbsp;New-eva extension by Yoni Lerner");

}).call(this);
