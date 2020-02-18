const { ipcRenderer } = require('electron');
let cli = ipcRenderer.sendSync("getID");

$(document).ready(function(){
fillInputs();

/************************************
************SHOW HIDE***************
************************************/	

	/*********CHECK/RADIO*********/
	$(".HiderCheck").each(function(){
		if(!$(this).is(":checked"))
			$(this).next().hide();
		
	});
	$(".HiderRadio").each(function(){
		if(!$(this).is(":checked"))
			$(this).next().hide();
		
	});

	$(".HiderCheck").change(function(){
		if(this.checked)
			$(this).next().show();
		else
			$(this).next().hide();
	});

	$("input[type='radio']").change(function(){
		let radioGroup = $(this).attr("name");
		
		$("input[name='" + radioGroup + "'].HiderRadio")
		.each(function(){
			$(this).next().hide();
			
			if(this.checked)
				$(this).next().show();
		});
	});

	// autoresize the textarea
	$(".Resize").on('input', function() {
		this.style.height = 'auto';
		this.style.height =  (this.scrollHeight) + 'px';
	});

	// click checkbox to reveal textbox, hide when checkbox is unclicked
	if (!$(".chkShowHideKit").is(":checked"))
		$(".ShowHideKit").hide();
			
	if (!$(".chkShowHideVan").is(":checked"))
		$(".ShowHideVan").hide();
		
	// kitchen section
	$(".chkShowHideKit").click(function() {            
		if ($(this).is(":checked"))
			$(".ShowHideKit").show();
		else
			$(".ShowHideKit").hide();
	});

	// vanity section
	$(".chkShowHideVan").click(function() {                
		if ($(this).is(":checked"))
			$(".ShowHideVan").show();
		else
			$(".ShowHideVan").hide();
	});
	
	/*******ACCORDIAN STYLE*****/
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


/************************************
************CHANGE FORM*************
************************************/
	// Adds a date and comment to the Notes/Estimates section		
	$("#addDate").on("click" ,function() {
		var followUpHtml = "<ul class='Comments'><li><input type='text' class='Datepick'/> - <textarea class='Resize bigTextBox'/></li></ul>"
		$("#follow_up").append(followUpHtml);
		
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
	
	$("#openSideNav").on("click", function(event){
		$("#theSideNav").css({
			"width":  "11em",
		});
		$(this).hide();
		event.preventDefault();
	});
	$("#closeSideNav").on("click", function(){
		$("#theSideNav").css({
			"width": "0",
		});
		$("#openSideNav").show();
	});
	
	//$("<br>").insertBefore("label");
	$("<br>").insertBefore("#Dates label");
	
	$("select").prepend("<option value='' ></option>");
	
	$(".SaveSect").click(function(e) {
		e.preventDefault();
		let thisSection = $(this).parent();		
		let messageData = createUpdateMessage(thisSection);
		
		console.log(messageData);
		ipcRenderer.send("UpdateClient", messageData) //[DEV]
	});	
	
	$(".Datepick").datepicker({
		changeMonth: true,
		changeYear: true,
		firstDay: 0,
		showAnim: "blind",
	});
	
	$(".Datepick").attr("placeholder", "Datepicker").attr("readonly", "true");

	//Populate the sinks
	var sinkIDs = [
		// aurora glass sinks
		"S216",
		"S616",
		"S016",
		"S626",
		"S516",
		"S536",
		"S416",
		"S126",
		"S146",
		// blanco sinks
		"440184",
		"440182",
		"440185",
		"440179",
		"440177",
		"440144",
		"441634",
		"440210",
		"441475",
		// porcelain sinks
		"CH-435",
		"CH-485",
		"CH-855",
		"CH-535",
		"CH-935",
		"CH-851",
		"CH-433",
		"CH-485",
		"CH-483",
		"CH-833",
		"CH-533",
		"CH-933",
		// stainless steel sinks
		"TU-005",
		"TU-003",
		"HA120",
		"PAUD21",
		"TU-001",
		"TU-002",
		"TU-004",
		"TU-013",
		"PAUS19",
		"TU-006",
		"US301",
		"TU-650",
		"TU-0805"
	];
	var faucetIDs = [
		"110-KVD-CYSS-AD-Z",
		"7042-BN",
		"708-C",
		"725-BN",
		"754-BN",
		"772-BN",
		"51180-20",
		"51180-72",
		"51190-20",
		"63451-72",
		"51190-72",
		"WATERLOO",
		"WL-K-110010",
		"WL-K-120000",
		"WL-K-120500",
		"WL-R-14000"
	];

	// Fill the sink select boxes
	$.each(sinkIDs, function(index, val){
		$("#kitchen_sink_num").append($("<option></option>").val(val).text(val));
		$("#vanity_sink_num").append($("<option></option>").val(val).text(val));
	});

	// Fill the faucet select boxes
	$.each(faucetIDs, function(index, val){
		$("#kitchen_faucet_num").append($("<option></option>").val(val).text(val));
		$("#vanity_faucet_num").append($("<option></option>").val(val).text(val));
	});

});