/* Main */

$("#input").focus();

$("#input").keydown(function(e) {
	if (e.which == 13) {  // enter
		e.preventDefault();
	}
	else if (e.which == 32 || e.which == 190) {  // space or period
		val = $(this).val();
		if (val.length) feed(val);

		if (e.which == 190) {  // period
			reset();
		}

		$(this).val("");
		e.preventDefault();
	}
});

/* API functions */

function feed(term) {
	var row = buildHistoryRow(term);
	$("#history").append(row);

	var url = "/_models/" + window.MODEL_ID + "/feed/" + term;
	$.postq("api", url, function(data) {
		updateHistoryRow(row, data);
	});
}

function reset() {
	row = buildHistoryRowEmpty();
	$("#history").append(row);

	var url = "/_models/" + window.MODEL_ID + "/reset";
	$.postq("api", url, function(data) {});
}

/* DOM functions */

function updateHistoryRow(row, prediction) {
	row.children(".prediction").text(prediction);
}

/* Utility functions */

function buildHistoryRow(term) {
	return $("<tr><td class='term'>" +
	          term + "</td><td class='prediction'>" +
	          "<img src='/static/img/loading.gif' />" +
	          "</td></tr>");
}

function buildHistoryRowEmpty() {
	return $("<tr><td></td></tr>");
}
