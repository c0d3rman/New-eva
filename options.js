//Adapted from google manual

// Hash of defaults
var defaults = {
	//format:
	//'id': 'default';
	'weekend': '1',
};

// Saves options to localStorage.
function save_options() {
	var weekend = document.getElementById("weekend");
	var selectedIndex;
	for (var i = 0; i < weekend.children.length; i++) {
		if (inputs[i].checked) {
			selectedIndex = inputs[i].value;
		}
	}

	var weekendchecked = weekend.children[selectedIndex].value;
	localStorage["weekend"] = weekendchecked;
	
	localStorage["refreshPeriod"] = document.getElementById('refresh').value;

	// Update status to let user know options were saved.
	var status = document.getElementById("status");
	status.innerHTML = "Options Saved.";
	setTimeout(function() {
	status.innerHTML = "";
	}, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var weekendchecked = localStorage["weekend"];
  if (!weekendchecked) {
    weekendchecked = defaults['weekend'];
  }
  var select = document.getElementById("weekend");
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == weekendchecked) {
      child.selected = "true";
      break;
    }
  }
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);