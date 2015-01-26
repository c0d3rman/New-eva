(function() {
  chrome.runtime.sendMessage({
    method: "getLocalStorage"
  }, function(response) {
    var key, value, _ref;
    _ref = response.localStorage;
    for (key in _ref) {
      value = _ref[key];
      localStorage[key] = value;
    }
    return window.dispatchEvent(new Event("New-eva Ready"));
  });

  window.titlehash = {
    "Advanced Physics": "Physics",
    "Advanced Physics II": "Physics",
    "Computer Programming Workshop": "Programming",
    "History: Big History 1": "History",
    "History: Big History 2": "History",
    "Interdisciplinary Studies of Science": "ISS",
    "Math Calculus": "Math",
    "Quest": "Quest",
    "Spanish I": "Spanish",
    "Spanish II": "Spanish",
    "Spanish III": "Spanish",
    "Spanish IV": "Spanish",
    "Comp Sci - Computer Science and Programming": "Programming",
    "Comp Sci - Computing in Everything": "Programming",
    "Comp Sci - Elegant Logic": "Programming",
    "DT Gas": "Design Thinking",
    "DT Liquid": "Design Thinking",
    "DT Plasma": "Design Thinking",
    "DT Solid": "Design Thinking",
    "English Baldwin": "English",
    "English Behn": "English",
    "English De La Cruz": "English",
    "English Euripides": "English",
    "English Kincaid": "English",
    "History Hobbes": "History",
    "History Locke": "History",
    "History Machiavelli": "History",
    "History Rousseau": "History",
    "Math Khayyam": "Math",
    "Math Noether": "Math",
    "Math Ramanujan": "Math",
    "Math Turing": "Math",
    "Psychology": "Psychology",
    "QUEST - All Grade": "Quest",
    "Quest 2": "Quest",
    "Robotics FRC Team": "Robotics",
    "Robotics": "Robotics",
    "Science and Society": "Science and Society",
    "Science Gas": "Science",
    "Science Liquid": "Science",
    "Science of Mind Gas": "Science of Mind",
    "Science of Mind Liquid": "Science of Mind",
    "Science of Mind Plasma": "Science of Mind",
    "Science of Mind Solid": "Science of Mind",
    "Science Plasma": "Science",
    "Science Solid": "Science",
    "Service and Design Engineering Gas": "Design Engineering",
    "Service and Design Engineering Liquid": "Design Engineering",
    "Service and Design Engineering Plasma": "Design Engineering",
    "Service and Design Engineering Solid": "Design Engineering",
    "Spanish Azteca": "Spanish",
    "Spanish Inca": "Spanish",
    "Spanish Maya": "Spanish"
  };

  window.titlehasher = function(string) {
    string = string.replace(/^[\s\u00a0]*(.+?)[\s\u00a0]*$/, "$1").replace(/^(.+) Blog$/, "$1").replace(/^For class "(.+)"\.$/, "$1").replace(/^For BLOG (.+)\.$/, "$1").replace(/^\d{1,2}th\/\d{1,2}th (.+)$/, "$1").replace(/^\d{1,2}th Grade (.+)$/, "$1").replace(/^\d{1,2}th (.+)$/, "$1").replace(/^(.+) \d{4}-\d{2}(\.\d)?$/, "$1").replace(/^(.+) \d{4}-\d{4}(\.\d)?$/, "$1").replace(/^(.+) Section \w$/, "$1").replace(/^Elective-(.+)$/, "$1").replace(/^(Advisory)-.+$/, "$1");
    return titlehash[string] || string;
  };

  window.onNewevaReady = function(callback) {
    return window.addEventListener("New-eva Ready", callback);
  };

  window.onNewevaReady(function() {
    var id;
    if (localStorage.thermo === "true") {
      id = window.setTimeout((function() {}), 0);
      while (id--) {
        window.clearTimeout(id);
      }
      $("#__thermo").remove();
    }
    if (localStorage.logo === "true") {
      $(".col-md-2").children().first().attr("href", "https://my.nuevaschool.org/");
    }
    return $(".footer small").html(function(i, html) {
      return "" + html + "<br>New-eva extension by Yoni Lerner";
    });
  });

}).call(this);
