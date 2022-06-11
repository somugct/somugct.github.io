var dbRecord;

const NAAN = 0;
const APPAIYA = 1;
const APPATHTHA = 2;
const APPACHI = 3;
const AMUCHI = 4;
const APPA = 5;
const AMMA = 6;
const MAMA = 7;
const ATHTHAI = 8;
const PERIYAPPA = 9;
const PERIYAMMA = 10;
const CHITHTHAPPA = 11;
const CHITHTHI= 12;
const ANNAN = 13;
const THAMBI = 14;
const AKKA = 15;
const THANGAI = 16;
const MAGAN = 17;
const MAGAL = 18;
const MARUMAGAN = 19;
const MARUMAGAL = 20;
const PERAN = 21;
const PAETHI = 22;
const MAMANAAR = 23;
const MAAMIYAAR = 24;
const MACHAN = 25;
const NAATHANAAR = 26;
const KANAVAN = 27;
const MANAIVI = 28;
const KOLUNTHANAAR = 29;
const KOLUNTHIYA = 30;
const MACHINAN = 31;
const MACHANDAAR = 32;
const POOTTAN = 33;
const POOTTI = 34;
const INV_MALE = 99;
const INV_FEMALE = 100;
	
var labelArray = [ [ 
						"நான் ",                			/*  0     */
						"அப்பையா", "அப்பத்தா",			/*  1,  2 */ 
						"அப்பச்சி ", "அமுச்சி ", 			/*  3,  4 */
						"அப்பா", "அம்மா", 				/*  5,  6 */
						"மாமா ", "அத்தை", 				/*  7,  8 */
						"பெரியப்பா", "பெரியம்மா ",		/*  9, 10 */ 
						"சித்தப்பா", "சித்தி ", 				/* 11, 12 */
						"அண்ணன் ", "தம்பி",				/* 13, 14 */ 
						"அக்கா", "தங்கை ",				/* 15, 16 */
						"மகன்", "மகள் ",					/* 17, 18 */
						"மருமகன்", "மருமகள்",			/* 19, 20 */
						"பேரன்", "பேத்தி",				/* 21, 22 */
						"மாமனார்", "மாமியார் ",			/* 23, 24 */
						"மச்சான்", "நாத்தனார்",			/* 25, 26 */
						"கணவன்", "மனைவி",				/* 27, 28 */
						"கொழுந்தனார் ", "கொழுந்தியா",	/* 29, 30 */
						"மச்சினன் ", "மச்சாண்டார் ",       /* 31, 32 */
						"பூட்டன்", "பூட்டி"					/* 33, 34 */
					  ],
					  [
						"ME",                				/*  0     */
						"Grandpa", "Grandma",			 	/*  1,  2 */ 
						"Grandpa ", "Grandma ", 			/*  3,  4 */
						"Father", "Mother", 				/*  5,  6 */
						"Uncle ", "Aunty", 					/*  7,  8 */
						"Uncle", "Aunty ",					/*  9, 10 */ 
						"Uncle", "Aunty ", 					/* 11, 12 */
						"Brother ", "Brother",				/* 13, 14 */ 
						"Sister", "Sister ",				/* 15, 16 */
						"Son", "Daugther ",					/* 17, 18 */
						"Son-in-law", "Daugther-in-law",	/* 19, 20 */
						"Grandson", "Granddaugther",		/* 21, 22 */
						"Father-in-law", "Mother-in-law ",	/* 23, 24 */
						"Brother-in-law", "Sister-in-law",	/* 25, 26 */
						"Husband", "Wife",					/* 27, 28 */
						"Brother-in-law ", "Sister-in-law",	/* 29, 30 */
						"Brother-in-law ", "Brother-in-law",/* 31, 32 */
						"Great-Grandpa", "Great-Grandma"	/* 33, 34 */
					  ]
				 ];

const TAMIL = 0;
const ENGLISH = 1;

