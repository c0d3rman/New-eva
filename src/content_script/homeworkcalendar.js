(function() {
  var hw_due, img, titlehash, titlehasher;

  if ($(".subnavTitle:contains(Homework Calendar)").length !== 0 || (localStorage.calendar === "true" && $(".subnavTitle:contains(Calendar)").length !== 0)) {
    if (localStorage.hw_due === "true") {
      titlehash = {
        "Comp Sci - Elegant Logic": "Programming",
        "Comp Sci - Computer Science and Programming": "Programming",
        "DT Liquid": "Design Thinking",
        "Service and Design Engineering Plasma": "Design Engineering",
        "English Baldwin": "English",
        "English Euripides": "English",
        "History Rousseau": "History",
        "History Machiavelli": "History",
        "Math Khayyam": "Math",
        "QUEST - All Grade": "Quest",
        "Quest 2": "Quest",
        "Robotics": "Robotics",
        "Robotics FRC Team": "Robotics",
        "Science and Society": "Science and Society",
        "Science Liquid": "Science",
        "Science of Mind Plasma": "Science of Mind",
        "Science of Mind Liquid": "Science of Mind",
        "Spanish Inca": "Spanish",
        "Spanish Azteca": "Spanish",
        "Psychology": "Psychology",
        "DT Solid": "Design Thinking",
        "DT Gas": "Design Thinking",
        "DT Plasma": "Design Thinking",
        "Service and Design Engineering Solid": "Design Engineering",
        "Service and Design Engineering Liquid": "Design Engineering",
        "Service and Design Engineering Gas": "Design Engineering",
        "Science Solid": "Science",
        "Science Gas": "Science",
        "Science Plasma": "Science",
        "Science of Mind Solid": "Science of Mind",
        "Science of Mind Gas": "Science of Mind",
        "English De La Cruz": "English",
        "English Kincaid": "English",
        "English Behn": "English",
        "History Locke": "History",
        "History Hobbes": "History",
        "Math Turing": "Math",
        "Math Ramanujan": "Math",
        "Math Noether": "Math",
        "Comp Sci - Computing in Everything": "Programming",
        "Spanish Maya": "Spanish"
      };
      titlehasher = function(string) {
        string = string.replace(/^For class "\d{1,2}th (.+) Section \w \d{4}-\d{2}\.\d"\.$/, "$1");
        return titlehash[string] || string;
      };
      hw_due = $(".hw_due,.hw_remind,.hw_post");
      hw_due.children("em").remove();
      hw_due.children("a").attr("target", "_blank");
      hw_due.css("list-style-type", "none");
      hw_due.each(function() {
        var comment, title;
        comment = /\s+Comment: (.*)$/.exec($(this).children(":first").attr("title"));
        title = titlehasher($(this).children(":first").attr("title").replace(/\s+Comment: .*$/, ""));
        if (comment) {
          comment = comment[1];
          $(this).children(":first").attr("title", $(this));
          $(this).children(":first").html("<span style=\"color: red\">" + title + "</span>: \n" + ($(this).children(":first").html()) + "\n<span style=\"color: green\"> Comment: " + comment + " </span>");
        } else {
          $(this).children(":first").attr("title", title);
          $(this).children(":first").html("<span style=\"color: red\">" + title + "</span>: " + $(this).children(":first").html());
        }
      });
      $(".hw_remind").css("background-color", "rgba(255,255,0,0.2)");
      $(".hw_post").css("background-color", "rgba(0,255,0,0.2)");
    }
    img = $(document.createElement("img")).css("width", "95%").css("display", "block").css("margin", "0 auto");
    if (localStorage.calendarSunday === "true") {
      $(".calendarDay:first-child").append(img.clone().attr("src", chrome.extension.getURL("images/calendarSunday.png")));
    }
    if (localStorage.calendarSaturday === "true") {
      $(".calendarDay:last-child").append(img.clone().attr("src", chrome.extension.getURL("images/calendarSaturday.png")));
    }
    if (localStorage.calendarNoSchool === "true") {
      $(".calendarNoSchool").append(img.clone().attr("src", chrome.extension.getURL("images/calendarNoSchool.png")));
    }
    if (localStorage.calendarToday === "true") {
      $(".calendarToday").append(img.clone().attr("src", chrome.extension.getURL("images/calendarToday.png")));
    }
    if (localStorage.hw_remind !== "true") {
      $(".hw_remind").remove();
    }
    if (localStorage.hw_post !== "true") {
      $(".hw_post").remove();
    }
  }

}).call(this);
