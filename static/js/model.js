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
	$("#history").append(buildHistoryRow(term));
}

/* Utility functions */

function buildHistoryRow(term) {
	return $("<tr id='term-" + term.hashCode() + "'><td class='term'>" +
	          term + "</td><td class='prediction'>" +
	          "<img src='/static/img/loading.gif' />" +
	          "</td></tr>");
}