const MALE = 0;
const FEMALE = 1;

const ELDER = 0;
const MIDDLE = 1;
const YOUNGER = 2;

var language = TAMIL;
var displayMode = "medium";
var baseRow = 0;
var bgPicNum;
var warnedAlready = false;

const FATHER = 1;
const MOTHER = 2;
const SPOUSE = 3;
const CHILDREN = 4;
const SIBLINGS = 5;

function initializeMain()
{
	const fileSelect = document.getElementById("fileSelect");
	const fileInput = document.getElementById("fileInput");	
		
	fileSelect.addEventListener("click", selectFile, false);
	fileInput.addEventListener("change", uploadData, false);

	//console.log(window.innerHeight);
	if (window.innerHeight < 900)
		document.getElementById("mainImg").style.height = "900px";
	else
		document.getElementById("mainImg").style.height = window.innerHeight - 100 + "px";
	
	setGlobal();
}
function initializeTree()
{
	if (jsonData == undefined || jsonData.length == 0)
	{
		alert("Database is not found!!");
		return;
	}
	
	setGlobal()
	dbRecord = jsonData;
	loadPerson(0);
}

function getRandomInt(max) 
{
	return 0;
	//return Math.floor(Math.random() * max);
}

function setGlobal()
{
	// When user clicks anywhere outside of the modal, close it
	window.onclick = function(event) 
	{
		var modal = document.getElementById('myModal');		
		if (event.target == modal)
			modal.style.display = "none";
	}
	
	bgPicNum = getRandomInt(8);
}

function selectFile()
{ 
	document.getElementById("fileInput").click();
}

function uploadData() 
{
	/* Remove the file select button from the view */
	const fileSelect = document.getElementById("fileSelect");
	fileSelect.innerText = "Selected"
	fileSelect.style.display = "none";
	
    var myBar = document.getElementById("myBar");
	myBar.style.width = "1%";
	document.getElementById("myProgress").style.backgroundColor = "grey";
	
	//Reference the input file element.
	var datfile = document.getElementById("fileInput");
	if (datfile.files.length == 0) 
	{
		alert("Database file is not select yet.\nBrowse and choose input database file first");
		return;
	}
	
	// console.log("File selected: " + datfile.files[0].name);
	myBar.style.width = "10%";
	
	var reader = new FileReader();
	
	reader.onerror = function(e) 
	{
		myBar.style.width = "100%";
		alert("Failed to read file!\n\n" + reader.error + "\n\n*** Try reloading the database***\n");
		reader.abort();
	}
	
	reader.onload = function(e)
	{
		myBar.style.width = "20%";
		getDataFromExcel(e.target.result);
	};
	
	reader.readAsBinaryString(datfile.files[0]);
};

function export2json() 
{
	var json = "var jsonData = " + JSON.stringify(dbRecord, null, 2); /* Remove third arg (2) for remoing spaces */
	const file = new Blob([json], { type: "application/json" });
	const a = document.createElement("a");  
	a.href = URL.createObjectURL(file);
  
	a.setAttribute("download", "data.json");
	//document.body.appendChild(a);
	a.click();
	//document.body.removeChild(a);
}

function getDataFromExcel(data) 
{
	//Read the data in binary
	var workbook = XLSX.read(data, {type: 'binary'});
	var myBar = document.getElementById("myBar");
	myBar.style.width = "25%";
	
	var Sheet = workbook.SheetNames[0];
 
	//Read all rows into an JSON array.
	var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);
	if (excelRows.length == 0)
	{
		alert("Nothing found in the database");
		return;
	}
	
	//console.log(excelRows.length + " records found in the database");
	myBar.style.width = "30%";

	/* Overwrite the dbRecord to the data read from excel file */
	dbRecord = excelRows;
	
	var num = validate();
	
	var datfile = document.getElementById("fileInput");
	var label = document.getElementById("nrec");
	label.innerHTML = "Loaded <b>" + datfile.files[0].name + "</b>!!! <br>Found <b>" + num + "</b> records in the database.";
	label.style.display = "inline";
	
	myBar.style.width = "100%";
	document.getElementById("ready2go").style.display = "inline";
	document.getElementById("input").style.display = "inline";
	document.getElementById("personName").style.display = "inline";
	document.getElementById("submit").style.display = "inline";
	document.getElementById("personName").style.display = "inline";
	document.getElementById("saveLabel").style.display = "inline";
	document.getElementById("saveButton").style.display = "inline";

}

