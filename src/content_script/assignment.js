(function() {
  window.onNewevaReady(function() {
    if ($(".blogTitle").length !== 0) {
      if (localStorage.titlename === "true") {
        $(".blogTitle").text(window.titlehasher($(".blogTitle").text()));
      }
      if (localStorage.tabname === "true") {
        return $("title").text(window.titlehasher($("title").text()));
      }
    }
  });

}).call(this);
