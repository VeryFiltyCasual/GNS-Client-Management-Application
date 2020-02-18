//test client object
/*let cli = {
		"id" : 0,
		"first_name" : "Jeremy",
		"last_name" : "Oosterban",
		"stage" : 1,	
		"date_added": "2012-03-29T10:05:45-06:00",
		
		//basic
		"phone" : "14789999999",
		"email" : "MichiganFan@email",
		"street_address" : "123 Ooster Bouevarde",
		"city" : "Dayton",
		"state" : "OH",
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
		"kitchen_pkg": false,
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
	};*/


//creates the message for updating client
function createUpdateMessage(parentE = $("body")){
	let changeMessage = {
		"client_id": cli.id,
		"changes": []
	}
	
	$(parentE).find("input, select, textarea").each(function(){
		//find the value of each input box
		let content = x(findValue(this));
		let field = $(this).attr("id");

		if (content == "")
			content = null;
		
		if ($(this).attr("id") == undefined) //DEV
			console.log("undef key: " + $(this).attr("id") + ", " + $(this).attr("name"));
		
		//if value is different than whats in the database, change it
		if(content != cli[field]){
			//add one change
			changeMessage.changes.push(
				{
					"key": $(this).attr("id"),
					"data": content
				}
			);
		}
	});
	
	return changeMessage;
}

//finds the value of an input html
function findValue(inputObj){
	let inputVal = $(inputObj).val();
	if (!aString(inputVal)) return null;
	
	//input is text area
	if ($(inputObj).is("textarea"))
		return inputVal;
	
	//input is a combo box
	else if ($(inputObj).is("select")){
		let val = inputVal;
		
		if (val.toUpperCase() == "YES" || val.toUpperCase() == "Y")
			return true;
		else if (val.toUpperCase() == "NO" || val.toUpperCase() == "N")
			return false;
		else
			return val;	
	}
	
	//input is a datepicker
	else if ($(inputObj).hasClass("Datepick")){
		let d = new Date(inputVal);
		updateCalendar(cli, $(inputObj).attr("id"), new Date(cli[$(inputObj).attr("id")]), d);
		if (isValidD(d))return d.toISOString();
		else return "no val";
	}
	//input is a regular text box
	else {
		switch ($(inputObj).attr("type")){
			
			//if the input is a text box
			case "text":
				return inputVal;
			
			case "number":
				return inputVal;
				
			case "checkbox":
				return ($(inputObj).is(":checked"));
				
			case "radio":
				return ($(inputObj).is(":checked"));
				
			default:
				return "no val";
		}
	}
	
	return null;
}

function fillValue(val, inputObj){
	if ($(inputObj).is("textarea")){
		$(inputObj).html(x(val));
		return;
	}
	else if ($(inputObj).is("select")){
		if (typeof val == "boolean"){
			let yn =  val ? "Y" : "N";
			$(inputObj).find("option[value='" + yn + "']").attr("selected", true);
		}
		else{
			$(inputObj).find("option[value='" + val + "']").attr("selected", true);
		}
		
		return
	}
	else if ($(inputObj).is("input")){
		if ($(inputObj).hasClass("Datepick")){
			$(inputObj).val(formatDate(val));
		}
		else if($(inputObj).attr("type") == "text" || $(inputObj).attr("type") == "number")
			$(inputObj).val(x(val));
		else if($(inputObj).attr("type") == "radio" || $(inputObj).attr("type") == "checkbox")
			$(inputObj).prop("checked", val);
		
	}
	
}

function fillInputs(){
	$("input, textarea, select").each(function(){
		let field = $(this).attr('id');
		
		//console.log(field + ": " + pp(cli[field]));
		fillValue(cli[field], $(this));
	});
	
}
/**
 * Sends a message to the main process to update the calendar with the new date
 * @param {Client} client The client to whom the date concerns
 * @param {string} field The field that the date corresponds to on the form
 * @param {Date} oldDate The previous value of the date
 * @param {Date} newDate The new value of the date
 */
function updateCalendar(client, field, oldDate, newDate) {
	ipcRenderer.send("updateCalendar", client, field, oldDate.getTime(), newDate.getTime());
}