function displayTree()	
{
	if (dbRecord == undefined || dbRecord.length == 0)
	{
		alert("Database is not loaded yet!!");
		return;
	}
	
	var person = document.getElementById("personName").value;

	var searchbyName = false;
	const parsedID = parseInt(person, 10);	
	if (isNaN(parsedID))
		searchbyName = true;
	
	var index;
	for (index = 0; index < dbRecord.length; index++)
	{
		if (dbRecord[index].Name == undefined)
			continue;
		
		console.log("Comparing row " + index + ": " + dbRecord[index].TamilName + "(" + dbRecord[index].TamilName.length + ")" +" Id: " + dbRecord[index].ID);

		if (searchbyName && dbRecord[index].Name.toLowerCase().search(person.toLowerCase()) >= 0)
			break;
		else if (dbRecord[index].ID == parsedID)
			break;
	}
	
	if (index >= dbRecord.length)
	{
		alert("\"" + person + "\" not found in the database.")
		index = 0;
	}
	
	loadPerson(index);
}

function processLoadPerson(elem)
{
	if (dbRecord[elem.id].Father == undefined && dbRecord[elem.id].Mother == undefined && dbRecord[elem.id].Spouse == undefined)
	{
		alert("Nothing more to display");
		return;
	}
	
	loadPerson(elem.id);
};

function pictureFile(num) 
{
    num = num.toString();
    while (num.length < 4) num = "0" + num;
    return "photos/" + num + ".jpg";
}

function loadPerson(myRowNum)
{
	/* Update the saved excel row number for later use, when changing language or display */
	baseRow = myRowNum;

	/* Clean up the page */
	document.body.innerHTML = "";
	
	var pageContent =
				"\n<!-- The Modal -->\n" + 
				"<div id=\"myModal\" class=\"my-modal\">\n" + 
				"	<div class=\"my-modal-content\">\n" +
				"		<div class=\"my-modal-img-container my-animate\">\n" +
				"			<!-- Modal Caption (Image Text) -->\n" + 
				"			<div id=\"caption\"></div>\n" + 	
				"			<!-- The Close Button -->\n" + 
				"			<span id=\"myClose\" onclick=\"onModalClose()\" class=\"close\">&times;</span>\n" + 
				"			<!-- Modal Content (The Image) -->\n" + 
				"			<img class=\"my-modal-content\" id=\"img01\">\n" + 
				"		</div>\n" +
				"	</div>\n" +
				"</div>\n\n";
	
	if (displayMode == "full" || displayMode == "medium")
		pageContent += displayFullTree(myRowNum);
	else
		pageContent += displayCompactTree(myRowNum);

	pageContent += addFooter(myRowNum);
	
	//console.log(pageContent);
	document.body.innerHTML = pageContent;
}

