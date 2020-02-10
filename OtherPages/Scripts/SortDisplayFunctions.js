/*********MISC FUNCTION********/
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

/************Display functions***********/
//makes sure variable is a valid string
function aString(stringvar){
	return (stringvar != null && stringvar != "" && stringvar != undefined);
}

//returns "<i>not set</i>" if invalid string
function p(stringvar){
	if (aString(stringvar))
		return stringvar;
	return "<i>not set</i>";
}
//for currency
function c(stringvar){
	if (aString(stringvar))
		return "$" + stringvar;
	return "<i>not set</i>";
}

//returns "not set" if invalid
function pp(stringvar){
	if (!aString(stringvar))
		return "not set"
	
	return stringvar;
}


/*************DATES****************/
//checks if a date object is valid
function isValidD(objDate){
	if (objDate === undefined) return false;
	if (objDate.getTime() != objDate.getTime()) return false;
	
	return true;
}

//return date string in m/d/yyyy
function formatDate(strDate){
	let dateObj = new Date(strDate);
	
	//if date isnt valid, return string
	if (!isValidD(dateObj) || strDate == null) return p(strDate);
	
	m = dateObj.getMonth() + 1;
	d = dateObj.getDate();
	yyyy = dateObj.getFullYear();
	
	return m + "/" + d + "/" + yyyy;
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

		