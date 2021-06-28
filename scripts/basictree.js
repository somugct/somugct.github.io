var excelRows;

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

const BOX1 = 0;
const BOX2 = 1;
const BOX3 = 2;
const BOX4 = 3;
const BOX5 = 4;
const BOX6 = 5;
const BOX7 = 6;
const BOX8 = 7;
const BOX9 = 8;
const BOX10 = 9;

var language = TAMIL;
var display = "full";
var baseRow = 0;

const FATHER = 1;
const MOTHER = 2;
const SPOUSE = 3;
const CHILDREN = 4;
const SIBLINGS = 5;

function initialize()
{
	const fileSelect = document.getElementById("fileSelect");
	const fileInput = document.getElementById("fileInput");	
		
	fileSelect.addEventListener("click", selectFile, false);
	fileInput.addEventListener("change", uploadData, false);
	
	document.getElementById("mainImg").height = window.innerHeight;
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
	
	console.log("File selected: " + datfile.files[0].name);
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
	
function getDataFromExcel(data) 
{
	//Read the data in binary
	var workbook = XLSX.read(data, {type: 'binary'});
	var myBar = document.getElementById("myBar");
	myBar.style.width = "25%";
	
	var Sheet = workbook.SheetNames[0];
 
	//Read all rows into an JSON array.
	excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);
	if (excelRows.length == 0)
	{
		alert("Nothing found in the database");
		return;
	}
	console.log(excelRows.length + " records found in the database");
	myBar.style.width = "30%";
	
	num = validate();
	
	var datfile = document.getElementById("fileInput");
	var label = document.getElementById("nrec");
	label.innerHTML = "Loaded <b>" + datfile.files[0].name + "</b>!!! <br>Found <b>" + num + "</b> records in the database.";
	label.style.display = "inline";
	
	myBar.style.width = "100%";
	document.getElementById("ready2go").style.display = "inline";
	document.getElementById("input").style.display = "inline";
	document.getElementById("personName").style.display = "inline";
	document.getElementById("submit").style.display = "inline";
}

function displayTree()	
{
	if (excelRows == undefined || excelRows.length == 0)
	{
		alert("Database is not loaded yet!!");
		return;
	}
	
	var person = document.getElementById("personName").value;
	var index;
	for (index = 0; index < excelRows.length; index++)
	{
		if (excelRows[index].Name == undefined)
			continue;
		
		//console.log("Comparing row " + index + ": " + excelRows[index].Name);		
		if (excelRows[index].Name.toLowerCase().search(person.toLowerCase()) >= 0)
			break;
	}
	
	if (index >= excelRows.length)
	{
		alert("\"" + person + "\" not found in the database.")
		index = 0;
	}
	
	/* Clean up the page */
	document.body.innerHTML = "";
	
	/* Save it for later use */
	baseRow = index;
	
	loadPerson(index);
}

function processLoadPerson(elem)
{
	if (excelRows[elem.id].Father == undefined && excelRows[elem.id].Mother == undefined && excelRows[elem.id].Spouse == undefined)
	{
		alert("Nothing more to display");
		return;
	}
	/* Clean up the page */
	document.body.innerHTML = "";

	/* Update the saved excel row number for later use */
	baseRow = elem.id;
	
	loadPerson(elem.id);
};

function pictureFile(num) 
{
    num = num.toString();
    while (num.length < 4) num = "0" + num;
    return "images/" + num + ".jpg";
}