function addFooter(myRowNum)
{
	var html =	"<footer class=\"my-container my-teal my-center my-margin-top\">\n" +
				"	<p class=\"my-left\">" + myRowNum + "</p>\n"; 
	if (language == TAMIL)
		html += "	<button class=\"my-left my-margin-left my-margin-top\" style=\"width: 70px; height: 25px; opacity: 0.7\" onclick=changeLang() title=\"Click here to change the display language\">English</button>\n";
	else
		html += "	<button class=\"my-left my-margin-left my-margin-top\" style=\"width: 70px; height: 25px; opacity: 0.7\" onclick=changeLang() title=\"Click here to change the display language\">Tamil</button>\n";
	
	html +=		"	<div class=\"my-radio my-left my-margin-left my-margin-top\">\n";
	
	if (displayMode == "compact")
		html +=	"		<input type=\"radio\" id=\"choice1\" onchange=\"displayDetail()\" name=\"detail\" value=\"compact\" checked>\n";
	else
		html +=	"		<input type=\"radio\" id=\"choice1\" onchange=\"displayDetail()\" name=\"detail\" value=\"compact\">\n";
	
	html +=		"		<label for=\"choice1\">Compact</label>\n";
	
	if (displayMode == "medium")
		html +=	"		<input type=\"radio\" id=\"choice2\" onchange=\"displayDetail()\" name=\"detail\" value=\"medium\" checked>\n";
	else
		html +=	"		<input type=\"radio\" id=\"choice2\" onchange=\"displayDetail()\" name=\"detail\" value=\"medium\">\n";
	
	html +=		"		<label for=\"choice2\">Medium</label>\n";
	
	if (displayMode == "full")
		html +=	"		<input type=\"radio\" id=\"choice3\" onchange=\"displayDetail()\" name=\"detail\" value=\"full\" checked>\n";
	else
		html +=	"		<input type=\"radio\" id=\"choice3\" onchange=\"displayDetail()\" name=\"detail\" value=\"full\">\n";

	html +=		"		<label for=\"choice3\">Full</label>\n" +
				"	</div>\n" +
				"	<p class=\"my-right\"><a href=\"mailto:shivani.poy@gmail.com\">-Shivani</a></p>\n" +
				"</footer>\n";

	return html;
}

function addPerson(rowNum, colSplit, label, highlight, color)
{
	if (rowNum == undefined || rowNum < 0)
		return "";
	
	var imageClass = "my-image ";
	var name, labelId, imgName;
	var imgOnClk = "onclick=\"processLoadPerson(this)\""
	var labelClass;
	
	if (displayMode == "full")
	{
		imageClass += "my-image-size-full ";
		labelClass = "my-label-size-full ";
	}
	else
	{
		imageClass += "my-image-size-medium ";
		labelClass = "my-label-size-medium ";
	}
	
	if (highlight)
	{
		imageClass += " my-image-highlight ";	
		if (displayMode == "full")
			imageClass += "my-image-highlight-" + color + " ";
		else
			imageClass += "my-image-highlight-red ";
	}
		
	if (dbRecord[rowNum].Gender == "Male")
	{
		labelId = label[MALE];
		imgName = "images/nopicm.jpg";
	}
	else
	{
		labelId =  label[FEMALE];
		imgName = "images/nopicf.jpg";
	}
	
	if (labelId == NAAN)
	{
		if (displayMode == "full")
			imageClass = "my-blink-img my-blink-img-" + color + " my-blink-img-size-full ";
		else
			imageClass = "my-blink-img my-blink-img-red my-blink-img-size-medium ";
		
		imgOnClk = " onclick=\"clickOnImage(" + rowNum + ")\" ";
 	}

	if (language == TAMIL)
		//name = dbRecord[rowNum].TamilName.replace(/\s+/g, '');
		name = dbRecord[rowNum].TamilName.trim().split(" ")[0];
	else
		name = dbRecord[rowNum].Name.trim().split(" ")[0];

/*	if (language == TAMIL)
		name = dbRecord[rowNum].TamilName.trim();
	else
		name = dbRecord[rowNum].Name.trim();
*/	
	var htmlContent = "								<div class=\"" + colSplit + " my-center my-margin-top my-margin-bottom\">\n" +
					  "									<img id=\"" + rowNum + "\" onerror=\"backupImage(this, '" + imgName + "')\" class=\"" + imageClass + "\" style=\"border:3px solid " + color + "\" " + imgOnClk +
														" title=\"" + rowNum + " - " + dbRecord[rowNum].Nickname + "\" src=\"" + pictureFile(rowNum) + "\" alt=\"" + name + "\"><br>\n";

	//if (name.length <= 10)
		htmlContent +="									<label class=\"my-text-deep-purple " + labelClass + "\" for=\"" + name + "\"><b>" + name + "</b></label><br>\n";
	//else
	//	htmlContent +="									<marquee class=\"my-text-deep-purple " + labelClass + "\" width=\"140px\" behavior=\"alternate\" direction=\"left\" scrollamount=\"2\"><b>" + name + "</b></marquee><br>\n";
	
	if (displayMode == "medium" || displayMode == "compact")
		htmlContent +="									<label class=\"my-text-deep-orange " + labelClass + "\" for=\"" + labelArray[language][labelId] + "\"><b>" + labelArray[language][labelId] + "</b></label>\n";
		
	htmlContent +=    "								</div>\n";
	
	//console.log(htmlContent);
	return htmlContent;
}

