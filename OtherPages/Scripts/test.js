$(document).ready(function() {
	// Adds a date and comment to the Notes/Estimates section
	
	$("#addDate").on("click" ,function() {
		var followUpHtml = "<ul class='Comments'><li><input type='text' class='Datepick'/> - <textarea class='Resize bigTextBox'/></li></ul>"
		$("#ulFollowUp").append(followUpHtml);
		
		// Allow datepicker functionality
		$(".Datepick").datepicker({
			changeMonth: true,
			changeYear: true,
			firstDay: 0,
			showAnim: "blind",
		});
		$(".Datepick").attr("placeholder", "Datepicker").attr("readonly", "true");
		
		// Allow textarea to autoresize
		$(".Resize").on('input', function() {
			this.style.height = 'auto';
			this.style.height =  (this.scrollHeight) + 'px';
		});
		
		// Make sure button doesn't refresh the page
		event.preventDefault();
	});
});
