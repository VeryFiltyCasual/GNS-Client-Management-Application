const {ipcRenderer} = require("electron");
let newEmail = "";

ipcRenderer.on("getUser", (event, user) => {
	document.getElementById('profilePic').setAttribute('src',user.picture);
});
ipcRenderer.on("users", (event, users) => {
	console.log(users);
	let list = $("#accMain > ul");
	for (let user of users) {
		const item = `
		<li>
			<section class="ListHead">
				<h4>${user.email}</h4>
				${(user.online) ? "Online" : "Offline"}
			</section>
		</li>
		`;
		list.append(item);
	}

});
//Sign out
function signOut() {
	ipcRenderer.send('signout');
}
$(document).ready(function(){
	//Update the profile picture
	ipcRenderer.send("user");
	ipcRenderer.send("users");

	$("#SortBy").selectmenu({
		width: 200,
		  classes: {
			"ui-selectmenu-button": "custom-clear",
			"ui-selectmenu-text": "custom-underline",
			"ui-selectmenu-button-closed": "custom-clear"
		  },
	
		change: function(event, data){
			
		}
	});
	
	$("#newAcctForm").dialog({
		autoOpen: false,
		modal: true,
		height: 270,
		width: 350,
		
		buttons:[
			{
				text: "Create user",
				click: function(){
					var email = $("#email").val();
					var emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
					
					if (email === '' || !(email).match(emailRegex)) {
						alert("Invalid Email");
					} else {
						newEmail = email;
						$("#newAcctForm").dialog("close");
					}
				}
			},
			{
				text: "Cancel",
				click: function(){
					$("#newAcctForm").dialog("close");
				}
			}
		],
		
		close: function(){
			if (newEmail != ""){
				jsonMsg = { email: newEmail };					
				ipcRenderer.send("addUser", jsonMsg); //[DEV]
				
				newEmail = "";
			}
		}
	});
	
	$(".GreenAdd").click(function(){
		$("#newAcctForm").dialog("open");
	})
});