function addDummyImage(visible, box, label, highlight)
{
	var name, labelId;
	var imageClass = "my-image ";
	var labelClass;
	var html;
	
	if (displayMode == "full")
	{
		imageClass += "my-image-size-full ";
		labelClass = "my-label-size-full ";
	}
	else
	{
		imageClass += "my-image-size-medium ";
		labelClass = "my-label-size-medium ";
	}

	if (visible)
	{
		if (highlight)
			imageClass += " my-image-highlight my-image-highlight-red";	
		
		/* Even numbered boxes are male */			
		if ((box % 2) == 0)
			name = "Mr.X";
		else
			name = "Mrs.Y";
		
		html =	"								<div class=\"my-fullwidth my-center my-margin-top my-margin-bottom\">\n" +
				"									<img class=\"" + imageClass + "\" style=\"cursor: default;\" src=\"images/nodata.jpg\"><br>\n" +		
				"									<label class=\"my-text-deep-purple " + labelClass + "\"><b>" + name + "</b></label><br>\n";
				
		if (displayMode == "medium" || displayMode == "compact")
		{		
			/* Even numbered boxes are male */
			if ((box % 2) == 0)
				labelId = label[MALE];
			else
				labelId =  label[FEMALE];

			html +=
				"									<label class=\"my-text-deep-orange " + labelClass + "\"><b>" + labelArray[language][labelId] + "</b></label>\n";
		}
		html +=	"								</div>\n";
	}
	else
	{
		imageClass += "my-dummy-image ";
		
		html =	"								<div class=\"my-fullwidth my-center my-margin-top my-margin-bottom\">\n" +
				"									<img class=\"" + imageClass + "\" src=\"images/nodata.jpg\"><br>\n" +
				"									<label class=\"my-dummy-text " + labelClass + "\"><b>hello</b></label><br>\n";
				
		if (displayMode == "medium" || displayMode == "compact")
			html +=
				"									<label class=\"my-dummy-text " + labelClass + "\"><b>hello</b></label>\n";
		html +=	"								</div>\n";
	}

	return html;
}