function loadPerson(myRowNum)
{
	var pageContent =	
    "<!-- The Modal -->\n" + 
    "<div id=\"myModal\" class=\"my-modal\">\n" + 
	"	<!-- Modal Caption (Image Text) -->\n" + 
    "	<div id=\"caption\"></div>\n" + 	
    "	<!-- The Close Button -->\n" + 
    "	<span id=\"myClose\" onclick=\"onModalClose()\" class=\"close\">&times;</span>\n" + 
    "	<!-- Modal Content (The Image) -->\n" + 
    "	<img class=\"my-modal-content\" id=\"img01\">\n" + 
    "</div>\n\n";
	
	if (display == "full")
		pageContent += displayFullTree(myRowNum);
	else
	{
		pageContent +=
			"<!-- Page Container -->\n" + 
			"<div class=\"my-margin-top my-light-grey\" style=\"margin-left:auto; margin-right:auto; max-width:1900px;\"> \n" +
			"	<div class=\"my-container my-card-2\"> \n" +
			"		<!-- The Grid --> \n" +
			"		<div class=\"my-row-padding\"> \n" +
			"			<!-- Left Column --> \n" +
			"			<div class=\"my-quarter\"> \n" +
			"				<div class=\"my-white my-text-grey my-card-4 my-margin-top my-margin-bottom\"> \n" +
			"\n";
			pageContent += addLeftFrame(myRowNum);
			pageContent +=
			"\n\n" +
			"				</div> \n" +
			"			</div> \n" +
			"			<!-- End Left Column -->\n\n";
			pageContent += addRightFrame(myRowNum);
			pageContent +=
			"		</div>\n" +
			"		<!-- End Grid --> \n" +
			"	</div>\n" +
			"</div> \n" +
			"<!-- End Page Container -->\n\n";
	}
	
	pageContent += addFooter(myRowNum);
	
	//console.log(pageContent);
	document.body.innerHTML = pageContent;
}
function addLeftFrame(myRowNum)
{
	var name;
	if (language == TAMIL)
		name = excelRows[myRowNum].TamilName;
	else
		name = excelRows[myRowNum].Name;

	var imgName;
	if (excelRows[myRowNum].Gender == "Male")
		imgName = "images/nopicm.jpg";
	else
		imgName = "images/nopicf.jpg";
	
	var html =
    "                    <!-- Start Left Panel content. --> \n" +
    "                    <div class=\"my-display-container\"> \n" +
    "                        <img id=\"myImg\" onclick=\"clickOnImage(" + myRowNum + ")\" onerror=\"backupImage(this, '" + imgName + "')\" src=\"" + pictureFile(myRowNum) + "\" style=\"width:100%;\" alt=\"" + name + "\"> \n" +
    "                    </div>\n\n" +
    "                    <div class=\"my-margin-right my-margin-left\"> \n" +
    "                        <table width=\"100%\" border=\"0\"> \n" +
    "                            <tr><td colspan=2><h3 class=\"my-text-grey\"><b>" + name + "</b></h3></td></tr> \n" + 
    "                            <tr><td  style=\"vertical-align: top\"><i class=\"fa fa-calendar fa-fw my-margin-right my-large my-text-teal\"></i></td><td>" + excelRows[myRowNum].DOB + "</td></tr>\n" +
    "                            <tr><td  style=\"vertical-align: top; width:10%\"><i class=\"fa fa-home fa-fw my-margin-right my-large my-text-teal\"></i></td><td>" + excelRows[myRowNum].Address + "</td></tr> \n" +
    "                            <tr><td  style=\"vertical-align: top\"><i class=\"fa fa-phone fa-fw my-margin-right my-large my-text-teal\"></i></td><td>" + excelRows[myRowNum].Phone + "</td></tr> \n" +
    "                            <tr><td  style=\"vertical-align: top\"><i class=\"fa fa-envelope fa-fw my-margin-right my-large my-text-teal\"></i></td><td>" + excelRows[myRowNum].Email + "</td></tr> \n" +
    "                            <tr><td colspan=2><hr></td></tr> \n" +
    "                            <tr><td  style=\"vertical-align: top\"><i class=\"fa fa-certificate fa-fw my-margin-right my-large my-text-teal\"></i></td><td>" + excelRows[myRowNum].Education + "</td></tr> \n" +
    "                            <tr><td  style=\"vertical-align: top\"><i class=\"fa fa-suitcase fa-fw my-margin-right my-large my-text-teal\"></i></td><td>" + excelRows[myRowNum].Occupation + "</td></tr> \n" +
    "                            <tr><td colspan=2><hr></td></tr> \n" +
    "                            <tr><td  style=\"vertical-align: top\"><i class=\"fa fa-asterisk fa-fw my-margin-right my-large my-text-teal\"></i></td><td>" + excelRows[myRowNum].Kulam + "</td></tr> \n" +
    "                            <tr><td  style=\"vertical-align: top\"><i class=\"fas fa-gopuram fa-fw my-margin-right my-large my-text-teal\"></i></td><td>" + excelRows[myRowNum].Kovil + "</td></tr> \n" +
    "                        </table><br>\n";
	
	if (display == "medium")
		html +=
    "                        <br><br><br><br><br>\n";
	
	html +=
    "                    </div>\n" +	
    "                    <!-- End Left Panel content. --> \n";
	
	//console.log(html);
	return html;
}
function addRightFrame(myRowNum)
{
	var html =
    "            <!-- Right Column --> \n" +
    "             <div class=\"my-threequarter\"> \n" +
    "                <div class=\"my-card-2 my-white my-margin-bottom my-margin-top\" style=\"background-image: url('images/tree.jpg'); background-size: 100% 100%; background-repeat: no-repeat;\">\n\n\n" +
    "                     <!-- Start right Panel content. --> \n" +
    addTopPanel(myRowNum) +
    "\n" +
    addMidPanel(myRowNum) +
    "\n" +
    addBottomPanel(myRowNum) +
	"\n" +
    "                    <!-- End right Panel content. --> \n\n\n" +
    "                </div>\n" +
    "            </div>\n";
	
	return html;
}

