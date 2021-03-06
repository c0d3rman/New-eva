this.manifest = {
	"name": "New-eva",
	"icon": chrome.extension.getURL("images/icons/icon128.png"),
	"settings": [
		{
			"tab": "Appearance",
			"group": "General Fixes",
			"name": "logo",
			"type": "checkbox",
			"label": "Make logo go to \"My Homepage\""
		},
		{
			"tab": "Appearance",
			"group": "General Fixes",
			"name": "calendar",
			"type": "checkbox",
			"label": "Enable features on calendars except the homework calendar"
		},
		{
			"tab": "Assignments",
			"group": "Visuals",
			"name": "hw_due",
			"type": "checkbox",
			"label": "Make assignments prettier"
		},
		{
			"tab": "Assignments",
			"group": "Assignment Pages",
			"type": "description",
			"text": "These settings affect pages of individual assignments (and blogs.)"
		},
		{
			"tab": "Assignments",
			"group": "Assignment Pages",
			"name": "tabname",
			"type": "checkbox",
			"label": "Change tab name to human friendly title"
		},
		{
			"tab": "Assignments",
			"group": "Assignment Pages",
			"name": "titlename",
			"type": "checkbox",
			"label": "Change page title to human friendly title"
		},
		{
			"tab": "Assignments",
			"group": "Other Assignments",
			"name": "hw_remind",
			"type": "checkbox",
			"label": "Show homework reminders (yellow)"
		},
		{
			"tab": "Assignments",
			"group": "Other Assignments",
			"name": "hw_post",
			"type": "checkbox",
			"label": "Show homework postings (green)"
		},
		
		{
			"tab": "Appearance",
			"group": "Pictures",
			"name": "calendarSaturday",
			"type": "checkbox",
			"label": "Saturdays"
		},
		{
			"tab": "Appearance",
			"group": "Pictures",
			"name": "calendarSunday",
			"type": "checkbox",
			"label": "Sundays"
		},
		{
			"tab": "Appearance",
			"group": "Pictures",
			"name": "calendarToday",
			"type": "checkbox",
			"label": "The current day"
		},
		{
			"tab": "Appearance",
			"group": "Pictures",
			"name": "calendarNoSchool",
			"type": "checkbox",
			"label": "No school days"
		},
		{
			"tab": "Appearance",
			"group": "Other",
			"name": "mark_other_month_days",
			"type": "checkbox",
			"label": "Mark days that aren't actually in this month on the homework calendar.\nThose days don't load assignments and so are confusing."
		},
		{
			"tab": "Log-Out Prevention",
			"group": "Thermo Bar",
			"type": "description",
			"text": "The \"Thermo Bar\" is the little blue bar in the top right that turns red over time.\
			When it's all red, a little dialog box will popup notifying you that you have been signed out.\
			You can disable the functionality and hide the bar."
		},
		{
			"tab": "Log-Out Prevention",
			"group": "Thermo Bar",
			"name": "thermo",
			"type": "checkbox",
			"label": "Hide thermo bar and disable logout popup"
		},
		{
			"tab": "Log-Out Prevention",
			"group": "Background Refresh",
			"type": "description",
			"text": "Background refresh is a feature which \"tells\" the Nueva website that you are still there.\
			If you don't tell the Nueva website this for 60 minutes, it will log you out. \
			However, the more often you update, the less chance you'll be logged out when you don't have WiFi."
		},
		{
			"tab": "Log-Out Prevention",
			"group": "Background Refresh",
			"name": "bgr",
			"type": "checkbox",
			"label": "Enable background refresh"
		},
		{
			"tab": "Log-Out Prevention",
			"group": "Background Refresh",
			"name": "bgrtime",
			"type": "slider",
			"label": "Background refresh every:",
			"max": 60,
			"min": 5,
			"step": 5,
			"display": true,
			"displayModifier": function (value) {
				chrome.alarms.clear("Background Refresh");
				chrome.alarms.create("Background Refresh", {"delayInMinutes": 1, "periodInMinutes": value});
				return value + " minutes";
			}
		},
		{
			"tab": "Other",
			"group": "Resources",
			"type": "description",
			"text": "If you would like to revisit the new install page, click <a href=\"/src/install_page/install.html\">here</a>."
		},
	],
};