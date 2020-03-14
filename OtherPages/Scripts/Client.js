/*const { ipcRenderer } = require('electron');*/
let ipcRenderer;
const CDATA_FADESPEED = 200;
let AllClients = [];


/**
	* Opens the comment menu/submits the comment
	* @param {number} id The id of the client that the user is commenting on
*/
function toggleComment(id) {
	//Determine if the menu is open or not
	let isCommenting = $(`#AddComment${id}`).text() == "Submit";
	//If the user hasn't opened the text box yet
	if (!isCommenting) {
		//Open it
		$(`#commenter${id}`).show();
		$(`#cancel${id}`).parent().show();
		$(`#AddComment${id}`).text("Submit");
	} else {
		//If they have, close it and submit the comment
		//Get the text
		const message = $(`#commenter${id}`).val();
		if (!message) return;
		//Send it to the main process
		ipcRenderer.send('addComment', {message, client_id: id});
		closeComment(id);
	}
}
/**
* Closes the comment add menu associated with a specific client
 * @param {number} id The id of the client
*/
function closeComment(id) {
	$(`#commenter${id}`).hide();
	$(`#cancel${id}`).parent().hide();
	$(`#AddComment${id}`).text("+ Add Comment");
	$(`#commenter${id}`).val('');
}
//Sends a delete comment event to the main process
function deleteComment(comment_id) {
	ipcRenderer.send("deleteComment", comment_id);
}
//Sign out
function signOut() {
	ipcRenderer.send('signout');
}


