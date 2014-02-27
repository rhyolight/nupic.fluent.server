/* Main */

$("#input").focus();

$("#input").keydown(function(e) {
	if (e.which == 13) {  // enter
		e.preventDefault();
	}
	else if (e.which == 32) {  // space
		feed($(this).val())

		$(this).val("")
		e.preventDefault();
	}
	else if (e.which == 190) {  // period
		alert('period');

		e.preventDefault();
	}
});

/* API functions */

function feed(term) {
	var row = buildHistoryRow(term);
	$("#history").append(row);

	var url = "/_models/" + window.MODEL_ID + "/feed/" + term;
	$.postq("feed", url, function(data) {
		updateHistoryRow(row, data);
	});
}

/* Utility functions */

function buildHistoryRow(term) {
	return $("<tr><td class='term'>" +
	          term + "</td><td class='prediction'>" +
	          "<img src='/static/img/loading.gif' />" +
	          "</td></tr>");
}

function updateHistoryRow(row, prediction) {
	row.children(".prediction").text(prediction);
}
