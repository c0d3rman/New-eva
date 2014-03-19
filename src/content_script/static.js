chrome.runtime.sendMessage({method: "getLocalStorage"}, function(response) {
	var settings = response.localStorage;
	
	if (settings.thermo) {
		//stop countdown
		var id = window.setTimeout(function() {}, 0);

		while (id--) {
			window.clearTimeout(id);
		}
		//Remove logout timer bar (visual)
		$('#__thermo').parent().remove();
	}

	if (settings.logo) {
		//make logo go to my.nuevaschool.org
		$('#mastLeft').children(':first').attr('href', 'https://my.nuevaschool.org/');
	}
});

//Add footer text
$('#footer').children(":first").css('width', 'auto').html(' &nbsp; &nbsp;New-eva extension by Yoni Lerner');


//Kill browser warning, .hw_post, and .hw_remind
$('.hw_post,.hw_remind,.errorMessage').remove();