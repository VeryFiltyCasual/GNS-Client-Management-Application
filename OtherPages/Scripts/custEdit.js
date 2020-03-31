const { ipcRenderer } = require('electron');
let cli = ipcRenderer.sendSync("getID");

let bogus = {
	"id" : 0,
	"first_name" : "Jeremy",
	"last_name" : "Oosterbananas",
	"stage" : 1,	
	"date_added": "2012-03-29T10:05:45-06:00",
	
	//basic
	"phone" : "14789999999",
	"email" : "MichiganFan@email",
	"street_address" : "123 Ooster Bouevarde",
	"city" : "Dayton",
	"state" : "Ohio",
	"zip" : "12345",

	"contractor": "Turtle Man",
	"contractor_phone": "14789999999",
	"contractor_email": "coolguy@email.com",
	
	
	"project" : "",
	"cabinet": "",
	"appliances": "",
	"floor": "",
	"other": "",
	
	//materials
	"materials_kit": "",
	"materials_van_other": "",
	"slab_num": "",
	"tile_bs": null,
	"slabrem_marked": true,
		"slabrem_marked_N": "",
	
	"profile_std": false,
	"profile_prem": true,
		"profile_prem_L": 12,
	"profile_rad": false,
		"profile_rad_L": null,
	"profile_backs": false,
	"profile_bars": true,
	
	//kitchen
	"kitchen_pkg": true,
	"kitchen_sink_num": "",
	"kitchen_grids": false,
	"kitchen_strainer": false,
	"kitchen_faucet_num": "",
	"kitchen_cutboard": false,
	"kitchen_soap_disp": false,
	"kitchen_cut_sink": 2,
	"kitchen_hole": 2,
	"kitchen_cook_top": false,
	"kitchen_brackets": true,
		"kitchen_brackets_qty": 8,
		"kitchen_brackets_size": 2,
		"kitchen_install": false,
	"kitchen_tear": "",
	"kitchen_plumb": "",
	
	//vanity
	"vanity_pkg": true,
	"vanity_cut_sink": 4,
	"vanity_hole": 3,	
	"vanity_sink_num": "",	
	"vanity_sink_qty": 2,
	"vanity_facuet_num": "",
	"vanity_facuet_qty": 2,
	"vanity_drain": false,
		"vanity_drain_qty": null,
	"vanity_tear": "",
	"vanity_plumb": "",
	
	//$$$
	"estimated_qty": 420.69,
	"actual_qty": 449.99,
	"estimate": "", //for the work?
	"installation_N": "",
	
	//availability + scheduling
	"availability": "",
		//schedule
	"schedule_template": "2012-06-02T10:05:45-06:00", 	"schedule_tear": null,
		"schedule_tear_con": null,
	"schedule_brackets": "2012-06-02T10:05:45-06:00",
		"schedule_brackets_con": true,
	"schedule_install_drop": "2012-06-02T10:05:45-06:00",
	"schedule_plumb": "2012-06-02T10:05:45-06:00",
		"schedule_plumb_con": false,
		//order + service
	"customer_inv_sent": "2012-06-02T10:05:45-06:00",
	"customer_conf_rvd": "2012-06-02T10:05:45-06:00",
	"customer_srv_call": "2012-06-02T10:05:45-06:00",
		"customer_srv_call_res": "y",
	"customer_srv_sch": "2012-06-02T10:05:45-06:00",
	"customer_srv_comp": true,
		"customer_srv_comp_D" : "2012-06-02T10:05:45-06:00",
		//customer picked up
	"picked_faucet": "2012-05-29T10:05:46-06:00",
	"picked_grid": "2012-06-02T10:05:45-06:00",
	"picked_strainer": "2012-06-02T10:05:45-06:00",
	"picked_brackets": "2012-06-02T10:05:45-06:00",
	"picked_counters": "2012-06-02T10:05:45-06:00",
	
	"fabricating": "GNS",
	"install": "Other",
	"sink_rvd": "2012-05-15T10:05:45-06:00", //custom sink recieved
	"mat_sent": "2012-05-15T10:05:45-06:00",
		"mat_sent_qty": 3,
	"sink_sent": "2012-05-15T10:05:45-06:00",
		"sink_sent_qty": 3,
	"ord_conf_sent": "2012-05-15T10:05:45-06:00",
	
	"rvd_layout": false,
	"notes": "he was very nice to me",
	"follow_up": "",
	
	//sid bar
	"in_cust": false,
	"quote_sent": "verbal",
	"quote_call": true,
	"invoice_num": "369643",
	"install_conf": true,
		"install_conf_D": "2012-06-26T10:05:45-06:00",
	"ask_feedback": true,
	"location": "Dayton",
	"acct": "2012-06-02T10:05:45-06:00",
	
	
	"comments": [
		{
			"id": 0,
			"client_id": 0,
			"author_id": 4,				
			"message": "Client is color blind",
			"date": "2012-05-15T10:05:45-06:00"
			
		},
		{
			"id": 1,
			"client_id": 0,
			"author_id": 5,			
			"message": "Client is only read-green color blind",
			"date": "2012-05-16T10:05:45-06:00"
		}
	]
};

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

	$("#SaveSectionDialog").hide();

	
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
		
		$("#SaveSectionDialog").dialog({
			autoOpen: true,
			title: "Now saving...",
	
			buttons: [{
				text: "Save",
				icon: "ui-icon-document",
				click: function(){
					//User wants to save the data
					console.log(messageData);
					ipcRenderer.send("UpdateClient", messageData);
					$( this ).dialog( "close" );
				}
			},
			{
				text: "Cancel",
				icon: "ui-icon-close",
				click: function(){
					//User does not want to save the data
					$( this ).dialog( "close" );
				}
			}
			],
			resizeable: false,
		});
	});	
	
	$(".SaveAll").click(function(e) {
		e.preventDefault();
		let messageData = createUpdateMessage();
		console.log(messageData);
		ipcRenderer.send("UpdateClient", messageData);
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