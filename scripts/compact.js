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

function displayCompactTree(myRowNum)
{
	var pageContent =
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

	//console.log(pageContent);	
	return pageContent;
}

function addLeftFrame(myRowNum)
{
	var name;
	if (language == TAMIL)
		name = dbRecord[myRowNum].TamilName;
	else
		name = dbRecord[myRowNum].Name;

	var imgName;
	if (dbRecord[myRowNum].Gender == "Male")
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
    "                            <tr><td  style=\"vertical-align: top\"><i class=\"fa fa-calendar fa-fw my-margin-right my-large my-text-teal\"></i></td><td>" + dbRecord[myRowNum].DOB + "</td></tr>\n" +
    "                            <tr><td  style=\"vertical-align: top; width:10%\"><i class=\"fa fa-home fa-fw my-margin-right my-large my-text-teal\"></i></td><td>" + dbRecord[myRowNum].Address + "</td></tr> \n" +
    "                            <tr><td  style=\"vertical-align: top\"><i class=\"fa fa-phone fa-fw my-margin-right my-large my-text-teal\"></i></td><td>" + dbRecord[myRowNum].Phone + "</td></tr> \n" +
    "                            <tr><td  style=\"vertical-align: top\"><i class=\"fa fa-envelope fa-fw my-margin-right my-large my-text-teal\"></i></td><td>" + dbRecord[myRowNum].Email + "</td></tr> \n" +
    "                            <tr><td colspan=2><hr></td></tr> \n" +
    "                            <tr><td  style=\"vertical-align: top\"><i class=\"fa fa-certificate fa-fw my-margin-right my-large my-text-teal\"></i></td><td>" + dbRecord[myRowNum].Education + "</td></tr> \n" +
    "                            <tr><td  style=\"vertical-align: top\"><i class=\"fa fa-suitcase fa-fw my-margin-right my-large my-text-teal\"></i></td><td>" + dbRecord[myRowNum].Occupation + "</td></tr> \n" +
    "                            <tr><td colspan=2><hr></td></tr> \n" +
    "                            <tr><td  style=\"vertical-align: top\"><i class=\"fa fa-asterisk fa-fw my-margin-right my-large my-text-teal\"></i></td><td>" + dbRecord[myRowNum].Kulam + "</td></tr> \n" +
    "                            <tr><td  style=\"vertical-align: top\"><i class=\"fas fa-gopuram fa-fw my-margin-right my-large my-text-teal\"></i></td><td>" + dbRecord[myRowNum].Kovil + "</td></tr> \n" +
    "                        </table><br>\n" +
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

	if (dbRecord[myRowNum].Spouse)
	{
		leftRowNum = myRowNum;
		rightRowNum = dbRecord[myRowNum].Spouse;
		startPanel = 1;
	}
    else
	{
		leftRowNum = dbRecord[myRowNum].Father;
		rightRowNum = dbRecord[myRowNum].Mother;	
		startPanel = 0;
	}
	
	if (dbRecord[myRowNum].Spouse2)
	{
		/* Split it to six columns and set other appropriate values like above */
		outerColSplit = "my-sixth";
		layout = 1;
		numPerRowInBox = 1;
	}

	/* If no info available, display empty box */
	if (leftRowNum >= 0)
	{
		leftFather = dbRecord[leftRowNum].Father;
		leftMother = dbRecord[leftRowNum].Mother
	}
	if (rightRowNum >= 0)
	{
		rightFather = dbRecord[rightRowNum].Father;
		rightMother = dbRecord[rightRowNum].Mother;
	}
	
	/*
	console.log("myRowNum: " + myRowNum);
	console.log("dbRecord[myRowNum].Spouse: " + dbRecord[myRowNum].Spouse);
	console.log("leftRowNum: " + leftRowNum);
	console.log("rightRowNum: " + rightRowNum);
	console.log("leftFather: " + leftFather);
	console.log("leftMother: " + leftMother);	
	console.log("rightFather: " + rightFather);
	console.log("rightMother: " + rightMother);
	*/
	
	siblingsList(leftFather, box1Elder, box1Younger);
	siblingsList(leftMother, box2Elder, box2Younger);
	siblingsList(rightFather, box3Elder, box3Younger);
	siblingsList(rightMother, box4Elder, box4Younger);

	if (dbRecord[myRowNum].Spouse2)
	{
		siblingsList(dbRecord[dbRecord[myRowNum].Spouse2].Father, box5Elder, box5Younger);
		siblingsList(dbRecord[dbRecord[myRowNum].Spouse2].Mother, box6Elder, box6Younger);
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
	
	if (dbRecord[myRowNum].Spouse2)
	{
		topHTMLContent +=
		"                         <div class=\"" + outerColSplit + "\">    \n" +
		"                             <div class=\"my-container my-shadow my-margin-top\"> \n";
		topHTMLContent += addBoxPeople(box5Elder, dbRecord[dbRecord[myRowNum].Spouse2].Father, box5Younger, maxRows, BOX5, startPanel, layout, numPerRowInBox);
		topHTMLContent +=
		"                             </div> \n" +
		"                         </div> \n";
		topHTMLContent +=
		"                         <div class=\"" + outerColSplit + "\">    \n" +
		"                             <div class=\"my-container my-shadow my-margin-top\"> \n";
		topHTMLContent += addBoxPeople(box6Elder, dbRecord[dbRecord[myRowNum].Spouse2].Mother, box6Younger, maxRows, BOX6, startPanel, layout, numPerRowInBox);	
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
	
	if (dbRecord[myRowNum].Spouse)
	{
		leftRowNum = myRowNum;
		rightRowNum = dbRecord[myRowNum].Spouse;
		startPanel = 1;
	}
    else
	{
		leftRowNum = dbRecord[myRowNum].Father;
		rightRowNum = dbRecord[myRowNum].Mother;	
		startPanel = 0;
	}
	
	if (dbRecord[myRowNum].Spouse2)
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

	siblingsList(dbRecord[myRowNum].Spouse2, box3Elder, box3Younger);
	
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
	
	if (dbRecord[myRowNum].Spouse2)
	{
		midHTMLContent +=
		"                         <div class=\"" + outerColSplit + " my-margin-bottom\">\n" +
		"                             <div class=\"my-container my-shadow\">\n";
		midHTMLContent += addBoxPeople(box3Elder, dbRecord[myRowNum].Spouse2, box3Younger, maxRows, BOX9, startPanel, layout, numPerRowInBox);
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
					  ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"],        
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
		HTMLContent += addPerson(boxElder[i], colArray[layout][bCount-1][Math.floor(count/numPerRowInBox)], label[startPanel][box][ELDER], 0, "black");

    /* Add the middle person */
	HTMLContent += addPerson(rowNum, colArray[layout][bCount-1][Math.floor(count/numPerRowInBox)], label[startPanel][box][MIDDLE], 1, "black");
	count++;

    /* Add youngers */
	for (let i = 0; i < boxYounger.length; i++, count++)
		HTMLContent += addPerson(boxYounger[i], colArray[layout][bCount-1][Math.floor(count/numPerRowInBox)], label[startPanel][box][YOUNGER], 0, "black");

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
		
		HTMLContent += addDummyImage(1, box, label[startPanel][box][MIDDLE], true);
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

	if (dbRecord[myRowNum].Spouse)
	{
		var child = [];
		childrenList(myRowNum, child);
		
		var colSplit = split[child.length-1];
		var label = [MAGAN, MAGAL];
	
		/* Married but if no children, nothing to add here */
		if (child.length == 0)
			return "";

		for (let i = 0; i < child.length; i++, count++)
			bottomHTMLContent += addPerson(child[i], colSplit, label, 1, "black");
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
			bottomHTMLContent += addPerson(boxElder[i], colSplit, label[ELDER], false, "black");
		
		/* Add the middle person */
		bottomHTMLContent += addPerson(myRowNum, colSplit, label[MIDDLE], false, "black");		
	
		for (let i = 0; i < boxYounger.length; i++)
			bottomHTMLContent += addPerson(boxYounger[i], colSplit, label[YOUNGER], false, "black");
	}
	
	bottomHTMLContent += 
		"                            </div> \n" +
		"                        </div> \n" +
		"                    </div> \n" +
		"                    <!-- Bottom row ends -->\n";	

	//console.log(bottomHTMLContent);
	return bottomHTMLContent;
}