function addFooter(myRowNum)
{
	var html =	"<footer class=\"my-container my-teal my-center my-margin-top\"> \n" +
				"	<p class=\"my-left\">" + myRowNum + "</p>\n"; 
	if (language == TAMIL)
		html += "	<button class=\"my-left my-margin-left my-margin-top\" style=\"width: 70px; height: 25px; opacity: 0.7\" onclick=changeLang() title=\"Click here to change the display language\">English</button>\n";
	else
		html += "	<button class=\"my-left my-margin-left my-margin-top\" style=\"width: 70px; height: 25px; opacity: 0.7\" onclick=changeLang() title=\"Click here to change the display language\">Tamil</button>\n";
	
	html +=		"	<div class=\"my-radio my-left my-margin-left my-margin-top\">\n";
	
	if (display == "compact")
		html +=	"		<input type=\"radio\" id=\"choice1\" onchange=\"displayDetail()\" name=\"detail\" value=\"compact\" checked>\n";
	else
		html +=	"		<input type=\"radio\" id=\"choice1\" onchange=\"displayDetail()\" name=\"detail\" value=\"compact\">\n";
	
	html +=		"		<label for=\"choice1\">Compact</label>\n";
	
	if (display == "medium")
		html +=	"		<input type=\"radio\" id=\"choice2\" onchange=\"displayDetail()\" name=\"detail\" value=\"medium\" checked>\n";
	else
		html +=	"		<input type=\"radio\" id=\"choice2\" onchange=\"displayDetail()\" name=\"detail\" value=\"medium\">\n";
	
	html +=		"		<label for=\"choice2\">Medium</label>\n";
	
	if (display == "full")
		html +=	"		<input type=\"radio\" id=\"choice3\" onchange=\"displayDetail()\" name=\"detail\" value=\"full\" checked>\n";
	else
		html +=	"		<input type=\"radio\" id=\"choice3\" onchange=\"displayDetail()\" name=\"detail\" value=\"full\">\n";

	html +=		"		<label for=\"choice3\">Full</label>\n" +
				"	</div>\n" +
				"	<p class=\"my-right\"><a href=\"mailto:shivani.poy@gmail.com\">-Shivani</a></p>\n" +
				"</footer>\n";

	return html;
}
function addTopPanel(myRowNum)
{
	/* Six boxes possible in top panel if someone has two spouses */
	var box1Elder = [];
	var box1Younger = [];
	var box2Elder = [];
	var box2Younger = [];
	var box3Elder = [];
	var box3Younger = [];
	var box4Elder = [];
	var box4Younger = [];
	var box5Elder = [];
	var box5Younger = [];
	var box6Elder = [];
	var box6Younger = [];
	
	var leftRowNum, rightRowNum;
	var leftFather = -1, leftMother = -1, rightFather = -1, rightMother = -1;
	var startPanel = 0;

	/* Split the area to four columns, 
	   set layout for four persons (grandparents or parents) and 
	   number of persons to display per row in a box.
	 */	
	var outerColSplit = "my-quarter";
	var layout = 0;
	var numPerRowInBox = 2;

	if (excelRows[myRowNum].Spouse)
	{
		leftRowNum = myRowNum;
		rightRowNum = excelRows[myRowNum].Spouse;
		startPanel = 1;
	}
    else
	{
		leftRowNum = excelRows[myRowNum].Father;
		rightRowNum = excelRows[myRowNum].Mother;	
		startPanel = 0;
	}
	
	if (excelRows[myRowNum].Spouse2)
	{
		/* Split it to six columns and set other appropriate values like above */
		outerColSplit = "my-sixth";
		layout = 1;
		numPerRowInBox = 1;
	}

	/* If no info available, display empty box */
	if (leftRowNum >= 0)
	{
		leftFather = excelRows[leftRowNum].Father;
		leftMother = excelRows[leftRowNum].Mother
	}
	if (rightRowNum >= 0)
	{
		rightFather = excelRows[rightRowNum].Father;
		rightMother = excelRows[rightRowNum].Mother;
	}
	
	/*
	console.log("myRowNum: " + myRowNum);
	console.log("excelRows[myRowNum].Spouse: " + excelRows[myRowNum].Spouse);
	console.log("leftRowNum: " + leftRowNum);
	console.log("rightRowNum: " + rightRowNum);
	console.log("leftFather: " + leftFather);
	console.log("leftMother: " + leftMother);	
	console.log("rightFather: " + rightFather);
	console.log("rightMother: " + rightMother);
	*/
	
	/* Process the siblings only when "medium" display mode is selected */
	if (display == "medium" || display == "full")
	{
		siblingsList(leftFather, box1Elder, box1Younger);
		siblingsList(leftMother, box2Elder, box2Younger);
		siblingsList(rightFather, box3Elder, box3Younger);
		siblingsList(rightMother, box4Elder, box4Younger);

		if (excelRows[myRowNum].Spouse2)
		{
			siblingsList(excelRows[excelRows[myRowNum].Spouse2].Father, box5Elder, box5Younger);
			siblingsList(excelRows[excelRows[myRowNum].Spouse2].Mother, box6Elder, box6Younger);
		}
	}
	
	/* Find out maximum rows required to display for the top panel */
	var maxRows = Math.max( (box1Elder.length + 1 + box1Younger.length + numPerRowInBox-1)/numPerRowInBox, 
							(box2Elder.length + 1 + box2Younger.length + numPerRowInBox-1)/numPerRowInBox, 
							(box3Elder.length + 1 + box3Younger.length + numPerRowInBox-1)/numPerRowInBox, 
							(box4Elder.length + 1 + box4Younger.length + numPerRowInBox-1)/numPerRowInBox,
							(box5Elder.length + 1 + box5Younger.length + numPerRowInBox-1)/numPerRowInBox,
							(box6Elder.length + 1 + box6Younger.length + numPerRowInBox-1)/numPerRowInBox);
							
	maxRows = Math.floor(maxRows);
	
	var topHTMLContent = 
		"                     <!-- Top Row -->\n" +
		"                     <div class=\"my-row-padding my-margin-bottom\"> \n" +
		"                         <div class=\"" + outerColSplit + "\">    \n" +
		"                             <div class=\"my-container my-shadow my-margin-top\"> \n";
	topHTMLContent += addBoxPeople(box1Elder, leftFather, box1Younger, maxRows, BOX1, startPanel, layout, numPerRowInBox);
	topHTMLContent +=
		"                             </div> \n" +
		"                         </div> \n" +
		"                         <div class=\"" + outerColSplit + "\">    \n" +
		"                             <div class=\"my-container my-shadow my-margin-top\"> \n";
	topHTMLContent += addBoxPeople(box2Elder, leftMother, box2Younger, maxRows, BOX2, startPanel, layout, numPerRowInBox);	
	topHTMLContent +=
		"                             </div> \n" +
		"                         </div> \n" +
		"                         <div class=\"" + outerColSplit + "\">    \n" +
		"                             <div class=\"my-container my-shadow my-margin-top\"> \n";
	topHTMLContent += addBoxPeople(box3Elder, rightFather, box3Younger, maxRows, BOX3, startPanel, layout, numPerRowInBox);	
	topHTMLContent +=
		"                             </div> \n" +
		"                         </div> \n" +	
		"                         <div class=\"" + outerColSplit + "\"> \n" +
		"                             <div class=\"my-container my-shadow my-margin-top\"> \n";
	topHTMLContent += addBoxPeople(box4Elder, rightMother, box4Younger, maxRows, BOX4, startPanel, layout, numPerRowInBox);	
	topHTMLContent +=
		"                             </div>\n" +
		"                         </div> \n";
	
	if (excelRows[myRowNum].Spouse2)
	{
		topHTMLContent +=
		"                         <div class=\"" + outerColSplit + "\">    \n" +
		"                             <div class=\"my-container my-shadow my-margin-top\"> \n";
		topHTMLContent += addBoxPeople(box5Elder, excelRows[excelRows[myRowNum].Spouse2].Father, box5Younger, maxRows, BOX5, startPanel, layout, numPerRowInBox);
		topHTMLContent +=
		"                             </div> \n" +
		"                         </div> \n";
		topHTMLContent +=
		"                         <div class=\"" + outerColSplit + "\">    \n" +
		"                             <div class=\"my-container my-shadow my-margin-top\"> \n";
		topHTMLContent += addBoxPeople(box6Elder, excelRows[excelRows[myRowNum].Spouse2].Mother, box6Younger, maxRows, BOX6, startPanel, layout, numPerRowInBox);	
		topHTMLContent +=
		"                             </div> \n" +
		"                         </div> \n";
	}
	
	topHTMLContent +=
		"                     </div>\n" +
		"                     <!-- Top Row Ends -->\n";

	//console.log(topHTMLContent);
	return topHTMLContent;
}

