/* Main */

reset();

positionBottom();

$(window).resize(function() {
	positionBottom();
	scrollToBottom();
});

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

		positionBottom();
		scrollToBottom();
	}
});

/* API functions */

function feed(term) {
	// Strip invalid characters
	term = term.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
	
	var row = appendHistoryRow(term);

	var url = "/_models/" + window.MODEL_ID + "/feed/" + term;
	$.postq("api", url, function(data) {
		updateHistoryRow(row, data[0]);
	});
}

function reset() {
	var row = appendHistoryRowEmpty();

	var url = "/_models/" + window.MODEL_ID + "/reset";
	$.postq("api", url, function(data) {});
}

/* DOM functions */

function appendHistoryRow(term) {
	row = $("<ul class='history-item small-block-grid-2'>" +
	        "<li class='term'>" + term + "</li>" +
	        "<li class='prediction'>" +
	        "<img src='/static/img/loading.gif' />" +
	        "</li>" +
	        "</ul>");
	$("#history").append(row);
	return row;
}

function appendHistoryRowEmpty() {
	row = $("<hr>");
	$("#history").append(row);
	return row;
}

function updateHistoryRow(row, prediction) {
	row.children(".prediction").text(prediction.term.string);
}

function positionBottom() {
	mainContent = $("#main-content");

	position = mainContent.parent().height() -
	           mainContent.height() -
	           20;  // padding
	position = Math.max(0, position);

	mainContent.offset({"top": position});
}

function scrollToBottom() {
	mainWindow = $("#main-window");
	mainWindow.scrollTop(mainWindow.prop("scrollHeight"));
}
