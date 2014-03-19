// SAMPLE
this.manifest = {
	"name": "New-eva",
	"icon": chrome.extension.getURL("icons/icon128.png"),
	"settings": [
		  {
			"tab": "Visuals",
			"group": "Pictures",
			"name": "calendarSaturday",
			"type": "checkbox",
			"label": "Saturdays"
		},
		{
			"tab": "Visuals",
			"group": "Pictures",
			"name": "calendarSunday",
			"type": "checkbox",
			"label": "Sundays"
		},
		{
			"tab": "Visuals",
			"group": "Pictures",
			"name": "calendarToday",
			"type": "checkbox",
			"label": "The current day"
		},
		{
			"tab": "Visuals",
			"group": "Pictures",
			"name": "calendarNoSchool",
			"type": "checkbox",
			"label": "No school days"
		},
		/*{
			"tab": "Details",
			"group": "Sound",
			"name": "sound_volume",
			"type": "slider",
			"label": "Sound volume:",
			"max": 100,
			"min": 0,
			"step": 1,
			"display": true,
			"displayModifier": function (value) {
				return value + "%";
			}
		},*/
	],
	/*"alignment": [
		[
			"calendarSaturday",
			"calendarSunday",
			"calendarToday",
			"calendarNoSchool"
		]
	]*/
};
