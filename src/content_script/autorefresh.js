var assignments = document.getElementsByClassName("hw_due");

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.method == "backgroundRefresh" && request.assignments != assignments) {
			newAssignments = request.assignments.filter(function(i) {return assignments.indexOf(i) < 0;});
			for (assignment in newAssignments) {
				request.assignmentHash[assignment]
			}
			//location.reload(true);
		}
	}
);