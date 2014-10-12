if $(".blogTitle").length isnt 0
	#change assignment title
	if localStorage.titlename is "true"
		$(".blogTitle").text window.titlehasher $(".blogTitle").text()

	#change tab title
	if localStorage.tabname is "true"
		$("title").text window.titlehasher $("title").text()