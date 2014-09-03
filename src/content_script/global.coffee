#fetch settings and dump them into localStorage
chrome.runtime.sendMessage
	method: "getLocalStorage", (response) ->
		localStorage[key] = value for key, value of response.localStorage

if localStorage.thermo is "true"
	#stop countdown
	id = window.setTimeout((->), 0)
	window.clearTimeout id while id--
	
	#Remove logout timer bar (visual)
	$("#__thermo").remove()

#make logo go to my.nuevaschool.org
$("#mastLeft").children(":first").attr "href", "https://my.nuevaschool.org/" if localStorage.logo is "true"

#Add footer text
$(".footer small").html (i, html) -> "#{html}<br>New-eva extension by Yoni Lerner"