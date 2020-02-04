/*********MISC FUNCTION********/
//does not accurately determine date, but accurately puts dates in order
function findDateBool(Date){
	var blDate = Date.Year;
	blDate += Date.Month / 12;
	blDate += Date.Day / 365;
	
	return blDate;
}

//make a string array one string
function allinone(strArray){
	let holder = "";
	strArray.forEach(myFunc);
	
	function myFunc(item){
	holder += item + " ";}
	
	return holder;
}

//return the client that maches the passed ID
function getClient(CliArray, cliID){
	for (i = 0; i < CliArray.length; i++){
		if (CliArray[i].ClID == cliID)
			return CliArray[i];
	}
	
	return {};
}


/*************SORTS****************/
function sortByFirstName(CliArray){
	CliArray.sort(function(a,b){
		if (a.Fname < b.Fname) return -1;
		if (a.Fname > b.Fname) return 1;
	});
}

function sortByLastName(CliArray){
	CliArray.sort(function(a,b){
		if (a.Lname < b.Lname) return -1;
		if (a.Lname > b.Lname) return 1;
	});
}

function sortByID(CliArray){
	CliArray.sort(function(a,b){
		if (a.ClID < b.ClID) return -1;
		if (a.ClID > b.ClID) return 1;
	});
}
function sortByOldest(CliArray){
	CliArray.sort(function (a,b){
		if (findDateBool(a.DateAdded) < findDateBool(b.DateAdded)) return -1;
		if (findDateBool(a.DateAdded) > findDateBool(b.DateAdded)) return 1;
	});
}
function sortByNewest(CliArray){
	CliArray.sort(function (a,b){
		if (findDateBool(a.DateAdded) < findDateBool(b.DateAdded)) return 1;
		if (findDateBool(a.DateAdded) > findDateBool(b.DateAdded)) return -1;
	});
}

/********populate basic form********/
function populateMain(currentStage, CliArray){
	console.log("Loading clients from stage " + currentStage);
	var Client;
	
	//remove clients in the form already
	/* ADD FOLLOWING ONCE ANDREW'S CODE IS IMPLEMENTED */
	/*$("#ClientList").children().fadeOut(
		120, 
		function() {$(this).remove();}
	
	);*/

	for (Client of CliArray){
		if (Client.Stage == currentStage){
		/* SHOULD BE REPLACED WITH ANDREW'S CODE */
			console.log(Client.Fname + " is printed.");
		}
	}
}			