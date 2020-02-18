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

//creates the message for updating client
function createAddMessage(parentE = $("body")){
	let newCli = {
		"first_name" : null,
		"last_name" : null,	
		"date_added": null,
		
		//basic
		"phone" : null,
		"email" : null,
		"street_address" : null,
		"city" : null,
		"state" : null,
		"zip" : null,

		"contractor": null,
		"contractor_phone": null,
		"contractor_email": null,
		
		
		"project" : null,
		"cabinet": null,
		"appliances": null,
		"floor": null,
		"other": null,		
	};
	
	$(parentE).find("input, select").each(function(){
		//find the value of each input box
		let content = x(findValue(this));
		let field = $(this).attr("id");
		
		if (content == "")
			content = null;
		
		if(newCli[field] == null ){
			newCli[field] = content;
		}
		
		newCli.date_added = new Date(Date.now()).toISOString();
	});
	
	return newCli;
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