$(document).ready(function(){

/****************************************
*****************IPC********************
****************************************/

	// /*********SEND*********/
	// $("#ClientList").on("click", ".btnEditInfo", function(e) {
	// 	//send the 'display-client-edit' command to the main js (will display new page with client info)
	// 	//needs id
	// 	let cliID = $(this).parent().parent().parent().find(".cliID").text();
		
	// 	ipcRenderer.send("display-client-edit", getClient(AllClients, cliID));
	// 	$("body").addClass("ui-widget-overlay");
	// 	e.stopPropagation();
	// });

	// $("#AddClient").click(function(e){
	// 	e.preventDefault();
	// 	ipcRenderer.send("display-newclient");
	// 	$("body").addClass("ui-widget-overlay");
	// })

	// //Update the profile picture
	// window.onload = () => {
	// 	ipcRenderer.send("user");
	// }

	// /*********Recieve**********/
	// //extra window is closed, remove the gray out overlay
	// ipcRenderer.on("ExtraWinClosed", (event) =>{
	// 	$("body").removeClass("ui-widget-overlay");
	// });

	// //gets an updated client array
	// ipcRenderer.on("updatedClients", (event, data) =>{			
	// 	AllClients = data.cliarr;
	// 	let sentStage = data.stage == 0 ? currentStageForm : data.stage;
	// 	sortByNewest(AllClients);
	// 	populateMain(sentStage);
	// 	console.log("new clients recieved from the server");
	// });

	// //received a new comment
	// ipcRenderer.on("addComment", (event, data) =>{
	// 	$(".info").remove();
	// 	for (var i = 0; i < AllClients.length; i++){
	// 		if (data.client_id == AllClients[i].id){
	// 			AllClients[i].comments.push(data);
	// 			break;
	// 		}
	// 	}
	// 	//Add the comment to the comment list if it's displayed
	// 	let clientData = $(`#cliID${data.client_id}`);
	// 	//If the clientData is displaying comments
	// 	if (clientData.hasClass("column")) {
	// 		//Add the comment before the input box
	// 		console.log(data);
	// 		const date = new Date(data.date);
	// 		const comment = `
	// 			<div class="comContainer" id="comment${data.id}">
	// 				<div>
	// 					<img src='${data.author_picture}'/><p><strong>${data.author_name}</strong><br>${date.toDateString()}, ${date.toLocaleTimeString()}</p>
	// 				</div>
	// 				<p>${data.message}</p>
	// 				<button onclick='deleteComment(${data.id})'><i class="fa fa-close"></i></button>
	// 			</div><br>
	// 		`;
	// 		$(comment).insertBefore(`#commenter${data.client_id}`);
	// 	}
	// });
	
	// //a comment has been deleted
	// ipcRenderer.on("delComment", (event, data) =>{
	// 	//find the client
	// 	for (var i = 0; i < AllClients.length; i++){
	// 		if (data.client_id == AllClients[i].id){
				
	// 			//find the comment
	// 			for (var comi = 0; comi < AllClients[i].comments.length; comi++){
	// 				if (data.id == AllClients[i].comments[comi].id) {				
	// 					//Delete comment from array
	// 					AllClients[i].comments.splice(comi, 1);
	// 					//Delete the element if it's on the page
	// 					$(`#comment${data.id}`).next().remove();
	// 					$(`#comment${data.id}`).remove();
	// 					return;
	// 				}	
	// 			}
	// 			return;
	// 		}
	// 	}
	// });

	// //one client is updated
	// ipcRenderer.on("updateOneClient", (event, newcli)=>{
	// 	for (var i = 0; i < AllClients.length && currentStageForm == newcli.stage; i++){
	// 		if (newcli.id == AllClients[i].id){
	// 			AllClients[i] = newcli;
	// 			return;
	// 		}
	// 	}
	// });

	// //a new client has been added to the database
	// ipcRenderer.on("newClient", (event, newcli)=> {
	// 	if (newcli.stage == currentStageForm){
	// 		AllClients.push(newcli);
	// 		sortByFirstName(AllClients);
	// 		populateMain(currentStageForm);
	// 	}
	// });

	// //a client has been moved to a different stage
	// ipcRenderer.on("changedStage", (event, data)=>{
	// 	for (var i = 0; i < AllClients.length; i++){
	// 		if (AllClients[i].id == data.client_id)
	// 			AllClients.splice(i, 1); //delete client
	// 	}
	// 	console.log(data);
	// 	//Redisplay all clients at the previous stage
	// 	populateMain(data.new_stage - 1);
	// });

	// //get google profile picture
	// ipcRenderer.on("getUser", (event, user) => {
	// 	document.getElementById('profilePic').setAttribute('src',user.picture);
	// });

	
/****************************************
*********CLIENT HTML FUNCTIONS***********
****************************************/
	let currentStageForm = 1;
	
	//define htmls
	let html_ButtonsNav = '<nav class="SmallCategories"><button class="SmallCatButtons Basic smallcat-selected">Basic</button><button class="SmallCatButtons Estimate">Estimate/Balance</button><button class="SmallCatButtons Availability">Availability</button><button class="SmallCatButtons Comments">Comments</button><div style="width: 100%; border: 0.5px solid rgb(180,180,180);"></div></nav>';			
	let html_TopNav = '<div class="CHeadTopLinks"><div><button class="btnEditInfo"><i class="fa fa-edit"></i>Edit</button></div></div>';
	let html_DivSec = "<div class='body-section'></div>";
	
	/**************FUNCTIONS****************/
	//populate client body functions
	function populateBasic(clientBas, thisCliInfo){
		let clientData = $(thisCliInfo).find(".ClientData").removeClass("column");
	
		$("<label class='info'>Phone: <p>" + p(clientBas.phone) + "</p></label>").appendTo(clientData).fadeIn(CDATA_FADESPEED);
		
		$("<label class='info'>Email: <p>" + p(clientBas.email) + "</p></label>").appendTo(clientData).fadeIn(CDATA_FADESPEED);
		
		$("<label class='info'>Address: <p>" + p(clientBas.street_address) + "</p></label>").appendTo(clientData).fadeIn(CDATA_FADESPEED);
		
		$("<label class='info'>City: <p>" + p(clientBas.city) + "</p></label>").appendTo(clientData).fadeIn(CDATA_FADESPEED);
		
		$("<label class='info'>State: <p>" + p(clientBas.state) + "</p></label>").appendTo(clientData).fadeIn(CDATA_FADESPEED);
		
		$("<label class='info'>Zip code: <p>" + p(clientBas.zip) + "</p></label>").appendTo(clientData).fadeIn(CDATA_FADESPEED);
	}
	
	function populateAvailability(clientAv, thisCliInfo){
		let clientData = $(thisCliInfo).find(".ClientData").removeClass("column");
		let div1 = $(html_DivSec);
		let div2 = $(html_DivSec);
		
		$("<h4>Schedule</h4><br>").appendTo(div1);
		$("<label class='info'>Template: <p>" + formatDate(clientAv.schedule_template) + "</p></label>").appendTo(div1);
		$("<label class='info'>Tear: <p>" + formatDate(clientAv.schedule_tear) + "</p></label>").appendTo(div1);
		$("<label class='info'>Brackets: <p>" + formatDate(clientAv.schedule_brackets) + "</p></label>").appendTo(div1);
		$("<label class='info'>Install/Dropoff: <p>" + formatDate(clientAv.schedule_install_drop) + "</p></label>").appendTo(div1);
		$("<label class='info'>Plumbing: <p>" + formatDate(clientAv.schedule_plumb) + "</p></label>").appendTo(div1);
		
		$("<h4>Customer Picked Up</h4><br>").appendTo(div2);
		$("<label class='info'>Faucet: <p>" + formatDate(clientAv.picked_faucet) + "</p></label>").appendTo(div2);
		$("<label class='info'>Grid set: <p>" + formatDate(clientAv.picked_grid) + "</p></label>").appendTo(div2);
		$("<label class='info'>Strainer: <p>" + formatDate(clientAv.picked_strainer) + "</p></label>").appendTo(div2);
		$("<label class='info'>Brackets: <p>" + formatDate(clientAv.picked_brackets) + "</p></label>").appendTo(div2);
		$("<label class='info'>Counters: <p>" + formatDate(clientAv.picked_counters) + "</p></label>").appendTo(div2);
		
		$(clientData).append(div1).append(div2);
	}
	
	function populateEstimate(clientEst, thisCliInfo){
		let clientData = $(thisCliInfo).find(".ClientData").removeClass("column");
	
		$("<label class='info'>Estimated Q: <p>" + c(clientEst.actual_qty) + "</p></label>").appendTo(clientData).fadeIn(CDATA_FADESPEED);
		$("<label class='info'>Actual Q: <p>" + c(clientEst.actual_qty) + "</p></label>").appendTo(clientData).fadeIn(CDATA_FADESPEED);
		$("<label class='info'>Estimate: <p>" + c(clientEst.estimate) + "</p></label>").appendTo(clientData).fadeIn(CDATA_FADESPEED);
		$("<label class='info'>Notes for Installation: <textarea readonly>" + pp(clientEst.estimate) + "</textarea></label>").appendTo(clientData).fadeIn(CDATA_FADESPEED);
	}
		
	function populateComments(clientCom, thisCliInfo){
		let clientData = $(thisCliInfo).find(".ClientData").addClass("column");
	
		if (!clientCom.comments || clientCom.comments == [] || !aString(clientCom.comments[0]) || !aString(clientCom.comments))
			$("<p class='info'>No comments for this user yet</p><br>").appendTo(clientData);
		else {
			for(var c = 0; c < clientCom.comments.length; c++){
				//Get the date that the user made the comment
				const date = new Date(clientCom.comments[c].date);
				//Generate the comment
				const comment = `
					<div class="comContainer" id="comment${clientCom.comments[c].id}">
						<div>
							<img src='${clientCom.comments[c].author_picture}'/><p><strong>${clientCom.comments[c].author_name}</strong><br>${date.toDateString()}, ${date.toLocaleTimeString()}</p>
						</div>
						<p>${clientCom.comments[c].message}</p>
						<button onclick='deleteComment(${clientCom.comments[c].id})'><i class="fa fa-close"></i></button>
					</div><br>
				`;
				//Add the comment to the list
				$(comment).appendTo(clientData);
			}
		}
		//Textbox for the comment
		let commentBox = $(`<input type='text' id='commenter${clientCom.id}' placeholder='Comment...'/>`);
		commentBox.hide();
		clientData.append(commentBox);
		//Add the add comment button at the end
		$(`<br><div><button id="AddComment${clientCom.id}" onclick="toggleComment(${clientCom.id});" class="BlueAdd">+ Add Comment</button></div>`).appendTo(clientData);
		$(`<div><button id='cancel${clientCom.id}' onclick="closeComment(${clientCom.id})"class='BlueAdd'>Cancel</button></div>`).appendTo(clientData).hide();

	}

	//makes single client html
	function makeAClient(client, stage){
		let btnMessage ="";				
		switch (stage){
			case 1:
				btnMessage = "Move to stage 2<i class='fa fa-arrow-right'></i>";
				break;
			case 2:
				btnMessage = "Archive client";
				break;
			case 3:
				btnMessage = "Move to previous stage";
				break;
			default:
				btnMessage = "none";
				break;
		}
	
		let htmlLI = $('<li class="Client"></li>'); //make li
		
		//make ListBody
		let htmlLiBody = $("<section class='ListBody'></section>")
			.append(`<div class="ClientData" id="cliID${client.id}"></div>`)
			.append("<button class='ClientNextPhase'>" + btnMessage + "</button>").append(html_ButtonsNav); 
		
		//make the head
		let htmlLiHead = $("<section class='ListHead'></section>")
			.append("<h4>" + client.first_name + " " + client.last_name + "</h4>")
			.append("<p class='cliID' style='display: none'>" + client.id + "</p>")
			.append("<p>Joined " + formatDate(client.date_added) + "</p>")
			.append(html_TopNav);
		
		populateBasic(client, htmlLiBody);
			
		return $(htmlLI).append(htmlLiHead).append(htmlLiBody);
	}
	
	//populates main (all clients)
	function populateMain(currentStage){
		console.log("Loading clients from stage " + currentStage);
		var Client;
		
		//remove clients in the form already
		$(".Client").remove();
		
		//makes and appends all clients
		for (Client of AllClients){			
			$(makeAClient(Client, currentStage)).hide().appendTo("#ClientList").fadeIn(600);
		}
		
	}	
	
	function recievedClients(stage){
		$("body").removeClass("ui-widget-overlay");
		
		sortByNewest(AllClients)
		populateMain(stage);
		
		console.log("new clients recieved from the server");
	}


/****************************************
*********CHANGING CLIENT HTML***********
****************************************/

	/*****************JQUERY******************/
	//fill buttons with stage info
	let btnNum = 1;
	$(".SmallCatButtons").each(function(){
		$(this).attr("Stage", btnNum++);
	});

	
	//when the button is clicked, fill the main
	$("aside .SmallCatButtons").click(function(){
		$("#sectionTitle").text($(this).text());
		currentStageForm = parseInt($(this).attr("stage"));		
		
		//populateMain(currentStageForm); //[DEV, GET RID LATER]
		ipcRenderer.send("RequestStage" + currentStageForm);
		console.log('Sent stage ' + currentStageForm + ' client request');

		//styling
		$("aside .SmallCatButtons").removeClass("view-selected");
		$(this).addClass("view-selected");
	});
	
	$("#ClientList").on("click", ".ListBody .SmallCategories button", function(){
		let ThisListBody = $(this).parent().parent();
		let ThisID = ThisListBody.parent().find(".cliID").text();
		let ThisClientData = $(ThisListBody).find(".ClientData");
		
		//remove the things already there
		$(ThisClientData).children().remove();
		$(ThisClientData).hide();
		
		//styling 
		$(this).parent().find(".smallcat-selected").removeClass("smallcat-selected");
		$(this).addClass("smallcat-selected");
		
		//fill info 				
		if ($(this).hasClass("Estimate")){
			//display Invoice
			console.log("client invoice is displayed");						
			populateEstimate(getClient(AllClients, ThisID), ThisListBody);
		}
		else if ($(this).hasClass("Availability")){
			//display install stuff
			console.log("client install is displayed");				
			populateAvailability(getClient(AllClients, ThisID), ThisListBody);
		}
		else if ($(this).hasClass("Comments")){
			//display install stuff
			console.log("client comments are displayed");						
			populateComments(getClient(AllClients,ThisID), ThisListBody);
		}
		else {
			//display basic (if none other found)
			populateBasic(getClient(AllClients,ThisID), ThisListBody);
		}
		
		$(ThisClientData).fadeIn(CDATA_FADESPEED);
	});
	
	$("#ClientList").on("click", ".ClientNextPhase", function(){
		let thisID = parseInt($(this).parent().parent().find(".cliID").text());
		let newStage = currentStageForm >= 3 ? 2 : ++currentStageForm;
		
		ipcRenderer.send("NewStage", {client_id: thisID, new_stage: newStage})
	});
	
	//displays the client information when clicking on an li
	$("#ClientList").on('click', ".ListHead", function() {			
		var thisClient = $(this).parent();
		const timeDelay = 200;
		//closes all other clint info's				
		$('.Client').not(thisClient).find(".ListBody").hide(timeDelay);
		$('.Client').not(thisClient).find(".CHeadTopLinks").hide(timeDelay);
		
		//opens the clicked client info
		$(thisClient).find(".ListBody").slideToggle(timeDelay);
		$(thisClient).find(".CHeadTopLinks").toggle(timeDelay);

	});

	
	/*******************JQUI******************/	
	//sort by selectmenu
	$("#SortBy").selectmenu({
		width: 200,
		  classes: {
			"ui-selectmenu-button": "custom-clear",
			"ui-selectmenu-text": "custom-underline",
			"ui-selectmenu-button-closed": "custom-clear"
		  },
	
		change: function(event, data){
			switch (data.item.value){
				case "New":
					sortByNewest(AllClients);
					break;
				case "Old":
					sortByOldest(AllClients);
					break;
				case "FirstName":
					sortByFirstName(AllClients);
					break;
				case "LastName":
					sortByLastName(AllClients);
					break;
			}
			
			populateMain(currentStageForm);
		}
	});	
			
});
