(function() {
  window.onNewevaReady(function() {
    var hw_due, img;
    if ($(".subnavTitle:contains(Homework Calendar)").length !== 0 || (localStorage.calendar === "true" && $(".subnavTitle:contains(Calendar)").length !== 0)) {
      if (localStorage.hw_due === "true") {
        hw_due = $(".hw_due,.hw_remind,.hw_post");
        hw_due.children("em").remove();
        hw_due.children("a").attr("target", "_blank");
        hw_due.css("list-style-type", "none");
        hw_due.each(function() {
          var comment, title;
          comment = /\s+Comment: (.*)$/.exec($(this).children(":first").attr("title"));
          title = window.titlehasher($(this).children(":first").attr("title").replace(/\s+Comment: .*$/, ""));
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
        return $(".hw_post").remove();
      }
    }
  });

}).call(this);
