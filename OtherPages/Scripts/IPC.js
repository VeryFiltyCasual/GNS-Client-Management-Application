const { ipcRenderer } = require('electron');


/*********SEND*********/	
$("#ClientList").on("click", ".btnEditInfo", function(e) {
	//send the 'display-client-edit' command to the main js (will display new page with client info)
	//needs id
	let cliID = $(this).parent().parent().parent().find(".cliID").text();
	
	ipcRenderer.send("display-client-edit", getClient(AllClients, cliID));
	$("body").addClass("ui-widget-overlay");
	e.stopPropagation();
});

$("#AddClient").click(function(e){
	e.preventDefault();
	ipcRenderer.send("display-newclient");
	$("body").addClass("ui-widget-overlay");
})

//Update the profile picture
window.onload = () => {
	ipcRenderer.send("user");
}


/*********Recieve**********/
//extra window is closed, remove the gray out overlay
ipcRenderer.on("ExtraWinClosed", (event) =>{
	$("body").removeClass("ui-widget-overlay");
});

//gets an updated client array
ipcRenderer.on("updatedClients", (event, data) =>{			
	AllClients = data.cliarr;
	let sentStage = data.stage == 0 ? currentStageForm : data.stage;
	sortByNewest(AllClients);
	populateMain(sentStage);
	console.log("new clients recieved from the server");
});

//received a new comment
ipcRenderer.on("addComment", (event, data) =>{
	$(".info").remove();
	for (var i = 0; i < AllClients.length; i++){
		if (data.client_id == AllClients[i].id){
			AllClients[i].comments.push(data);
			break;
		}
	}
	//Add the comment to the comment list if it's displayed
	let clientData = $(`#cliID${data.client_id}`);
	//If the clientData is displaying comments
	if (clientData.hasClass("column")) {
		//Add the comment before the input box
		console.log(data);
		const date = new Date(data.date);
		const comment = `
			<div class="comContainer" id="comment${data.id}">
				<div>
					<img src='${data.author_picture}'/><p><strong>${data.author_name}</strong><br>${date.toDateString()}, ${date.toLocaleTimeString()}</p>
				</div>
				<p>${data.message}</p>
				<button onclick='deleteComment(${data.id})'><i class="fa fa-close"></i></button>
			</div><br>
		`;
		$(comment).insertBefore(`#commenter${data.client_id}`);
	}
});
//a comment has been deleted
ipcRenderer.on("delComment", (event, data) =>{
	//find the client
	for (var i = 0; i < AllClients.length; i++){
		if (data.client_id == AllClients[i].id){
			
			//find the comment
			for (var comi = 0; comi < AllClients[i].comments.length; comi++){
				if (data.id == AllClients[i].comments[comi].id) {				
					//Delete comment from array
					AllClients[i].comments.splice(comi, 1);
					//Delete the element if it's on the page
					$(`#comment${data.id}`).next().remove();
					$(`#comment${data.id}`).remove();
					return;
				}	
			}
			return;
		}
	}
});

//one client is updated
ipcRenderer.on("updateOneClient", (event, newcli)=>{
	for (var i = 0; i < AllClients.length && currentStageForm == newcli.stage; i++){
		if (newcli.id == AllClients[i].id){
			AllClients[i] = newcli;
			return;
		}
	}
});

//a new client has been added to the database
ipcRenderer.on("newClient", (event, newcli)=> {
	if (newcli.stage == currentStageForm){
		AllClients.push(newcli);
		sortByFirstName(AllClients);
		populateMain(currentStageForm);
	}
});

//a client has been moved to a different stage
ipcRenderer.on("changedStage", (event, data)=>{
	for (var i = 0; i < AllClients.length; i++){
		if (AllClients[i].id == data.client_id)
			AllClients.splice(i, 1); //delete client
	}
	console.log(data);
	//Redisplay all clients at the previous stage
	populateMain(data.new_stage - 1);
});

//get google profile picture
ipcRenderer.on("getUser", (event, user) => {
	document.getElementById('profilePic').setAttribute('src',user.picture);
});