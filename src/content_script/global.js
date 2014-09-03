(function() {
  var id;

  chrome.runtime.sendMessage({
    method: "getLocalStorage"
  }, function(response) {
    var key, value, _ref, _results;
    _ref = response.localStorage;
    _results = [];
    for (key in _ref) {
      value = _ref[key];
      _results.push(localStorage[key] = value);
    }
    return _results;
  });

  if (localStorage.thermo === "true") {
    id = window.setTimeout((function() {}), 0);
    while (id--) {
      window.clearTimeout(id);
    }
    $("#__thermo").remove();
  }

  if (localStorage.logo === "true") {
    $("#mastLeft").children(":first").attr("href", "https://my.nuevaschool.org/");
  }

  $(".footer small").html(function(i, html) {
    return "" + html + "<br>New-eva extension by Yoni Lerner";
  });

}).call(this);
