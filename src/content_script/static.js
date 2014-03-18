//Inject dynamictag.js (credit to StackOverflow user Rob W)
function inject (file) {
	var s = document.createElement('script');
	s.src = chrome.extension.getURL(file);
	s.onload = function() {
		this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(s);
};
inject("src/content_script/dynamictag.js"); //inject dynamic script tag


//make logo go to my.nuevaschool.org
$('#mastLeft').children(':first').attr('href', 'https://my.nuevaschool.org/');


//Remove logout timer bar (visual)
$('#__thermo').parent().remove();


//Add footer text
$('#footer').children(":first").css('width', 'auto').html(' &nbsp; &nbsp;New-eva extension by Yoni Lerner');


//Kill browser warning, .hw_post, and .hw_remind
$('.hw_post,.hw_remind,.errorMessage').remove();