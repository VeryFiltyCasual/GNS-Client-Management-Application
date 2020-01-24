$(document).ready( function() {

	$("h1").button({
		icon: "ui-icon-triangle-1-n"
	});
	
	//displays the client information when clicking on an li
	$("h1").click(function() {			
		var thisSection = $(this).next().next().slideToggle(400);
		
		//flip icon
		if ($(this).find(".ui-icon").hasClass("ui-icon-triangle-1-s"))
			$(this).button("option", "icon", " ui-icon-triangle-1-n");
		else
			$(this).button("option", "icon", " ui-icon-triangle-1-s");
	});
				
	
});