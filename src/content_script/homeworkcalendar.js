(function() {
  var hw_due, img, titlehash, titlehasher;

  if ($(".subnavTitle:contains(Homework Calendar)").length !== 0 || (localStorage.calendar === "true" && $(".subnavTitle:contains(Calendar)").length !== 0)) {
    if (localStorage.hw_due === "true") {
      titlehash = {
        "Advanced Physics": "Physics",
        "Computer Programming Workshop": "Programming",
        "History: Big History 1": "History",
        "Interdisciplinary Studies of Science": "ISS",
        "Math Calculus": "Math",
        "Quest": "Quest",
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
      titlehasher = function(string) {
        string = string.replace(/^For class "(.+)"\.$/, "$1").replace(/^For BLOG (.+)\.$/, "$1").replace(/^\d{1,2}th\/\d{1,2}th (.+)$/, "$1").replace(/^\d{1,2}th Grade (.+)$/, "$1").replace(/^\d{1,2}th (.+)$/, "$1").replace(/^(.+) \d{4}-\d{2}(\.\d)?$/, "$1").replace(/^(.+) \d{4}-\d{4}(\.\d)?$/, "$1").replace(/^(.+) Section \w$/, "$1").replace(/^Elective-(.+)$/, "$1").replace(/^Advisory-.+$/, "Advisory");

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
        $(this).children(":first").html("<span style=\"color: red\">" + title + "</span>: \n" + ($(this).children(":first").html() || "&lt;untitled&gt;"));
        if (comment) {
          comment = comment[1];
          $(this).children(":first").attr("title", $(this));
          return $(this).children(":first").html("" + ($(this).children(":first").html()) + "\n<span style=\"color: green\"> Comment: " + comment + "</span>");
        } else {
          return $(this).children(":first").attr("title", title);
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