function addMidPanel(myRowNum)
{	
	/* Three boxes possible in mid panel if someone has two spouses */
	var box1Elder = [];
	var box1Younger = [];
	var box2Elder = [];
	var box2Younger = [];
	var box3Elder = [];
	var box3Younger = [];
	
	var leftRowNum, rightRowNum;
	var startPanel = 0;

	/* Split the area to two columns, 
	   set layout for two persons (husband/wife) and 
	   number of persons to display per row in a box.
	 */	
	var outerColSplit = "my-half";
	var layout = 2;
	var numPerRowInBox = 3;
	
	if (excelRows[myRowNum].Spouse)
	{
		leftRowNum = myRowNum;
		rightRowNum = excelRows[myRowNum].Spouse;
		startPanel = 1;
	}
    else
	{
		leftRowNum = excelRows[myRowNum].Father;
		rightRowNum = excelRows[myRowNum].Mother;	
		startPanel = 0;
	}
	
	if (excelRows[myRowNum].Spouse2)
	{
		/* Split it to three columns and set other appropriate values like above */
		outerColSplit = "my-third";
		layout = 3;
		numPerRowInBox = 2;
	}
		
	if (leftRowNum >= 0)
		siblingsList(leftRowNum, box1Elder, box1Younger);

	if (rightRowNum >= 0)
		siblingsList(rightRowNum, box2Elder, box2Younger);

	siblingsList(excelRows[myRowNum].Spouse2, box3Elder, box3Younger);
	
	/* Find out maximum rows required to display for the top panel */
	var maxRows = Math.max( (box1Elder.length + 1 + box1Younger.length + numPerRowInBox-1)/numPerRowInBox, 
							(box2Elder.length + 1 + box2Younger.length + numPerRowInBox-1)/numPerRowInBox, 
							(box3Elder.length + 1 + box3Younger.length + numPerRowInBox-1)/numPerRowInBox);
							
	maxRows = Math.floor(maxRows);
	
	var midHTMLContent =
		"                    <!-- Middle row starts --> \n" +
		"                    <div class=\"my-row-padding\"> \n" +
		"                        <div class=\"" + outerColSplit + " my-margin-bottom\">\n" +
		"                            <div class=\"my-container my-shadow\"> \n";
	midHTMLContent += addBoxPeople(box1Elder, leftRowNum, box1Younger, maxRows, BOX7, startPanel, layout, numPerRowInBox);
	midHTMLContent +=
		"                            </div> \n" +
		"                        </div> \n" +
		"                        <div class=\"" + outerColSplit + " my-margin-bottom\">\n" + 
		"                            <div class=\"my-container my-shadow\"> \n";
	midHTMLContent += addBoxPeople(box2Elder, rightRowNum, box2Younger, maxRows, BOX8, startPanel, layout, numPerRowInBox);
	midHTMLContent += 
		"                            </div> \n" +
		"                        </div>\n";
	
	if (excelRows[myRowNum].Spouse2)
	{
		midHTMLContent +=
		"                         <div class=\"" + outerColSplit + " my-margin-bottom\">\n" +
		"                             <div class=\"my-container my-shadow\">\n";
		midHTMLContent += addBoxPeople(box3Elder, excelRows[myRowNum].Spouse2, box3Younger, maxRows, BOX9, startPanel, layout, numPerRowInBox);
		midHTMLContent +=
		"                             </div>\n" +
		"                         </div>\n";
	}
	midHTMLContent +=
		"                    </div>\n" +
		"                    <!-- Middle row Ends -->\n";
	
	//console.log(midHTMLContent);	
	return midHTMLContent;
}
function addBoxPeople(boxElder, rowNum, boxYounger, maxRows, box, startPanel, layout, numPerRowInBox)
{
	var label = [ /* Starts at bottom panel or middle panel */
				  [  /* Boxes: 0, 1, 2, 3, 4, 5, 6, 7, 8 */
					[    /* Male  Female */
						[APPAIYA, AMUCHI],  /* Elder */	[APPAIYA, APPATHTHA],  /* Middle */	[APPAIYA, AMUCHI]	   /* Younger */
					],
					[
						[APPACHI, APPATHTHA], [APPAIYA, APPATHTHA], [APPACHI, APPATHTHA]
					],
					[
						[APPACHI, APPATHTHA], [APPACHI, AMUCHI], [APPACHI, APPATHTHA]
					],
					[
						[APPAIYA, AMUCHI], [APPACHI, AMUCHI], [APPAIYA, AMUCHI]
					],
					[
						[APPACHI, APPATHTHA], [APPACHI, AMUCHI], [APPACHI, APPATHTHA]
					],
					[
						[APPAIYA, AMUCHI], [APPACHI, AMUCHI], [APPAIYA, AMUCHI]
					],
					[
						[PERIYAPPA, ATHTHAI], [APPA, AMMA],	[CHITHTHAPPA, ATHTHAI]
					],
					[
						[MAMA, PERIYAMMA], [APPA, AMMA], [MAMA, CHITHTHI]
					],
					[
						[MAMA, PERIYAMMA], [APPA, AMMA], [MAMA, CHITHTHI]
					],
				  ],
				  [
					[
						[PERIYAPPA, ATHTHAI], [APPA, AMMA],	[CHITHTHAPPA, ATHTHAI]
					],
					[
						[MAMA, PERIYAMMA], [APPA, AMMA], [MAMA, CHITHTHI]
					],
					[
						[MAMANAAR, PERIYAMMA], [MAMANAAR, MAAMIYAAR], [MAMANAAR, CHITHTHI]
					],
					[
						[PERIYAPPA, MAAMIYAAR],	[MAMANAAR, MAAMIYAAR], [CHITHTHAPPA, MAAMIYAAR]
					],
					[
						[MAMANAAR, PERIYAMMA], [MAMANAAR, MAAMIYAAR], [MAMANAAR, CHITHTHI]
					],
					[
						[PERIYAPPA, MAAMIYAAR], [MAMANAAR, MAAMIYAAR], [CHITHTHAPPA, MAAMIYAAR]
					],
					[
						[ANNAN, AKKA], [NAAN, NAAN], [THAMBI, THANGAI]
					],
					[
						[MACHAN, NAATHANAAR], [KANAVAN, MANAIVI], [MACHINAN, KOLUNTHIYA]
					],
					[
						[MACHAN, NAATHANAAR], [KANAVAN, MANAIVI], [MACHINAN, KOLUNTHIYA]
					],
				  ]
				];

	var colArray = [ 
					[ 
					  ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"], 
					  ["my-half", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"],     
					  ["my-half", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth" ], 
					  ["my-half", "my-half", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth" ],          
					  ["my-half", "my-half", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth" ],         
					  ["my-half", "my-half", "my-half", "my-fullwidth", "my-fullwidth", "my-fullwidth" ],
					  ["my-half", "my-half", "my-half", "my-fullwidth", "my-fullwidth", "my-fullwidth" ],
					  ["my-half", "my-half", "my-half", "my-half", "my-half", "my-half" ]
					],       /* Two per row in a box - layout 0 - top panel */ 
					[ 
					  ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"], 
					  ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"], 
					  ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth" ],        
					  ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"], 
					  ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"], 
					  ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"],
					  ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"], 
					  ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"]
					],       /* One in each row in a box - layout 1 - top panel */
					[ 
					  ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"], 
					  ["my-half", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"],      
					  ["my-third", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"], 
					  ["my-half", "my-half", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth" ],          
					  ["my-third", "my-half", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth" ],        
					  ["my-third", "my-third", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth" ],
					  ["my-third", "my-half", "my-half", "my-fullwidth", "my-fullwidth", "my-fullwidth" ],
					  ["my-third", "my-third", "my-half", "my-fullwidth", "my-fullwidth", "my-fullwidth" ]
					],      /* Three in each row in a box - layout 2 - mid panel */
					[ 
					  ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"], 
					  ["my-half", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"],      
					  ["my-half", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth" ], 
					  ["my-half", "my-half", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth" ],
					  ["my-half", "my-half", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth" ],         
					  ["my-half", "my-half", "my-half", "my-fullwidth", "my-fullwidth", "my-fullwidth" ],
					  ["my-half", "my-half", "my-half", "my-fullwidth", "my-fullwidth", "my-fullwidth" ],
					  ["my-half", "my-half", "my-half", "my-half", "my-fullwidth", "my-fullwidth" ]
   				    ]       /* Two per row in a box - layout 3 - mid panel */
				   ];	
				   
	var bCount = boxElder.length + 1 + boxYounger.length;
	var count = 0;
	var HTMLContent = "";

	//console.log("Box: " + box + " maxRows: " + maxRows + " startPanel: " + startPanel + " bCount: " + bCount);	
	
	/* Add elders */
	for (let i = 0; i < boxElder.length; i++, count++)
		HTMLContent += addPerson(boxElder[i], colArray[layout][bCount-1][Math.floor(count/numPerRowInBox)], label[startPanel][box][ELDER], 0);

    /* Add the middle person */
	HTMLContent += addPerson(rowNum, colArray[layout][bCount-1][Math.floor(count/numPerRowInBox)], label[startPanel][box][MIDDLE], 1);
	count++;

    /* Add youngers */
	for (let i = 0; i < boxYounger.length; i++, count++)
		HTMLContent += addPerson(boxYounger[i], colArray[layout][bCount-1][Math.floor(count/numPerRowInBox)], label[startPanel][box][YOUNGER], 0);

	/* If no data is present, then atleast create an empty box */
	if (HTMLContent.length == 0)
	{
		/* 
		 * Gender is found by the box on which it works.
		 * Odd numbered boxes are female and even numbered boxes are male.
		 * Box9 (value 8) is for spouse2 which is female, but it is a even number. 
		 * Increase it by 1 so that it will calculte to female. Value 9 is not used anywhere.
		 */
		if (box == BOX9)
			box = BOX10;
		
		HTMLContent += addDummyImage(1, box, label[startPanel][box][MIDDLE]);
	}
	
	/* Fill the last rows if they are empty */
    for (let i = Math.floor((bCount + numPerRowInBox-1)/numPerRowInBox); i < maxRows; i++)
		HTMLContent += addDummyImage(0, 0, 0);
	
	return HTMLContent;
}

function addBottomPanel(myRowNum)
{
	var split = ["my-fullwidth", "my-half", "my-third", "my-quarter", "my-fifth", "my-sixth", "my-seventh", "my-eighth"];

	var bottomHTMLContent =
		"                    <!-- Bottom row starts --> \n" +
		"                    <div class=\"my-row-padding my-margin-bottom\"> \n" +
		"                        <div class=\"my-fullwidth my-margin-bottom\">\n" + 
		"                            <div class=\"my-container my-shadow\"> \n";

	if (excelRows[myRowNum].Spouse)
	{
		var child = [];
		childrenList(myRowNum, child);
		
		var colSplit = split[child.length-1];
		var label = [MAGAN, MAGAL];
	
		/* Married but if no children, nothing to add here */
		if (child.length == 0)
			return "";

		for (let i = 0; i < child.length; i++, count++)
			bottomHTMLContent += addPerson(child[i], colSplit, label, 1);
	}
	else
	{
		var boxElder = [];
		var boxYounger = [];
		siblingsList(myRowNum, boxElder, boxYounger);
		var label = [ [ANNAN, AKKA], [NAAN, NAAN], [THAMBI, THANGAI] ];

		var count = boxElder.length + 1 + boxYounger.length;
		var colSplit = split[count-1];
		
		/* Add the elders */
		for (let i = 0; i < boxElder.length; i++)
			bottomHTMLContent += addPerson(boxElder[i], colSplit, label[ELDER], 0);
		
		/* Add the middle person */
		bottomHTMLContent += addPerson(myRowNum, colSplit, label[MIDDLE], 1);		
	
		for (let i = 0; i < boxYounger.length; i++)
			bottomHTMLContent += addPerson(boxYounger[i], colSplit, label[YOUNGER], 0);
	}
	
	bottomHTMLContent += 
		"                            </div> \n" +
		"                        </div> \n" +
		"                    </div> \n" +
		"                    <!-- Bottom row ends -->\n";	

	//console.log(bottomHTMLContent);
	return bottomHTMLContent;
}

function addPerson(rowNum, colSplit, label, highlight)
{
	if (rowNum == undefined || rowNum < 0)
		return "";

	var imageClass = "my-image";
	var name, labelId, imgName;
	var imgOnClk = "onclick=\"processLoadPerson(this)\""
	var style = "";
	
	if (highlight)
		imageClass += " my-image-highlight";	
		
	if (excelRows[rowNum].Gender == "Male")
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
		imageClass = "my-blink-img";
		imgOnClk = " onclick=\"clickOnImage(" + rowNum + ")\" ";
		style = " style=\"width:100%;cursor: zoom-in; border-radius: 3px; transition: 0.3s;\" ";
 	}

	if (language == TAMIL)
		//name = excelRows[rowNum].TamilName.replace(/\s+/g, '');
		name = excelRows[rowNum].TamilName.trim().split(" ")[0];
	else
		name = excelRows[rowNum].Name.trim().split(" ")[0];
	
	var htmlContent =
		"                                <div class=\"" + colSplit + " my-center my-margin-top my-margin-bottom\">\n" +
		"                                    <img id=\"" + rowNum + "\" onerror=\"backupImage(this, '" + imgName + "')\" class=\"" + imageClass + "\" " + imgOnClk + style +
													" title=\"" + excelRows[rowNum].Nickname + "\" src=\"" + pictureFile(rowNum) + "\"alt=\"" + name + "\"> <br>\n" +	
		"                                    <label class=\"my-text-deep-purple\" for=\"" + name + "\"><b>" + name + "</b></label><br>\n" +											
		"                                    <label class=\"my-text-deep-orange\" for=\"" + labelArray[language][labelId] + "\"><b>" + labelArray[language][labelId] + "</b></label> \n" +
		"                                </div> \n";
	
	//console.log(htmlContent);
	return htmlContent;
}

function addDummyImage(visible, box, label)
{
	var name, labelId, imgName;
	var html = "";

	if (visible)
	{
		if ((box % 2) == 0)
		{
			/* Even numbered box */
			labelId = label[MALE];
			imgName = "images/nopicm.jpg";
			name = "Mr.X";
		}
		else
		{
			/* Odd numbered box */
			labelId =  label[FEMALE];
			imgName = "images/nopicf.jpg";
			name = "Mrs.X";
		}		

		html =	"								<div class=\"my-fullwidth my-center my-margin-top my-margin-bottom\">\n" +
				"									<img class=\"my-image my-image-highlight\" style=\"cursor: default;\" src=\"" + imgName + "\"><br>\n" +		
				"									<label class=\"my-text-deep-purple\"><b>" + name + "</b></label><br>\n" +
				"									<label class=\"my-text-deep-orange\"><b>" + labelArray[language][labelId] + "</b></label>\n" +					
				"								</div>\n\n";
	}
	else
	{
		html =	"								<div class=\"my-fullwidth my-center my-margin-top my-margin-bottom\">\n" +
				"									<img class=\"my-image my-dummy-image my-dummy-image-hover\" style=\"cursor: default;\" src=\"images/nodata.jpg\"><br>\n" +
				"									<label class=\"my-dummy-text\"><b>hello</b></label><br>\n" +											
				"									<label class=\"my-dummy-text\"><b>hello</b></label>\n" +		
				"								</div>\n";
	}
	return html;
}

function siblingsList(rowNum, boxElder, boxYounger)
{
	if (rowNum == undefined || rowNum < 0)
		return;
	
	if (excelRows[rowNum].ElderSib1)
		boxElder.push(excelRows[rowNum].ElderSib1);
		
	if (excelRows[rowNum].ElderSib2)
		boxElder.push(excelRows[rowNum].ElderSib2);
		
	if (excelRows[rowNum].ElderSib3)
		boxElder.push(excelRows[rowNum].ElderSib3);
		
	if (excelRows[rowNum].ElderSib4)
		boxElder.push(excelRows[rowNum].ElderSib4);
		
	if (excelRows[rowNum].ElderSib5)
		boxElder.push(excelRows[rowNum].ElderSib5);

	if (excelRows[rowNum].ElderSib6)
		boxElder.push(excelRows[rowNum].ElderSib6);

	if (excelRows[rowNum].ElderSib7)
		boxElder.push(excelRows[rowNum].ElderSib7);
	
	if (excelRows[rowNum].YoungSib1)
		boxYounger.push(excelRows[rowNum].YoungSib1);

	if (excelRows[rowNum].YoungSib2)
		boxYounger.push(excelRows[rowNum].YoungSib2);

	if (excelRows[rowNum].YoungSib3)
		boxYounger.push(excelRows[rowNum].YoungSib3);

	if (excelRows[rowNum].YoungSib4)
		boxYounger.push(excelRows[rowNum].YoungSib4);

	if (excelRows[rowNum].YoungSib5)
		boxYounger.push(excelRows[rowNum].YoungSib5);

	if (excelRows[rowNum].YoungSib6)
		boxYounger.push(excelRows[rowNum].YoungSib6);

	if (excelRows[rowNum].YoungSib7)
		boxYounger.push(excelRows[rowNum].YoungSib7);

	return;
}

function childrenList(rowNum, child)
{
	if (rowNum == undefined || rowNum < 0)
		return;

	if (excelRows[rowNum].Child1)
		child.push(excelRows[rowNum].Child1);
		
	if (excelRows[rowNum].Child2)
		child.push(excelRows[rowNum].Child2);
		
	if (excelRows[rowNum].Child3)
		child.push(excelRows[rowNum].Child3);
		
	if (excelRows[rowNum].Child4)
		child.push(excelRows[rowNum].Child4);
		
	if (excelRows[rowNum].Child5)
		child.push(excelRows[rowNum].Child5);
		
	if (excelRows[rowNum].Child6)
		child.push(excelRows[rowNum].Child6);

	if (excelRows[rowNum].Child7)
		child.push(excelRows[rowNum].Child7);
	
	if (excelRows[rowNum].Child8)
		child.push(excelRows[rowNum].Child8);
	
	return;
}

function childCount(rowNum)
{
	var count = 0;
	
	if (rowNum == undefined || rowNum < 0)
		return;	

	if (excelRows[rowNum].Child1)
		count++;
		
	if (excelRows[rowNum].Child2)
		count++;
	
	if (excelRows[rowNum].Child3)
		count++;
	
	if (excelRows[rowNum].Child4)
		count++;
	
	if (excelRows[rowNum].Child5)
			count++;
			
	if (excelRows[rowNum].Child6)
		count++;

	if (excelRows[rowNum].Child7)
		count++;

	if (excelRows[rowNum].Child8)
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
		capt = excelRows[imgId].TamilName;
	else
		capt = excelRows[imgId].Name;
	
	if (excelRows[imgId].Address)
		capt += ", " + excelRows[imgId].Address;
	
	if (excelRows[imgId].Kulam)
	{
		captionText.style.height = "75px";
		capt += "<br>" + excelRows[imgId].Kulam + "<br>";
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
			display = elem[i].value;
			loadPerson(baseRow);
		}
	}	
}