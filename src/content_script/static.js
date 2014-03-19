//stop countdown
var id = window.setTimeout(function() {}, 0);

while (id--) {
    window.clearTimeout(id);
}

//make logo go to my.nuevaschool.org
$('#mastLeft').children(':first').attr('href', 'https://my.nuevaschool.org/');


//Remove logout timer bar (visual)
$('#__thermo').parent().remove();


//Add footer text
$('#footer').children(":first").css('width', 'auto').html(' &nbsp; &nbsp;New-eva extension by Yoni Lerner');


//Kill browser warning, .hw_post, and .hw_remind
$('.hw_post,.hw_remind,.errorMessage').remove();