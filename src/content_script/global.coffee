#fetch settings and dump them into localStorage
chrome.runtime.sendMessage
	method: "getLocalStorage", (response) ->
		localStorage[key] = response.localStorage[key] for key in response.localStorage when response.localStorage.hasOwnProperty(key)

if localStorage.thermo is "true"
	#stop countdown
	id = window.setTimeout((->), 0)
	window.clearTimeout id while id--
	
	#Remove logout timer bar (visual)
	$("#__thermo").parent().remove()

#make logo go to my.nuevaschool.org
$("#mastLeft").children(":first").attr "href", "https://my.nuevaschool.org/" if localStorage.logo is "true"

#Add footer text
$("#footer").children(":first").css("width", "auto").html " &nbsp; &nbsp;New-eva extension by Yoni Lerner"

#Kill browser warning
$(".errorMessage").remove()