function siblingsList(rowNum, boxElder, boxYounger)
{
	if (rowNum == undefined || rowNum < 0)
		return;
	
	if (dbRecord[rowNum].ElderSib1)
		boxElder.push(dbRecord[rowNum].ElderSib1);
		
	if (dbRecord[rowNum].ElderSib2)
		boxElder.push(dbRecord[rowNum].ElderSib2);
		
	if (dbRecord[rowNum].ElderSib3)
		boxElder.push(dbRecord[rowNum].ElderSib3);
		
	if (dbRecord[rowNum].ElderSib4)
		boxElder.push(dbRecord[rowNum].ElderSib4);
		
	if (dbRecord[rowNum].ElderSib5)
		boxElder.push(dbRecord[rowNum].ElderSib5);

	if (dbRecord[rowNum].ElderSib6)
		boxElder.push(dbRecord[rowNum].ElderSib6);

	if (dbRecord[rowNum].ElderSib7)
		boxElder.push(dbRecord[rowNum].ElderSib7);
	
	if (dbRecord[rowNum].YoungSib1)
		boxYounger.push(dbRecord[rowNum].YoungSib1);

	if (dbRecord[rowNum].YoungSib2)
		boxYounger.push(dbRecord[rowNum].YoungSib2);

	if (dbRecord[rowNum].YoungSib3)
		boxYounger.push(dbRecord[rowNum].YoungSib3);

	if (dbRecord[rowNum].YoungSib4)
		boxYounger.push(dbRecord[rowNum].YoungSib4);

	if (dbRecord[rowNum].YoungSib5)
		boxYounger.push(dbRecord[rowNum].YoungSib5);

	if (dbRecord[rowNum].YoungSib6)
		boxYounger.push(dbRecord[rowNum].YoungSib6);

	if (dbRecord[rowNum].YoungSib7)
		boxYounger.push(dbRecord[rowNum].YoungSib7);

	return;
}

function allSiblingsList(rowNum, siblings)
{
	if (rowNum == undefined || rowNum < 0)
		return;
	
	if (dbRecord[rowNum].ElderSib1)
		siblings.push(dbRecord[rowNum].ElderSib1);
		
	if (dbRecord[rowNum].ElderSib2)
		siblings.push(dbRecord[rowNum].ElderSib2);
		
	if (dbRecord[rowNum].ElderSib3)
		siblings.push(dbRecord[rowNum].ElderSib3);
		
	if (dbRecord[rowNum].ElderSib4)
		siblings.push(dbRecord[rowNum].ElderSib4);
		
	if (dbRecord[rowNum].ElderSib5)
		siblings.push(dbRecord[rowNum].ElderSib5);

	if (dbRecord[rowNum].ElderSib6)
		siblings.push(dbRecord[rowNum].ElderSib6);

	if (dbRecord[rowNum].ElderSib7)
		siblings.push(dbRecord[rowNum].ElderSib7);
	
	siblings.push(rowNum);
	
	if (dbRecord[rowNum].YoungSib1)
		siblings.push(dbRecord[rowNum].YoungSib1);

	if (dbRecord[rowNum].YoungSib2)
		siblings.push(dbRecord[rowNum].YoungSib2);

	if (dbRecord[rowNum].YoungSib3)
		siblings.push(dbRecord[rowNum].YoungSib3);

	if (dbRecord[rowNum].YoungSib4)
		siblings.push(dbRecord[rowNum].YoungSib4);

	if (dbRecord[rowNum].YoungSib5)
		siblings.push(dbRecord[rowNum].YoungSib5);

	if (dbRecord[rowNum].YoungSib6)
		siblings.push(dbRecord[rowNum].YoungSib6);

	if (dbRecord[rowNum].YoungSib7)
		siblings.push(dbRecord[rowNum].YoungSib7);

	return;
}

function siblingsCount(rowNum)
{
	var count = 0;
	
	if (rowNum == undefined || rowNum < 0)
		return 0;
	
	if (dbRecord[rowNum].ElderSib1)
		count++;
		
	if (dbRecord[rowNum].ElderSib2)
		count++;
		
	if (dbRecord[rowNum].ElderSib3)
		count++;
		
	if (dbRecord[rowNum].ElderSib4)
		count++;
		
	if (dbRecord[rowNum].ElderSib5)
		count++;

	if (dbRecord[rowNum].ElderSib6)
		count++;

	if (dbRecord[rowNum].ElderSib7)
		count++;
	
	count++;
	
	if (dbRecord[rowNum].YoungSib1)
		count++;

	if (dbRecord[rowNum].YoungSib2)
		count++;
	
	if (dbRecord[rowNum].YoungSib3)
		count++;

	if (dbRecord[rowNum].YoungSib4)
		count++;

	if (dbRecord[rowNum].YoungSib5)
		count++;

	if (dbRecord[rowNum].YoungSib6)
		count++;

	if (dbRecord[rowNum].YoungSib7)
		count++;

	return count;
}

