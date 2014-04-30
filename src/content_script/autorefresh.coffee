assignments = document.getElementsByClassName "hw_due"

chrome.extension.onMessage.addListener (request, sender, sendResponse) ->
	if request.method is "backgroundRefresh" and request.assignments isnt assignments
		newAssignments = request.assignments.filter((i) ->
			assignments.indexOf(i) < 0
		)
		for assignment of newAssignments
			request.assignmentHash[assignment]
	return


#location.reload(true);
