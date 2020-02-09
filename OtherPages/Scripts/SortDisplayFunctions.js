/*********MISC FUNCTION********/
//return date string in m/d/yyyy
function formatDate(strDate){
	let dateObj = new Date(strDate);
	
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
		if (CliArray[i].id == cliID)
			return CliArray[i];
	}
	
	return {};
}


/*************SORTS****************/
function sortByFirstName(CliArray){
	CliArray.sort(function(a,b){
		if (a.first_name < b.first_name) return -1;
		if (a.first_name > b.first_name) return 1;
	});
}

function sortByLastName(CliArray){
	CliArray.sort(function(a,b){
		if (a.last_name < b.last_name) return -1;
		if (a.last_name > b.last_name) return 1;
	});
}

function sortByID(CliArray){
	CliArray.sort(function(a,b){
		if (a.id < b.id) return -1;
		if (a.id > b.id) return 1;
	});
}
function sortByOldest(CliArray){
	CliArray.sort(function (a,b){
		if (new Date(a.date_added).getTime() < new Date(b.date_added).getTime()) return -1;
		else return 1;
	});
}
function sortByNewest(CliArray){
	CliArray.sort(function (a,b){
		if (new Date(a.date_added).getTime() < new Date(b.date_added).getTime()) return 1;
		else return -1;
	});
}

		