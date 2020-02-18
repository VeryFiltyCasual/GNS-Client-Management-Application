$(document).ready(function(){

$("#dialogError").dialog({
	autoOpen: false,
	modal: true,
	title: "Error",
	  buttons: [
		{
		  text: "Ok",
		  click: function() {
			$( this ).dialog( "close" );
		  }
		}
	  ]
});

$(".Save").click(function(){
	let error = false;
	
	$("input").each(function(){
		if (!aString($(this).val()))
			error = true;
	});
	if (error){
		$("#dialogError").dialog("open");
		return;
	}
	
	//console.log(createAddMessage());
	ipcRenderer.send("AddClient", createAddMessage());
});

});