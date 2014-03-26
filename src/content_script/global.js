//fetch settings and dump them into localStorage
chrome.runtime.sendMessage({method: "getLocalStorage"}, function(response) {
	for (var key in response.localStorage) {
	  if (response.localStorage.hasOwnProperty(key)) {
		localStorage[key] = response.localStorage[key];
	  }
	}
});

if (localStorage.thermo == "true") {
	//stop countdown
	var id = window.setTimeout(function() {}, 0);

	while (id--) {
		window.clearTimeout(id);
	}
	//Remove logout timer bar (visual)
	$('#__thermo').parent().remove();
}

if (localStorage.logo == "true") {
	//make logo go to my.nuevaschool.org
	$('#mastLeft').children(':first').attr('href', 'https://my.nuevaschool.org/');
}

//Add footer text
$('#footer').children(":first").css('width', 'auto').html(' &nbsp; &nbsp;New-eva extension by Yoni Lerner');


//Kill browser warning
$('.errorMessage').remove();