/*********MISC FUNCTION********/
//return date string in m/d/yyyy
function formatDate(dateObj){
	m = dateObj.getMonth() + 1;
	d = dateObj.getDate();
	yyyy = dateObj.getFullYear();
	
	return m + "/" + d + "/" + yyyy;
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
		if ((a.DateAdded.getTime()) < findDateBool(b.DateAdded.getTime())) return -1;
		if (findDateBool(a.DateAdded.getTime()) > findDateBool(b.DateAdded.getTime())) return 1;
	});
}
function sortByNewest(CliArray){
	CliArray.sort(function (a,b){
		if (findDateBool(a.DateAdded.getTime()) < findDateBool(b.DateAdded.getTime())) return 1;
		if (findDateBool(a.DateAdded.getTime()) > findDateBool(b.DateAdded.getTime())) return -1;
	});
}

		