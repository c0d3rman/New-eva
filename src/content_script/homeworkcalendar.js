(function() {
  var hw_due, img, titlehash, titlehasher;

  if ($(".subNavTitle:contains(Homework Calendar)").length !== 0 || (localStorage.calendar === "true" && $(".subNavTitle:contains(Calendar)").length !== 0)) {
    if (localStorage.hw_due === "true") {
      titlehash = {
        "For class \"9th CESL\".": "CESL",
        "For class \"9th Comp Sci - Elegant Logic 2013-2014.1\".": "Programming",
        "For class \"9th Comp Sci - Computer Science and Programming 2013-2014.1\".": "Programming",
        "For class \"9th DT Liquid 2013-2014.1\".": "Design Thinking",
        "For class \"9th Service and Design Engineering Plasma 2013-2014.1\".": "Design Engineering",
        "For class \"9th English Baldwin 2013-2014.1\".": "English",
        "For class \"9th English Euripides 2013-2014.1\".": "English",
        "For class \"9th History Rousseau 2013-2014.1\".": "History",
        "For class \"9th History Machiavelli 2013-2014.1\".": "History",
        "For class \"9th Math Khayyam 2013-2014.1\".": "Math",
        "For class \"9th QUEST - All Grade 2013-2014.1\".": "Quest",
        "For class \"9th Quest 2 2013-2014.1\".": "Quest",
        "For class \"9th Robotics 2013-2014.1\".": "Robotics",
        "For class \"9th Robotics FRC Team 2013-2014.1\".": "Robotics",
        "For class \"9th Science and Society 2013-2014.1\".": "Science and Society",
        "For class \"9th Science Liquid 2013-2014.1\".": "Science",
        "For class \"9th Science of Mind Plasma 2013-2014.1\".": "Science of Mind",
        "For class \"9th Science of Mind Liquid 2013-2014.1\".": "Science of Mind",
        "For class \"9th Spanish Inca 2013-2014.1\".": "Spanish",
        "For class \"9th Spanish Azteca 2013-2014.1\".": "Spanish",
        "For class \"9th Psychology 2013-2014.2\".": "Psychology",
        "For class \"9th DT Solid 2013-2014.1\".": "Design Thinking",
        "For class \"9th DT Gas 2013-2014.1\".": "Design Thinking",
        "For class \"9th DT Plasma 2013-2014.1\".": "Design Thinking",
        "For class \"9th Service and Design Engineering Solid 2013-2014.1\".": "Design Engineering",
        "For class \"9th Service and Design Engineering Liquid 2013-2014.1\".": "Design Engineering",
        "For class \"9th Service and Design Engineering Gas 2013-2014.1\".": "Design Engineering",
        "For class \"9th Science Solid 2013-2014.1\".": "Science",
        "For class \"9th Science Gas 2013-2014.1\".": "Science",
        "For class \"9th Science Plasma 2013-2014.1\".": "Science",
        "For class \"9th Science of Mind Solid 2013-2014.1\".": "Science of Mind",
        "For class \"9th Science of Mind Gas 2013-2014.1\".": "Science of Mind",
        "For class \"9th English De La Cruz 2013-2014.1\".": "English",
        "For class \"9th English Kincaid 2013-2014.1\".": "English",
        "For class \"9th English Behn 2013-2014.1\".": "English",
        "For class \"9th History Locke 2013-2014.1\".": "History",
        "For class \"9th History Hobbes 2013-2014.1\".": "History",
        "For class \"9th Math Turing 2013-2014.1\".": "Math",
        "For class \"9th Math Ramanujan 2013-2014.1\".": "Math",
        "For class \"9th Math Noether 2013-2014.1\".": "Math",
        "For class \"9th Comp Sci - Computing in Everything 2013-2014.1\".": "Programming",
        "For class \"9th Spanish Maya 2013-2014.1\".": "Spanish"
      };
      titlehasher = function(string) {
        string = string.replace(/\d{4}-\d{4}\.\d/, "2013-2014.1");
        return titlehash[string];
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