function childrenList(rowNum, child)
{
	if (rowNum == undefined || rowNum < 0)
		return;

	if (dbRecord[rowNum].Child1)
		child.push(dbRecord[rowNum].Child1);
		
	if (dbRecord[rowNum].Child2)
		child.push(dbRecord[rowNum].Child2);
		
	if (dbRecord[rowNum].Child3)
		child.push(dbRecord[rowNum].Child3);
		
	if (dbRecord[rowNum].Child4)
		child.push(dbRecord[rowNum].Child4);
		
	if (dbRecord[rowNum].Child5)
		child.push(dbRecord[rowNum].Child5);
		
	if (dbRecord[rowNum].Child6)
		child.push(dbRecord[rowNum].Child6);

	if (dbRecord[rowNum].Child7)
		child.push(dbRecord[rowNum].Child7);
	
	if (dbRecord[rowNum].Child8)
		child.push(dbRecord[rowNum].Child8);
	
	return;
}

function childCount(rowNum)
{
	var count = 0;
	
	if (rowNum == undefined || rowNum < 0)
		return 0;	

	if (dbRecord[rowNum].Child1)
		count++;
		
	if (dbRecord[rowNum].Child2)
		count++;
	
	if (dbRecord[rowNum].Child3)
		count++;
	
	if (dbRecord[rowNum].Child4)
		count++;
	
	if (dbRecord[rowNum].Child5)
		count++;
			
	if (dbRecord[rowNum].Child6)
		count++;

	if (dbRecord[rowNum].Child7)
		count++;

	if (dbRecord[rowNum].Child8)
		count++;
	
	return count;
}

function clickOnImage(imgId)
{
	var modal = document.getElementById("myModal");
	var img = document.getElementById(imgId);
	var modalImg = document.getElementById("img01");
	var captionText = document.getElementById("caption");

	modal.style.display = "block";
	modalImg.src = img.src;
	modalImg.style.maxWidth = window.innerWidth;

	var capt = "";
	
	if (language == TAMIL)
		capt = dbRecord[imgId].TamilName;
	else
		capt = dbRecord[imgId].Name;
	
	if (dbRecord[imgId].Address)
		capt += ", " + dbRecord[imgId].Address;
	
	if (dbRecord[imgId].Kulam)
	{
		captionText.style.height = "75px";
		capt += "<br>" + dbRecord[imgId].Kulam + "<br>";
	}
	
	captionText.innerHTML = capt;
}

function onModalClose()
{
	var modal = document.getElementById("myModal");
	modal.style.display = "none";
}

function backupImage(elem, img)
{
	/* Assign back image to display. */
	elem.src = img;
	elem.onerror = "";
}

function changeLang()
{
	if (language == TAMIL)
		language = ENGLISH;
	else
		language = TAMIL;
	
	loadPerson(baseRow);
}

function displayDetail()
{
	var elem = document.getElementsByName('detail');
              
	for(let i = 0; i < elem.length; i++) 
	{
		if(elem[i].checked)
		{
			var newMode = elem[i].value;
			if (!warnedAlready && newMode == "full" && window.innerWidth < 3600)
			{
				warnedAlready = true;
				if (!window.confirm("Screen size is just " + window.innerWidth + ". This mode will require big size screen.\nThe formatting may look bad. Do you want to continue?"))
				{
					elem[i].checked = false;
					if (displayMode == "medium")
						elem[1].checked = true;
					else 
						elem[0].checked = true;
					return;
				}
			}

			displayMode = elem[i].value;			
			loadPerson(baseRow);
			return;
		}
	}	
}