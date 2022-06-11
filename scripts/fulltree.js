const GrGrPARENTS = 0;
const GrPARENTS = 1;
const PARENTS = 2;
const KIDS = 3;

var generation = [];

const split = [
			 "my-fullwidth", "my-half", "my-third", "my-quarter", "my-fifth", "my-sixth", 
			 "my-seventh", "my-eighth", "my-ninth", "my-tenth", "my-eleven", "my-twelve",
			 "my-thirteen", "my-fourteen", "my-fifteen", "my-sixteen", "my-seventeen", "my-eighteen",
			 "my-nineteen", "my-twenty"
			];

const colorsArray = [ "black", "green", "blue", "purple", "aqua", "lime", "teal", "yellow", "orange", "red" ];
const BLACK = 0;
const GREEN = 1;
const BLUE = 2;
const PURPLE = 3;
const AQUA = 4;
const LIME = 5;
const TEAL = 6;
const YELLOW = 7;
const ORANGE = 8;
const RED = 9;
	
function addGenerations(genArray, current, next)
{
	for (let i = 0; i < genArray[current].length; i++)
	{
		row = genArray[current][i];
		if (row == -1)
		{
			genArray[next].push(-1);
			genArray[next].push(-1);			
		}
		else
		{
			if (dbRecord[row].Father)
				genArray[next].push(dbRecord[row].Father);
			else
				genArray[next].push(-1);
		
			if (dbRecord[row].Mother)
				genArray[next].push(dbRecord[row].Mother);
			else
				genArray[next].push(-1);			 
		}
	}
}

function addSpouse(genArray, rowNum)
{
	if (dbRecord[rowNum].Spouse)
	{
		genArray[PARENTS].push(dbRecord[rowNum].Spouse);
		
		if (dbRecord[rowNum].Spouse2)
			genArray[PARENTS].push(dbRecord[rowNum].Spouse2);
		
		childrenList(rowNum, genArray[KIDS]);
	}
}

function getFullGen(fullGen, myRowNum)
{
	var bottomRow;
	
	for (let index = GrGrPARENTS; index <= KIDS; index++)
		fullGen[index] = new Array();

	if (dbRecord[myRowNum].Spouse)
	{
		bottomRow = CHILDREN;		
		fullGen[PARENTS].push(myRowNum);

		var siblings = [];
		allSiblingsList(myRowNum, siblings);
	
		for (let index = 0; index < siblings.length; index++)
			addSpouse(fullGen, siblings[index]);
	}
    else
	{
		bottomRow = SIBLINGS;		
		var fatherSiblings = [];
		var motherSiblings = [];
		
		allSiblingsList(dbRecord[myRowNum].Father, fatherSiblings);
		allSiblingsList(dbRecord[myRowNum].Mother, motherSiblings);

		fullGen[PARENTS].push(dbRecord[myRowNum].Father);

		for (let index = 0; index < fatherSiblings.length; index++)
			addSpouse(fullGen, fatherSiblings[index]);
		
		for (let index = 0; index < motherSiblings.length; index++)
		{
			if (dbRecord[myRowNum].Mother != motherSiblings[index])
				addSpouse(fullGen, motherSiblings[index]);
		}
	}
	
	/* Get grand parents */
	addGenerations(fullGen, PARENTS, GrPARENTS);

	/* Get great grand parents */	
	addGenerations(fullGen, GrPARENTS, GrGrPARENTS);

	/*
	for (let i = 0; i < fullGen.length; i++)
	{
		for (let j = 0; j < fullGen[i].length; j++)
		{
			if (fullGen[i][j] == -1)
				console.log("fullGen[" + i + "][" + j + "] dbRecord : " + fullGen[i][j] + " Name : -");
			else
				console.log("fullGen[" + i + "][" + j + "]  dbRecord : " + fullGen[i][j] + " Name : " + dbRecord[fullGen[i][j]].Name);
		}
	}
	*/
	return bottomRow;
}

function getCompactGen(compactGen, myRowNum)
{
	var bottomRow;
	
	for (let index = GrGrPARENTS; index <= KIDS; index++)
		compactGen[index] = new Array();

	if (dbRecord[myRowNum].Spouse)
	{
		compactGen[PARENTS].push(myRowNum);
		compactGen[PARENTS].push(dbRecord[myRowNum].Spouse);
		
		if (dbRecord[myRowNum].Spouse2)
			compactGen[PARENTS].push(dbRecord[myRowNum].Spouse2);
		
		childrenList(myRowNum, compactGen[KIDS]);
		bottomRow = CHILDREN;
	}
    else
	{
		bottomRow = SIBLINGS;
		compactGen[KIDS].push(myRowNum);
		addGenerations(compactGen, KIDS, PARENTS);
	}
	
	/* Get grand parents */
	addGenerations(compactGen, PARENTS, GrPARENTS);
	
	/* Get great grand parents */	
	addGenerations(compactGen, GrPARENTS, GrGrPARENTS);
	
	/*
	console.log("\n");
	for (let i = 0; i < compactGen.length; i++)
	{
		for (let j = 0; j < compactGen[i].length; j++)
		{
			if (compactGen[i][j] == -1)
				console.log("compactGen[" + i + "][" + j + "] dbRecord : " + compactGen[i][j] + " Name : -");
			else
				console.log("compactGen[" + i + "][" + j + "]  dbRecord : " + compactGen[i][j] + " Name : " + dbRecord[compactGen[i][j]].Name);
		}
	} */
	
	return bottomRow;
}

function shouldHighLight(myRowNum, level)
{
	if (myRowNum < 0)
		return false;

	for (let j = 0; j < generation[level].length; j++)
		if (generation[level][j] == myRowNum)
			return true;
	
	return false;
}

function shouldDummyHighlight(level, box)
{
	/* Start checking down from next level */
	var boxNo = Math.floor(box/2);

	for (let lvl = level+1; lvl <= PARENTS; lvl++)
	{
		if (shouldHighLight(generation[lvl][boxNo], lvl))
			return true;

		boxNo = Math.floor(boxNo/2);
	}

	return false;
}

function displayFullTree(myRowNum)
{
	var bottomRow;
	var screenWidth;

	if (displayMode == "medium")
	{
		bottomRow = getCompactGen(generation, myRowNum);
		screenWidth = 1900;
	}
	else
	{
		bottomRow = getFullGen(generation, myRowNum);
		screenWidth = window.innerWidth > 3800 ? window.innerWidth : 3800;
	}

	var lid = bottomRow == CHILDREN ? 0 : 1;
	
	var pageContent =
		"<!-- Page Container -->\n" + 
		"<div class=\"my-margin-top my-light-grey\" style=\"margin-left:auto; margin-right:auto; max-width:" + screenWidth + "px;\">\n" +
		"	<div class=\"my-container my-card-2\" style=\"background-image: url('images/bg" + bgPicNum + ".jpg'); background-size: 100% 100%; background-repeat: no-repeat;\">\n\n" +
		addLevelZero(lid) +	
		"\n" +	
		addLevelOne(lid) +
		"\n" +
		addLevelTwo(lid) +
		"\n";

	if (bottomRow == CHILDREN)
		pageContent += addKidsAndGrandKids();
	else
		pageContent += addAsKid(myRowNum);

	pageContent +=
		"\n" +	
		"	</div>\n" +
		"</div> \n" +
		"<!-- End Page Container -->\n\n";

	//console.log(pageContent);
	return pageContent;
}

function addLevelZero(labelId)
{
	var label = [ /* Starting at bottom panel or middle panel */
				  [  /* Boxes: 0 to 35 */
					[APPAIYA, APPATHTHA], [APPAIYA, APPATHTHA], [APPACHI, AMUCHI],
					[APPACHI, AMUCHI],    [APPACHI, AMUCHI],    [APPACHI, AMUCHI],
					[APPAIYA, APPATHTHA], [APPAIYA, APPATHTHA],	[APPACHI, AMUCHI],
					[APPACHI, AMUCHI],    [APPAIYA, APPATHTHA], [APPAIYA, APPATHTHA],
					[INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE],
					[INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE],
					[INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE],
					[INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE],
					[INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE],
					[INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE],
					[INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE],
					[INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE]
				  ],
				  [
					[POOTTAN, POOTTI], [POOTTAN, POOTTI], [POOTTAN, POOTTI],
					[POOTTAN, POOTTI], [POOTTAN, POOTTI], [POOTTAN, POOTTI], 
					[POOTTAN, POOTTI], [POOTTAN, POOTTI], [POOTTAN, POOTTI],
					[POOTTAN, POOTTI], [POOTTAN, POOTTI], [POOTTAN, POOTTI],
					[INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE],
					[INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE],
					[INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE],
					[INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE],
					[INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE],
					[INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE],
					[INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE],
					[INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE]
				  ]
				];

	/* If no valid entry to display, skip this panel */
	var validFound = false;	
	for (let i = 0; i < generation[GrGrPARENTS].length; i++)
	{
		if (generation[GrGrPARENTS][i] >= 0)
		{
			validFound = true;
			break;
		}
	}
		
	if (!validFound)
		return "";
	
	var html = 		"		<!-- First Row starts -->\n" +
					"		<div class=\"my-row-padding my-margin-top\">\n";

	let i = 0;
	while (i < generation[GrGrPARENTS].length)
	{
		var highlight = shouldHighLight(generation[GrGrPARENTS][i], GrGrPARENTS);
		
		if (generation[GrGrPARENTS].length > 12)
		{
			var colSplit = split[((generation[GrGrPARENTS].length)/2)-1];
	
			html +=	"			<div class=\"" + colSplit + "\">\n" +
					"				<div class=\"my-container my-shadow\">\n\n";
			if (generation[GrGrPARENTS][i] == -1)
				html += addDummyImage(true, i, label[labelId][i], shouldDummyHighlight(GrGrPARENTS, i));
			else
				html += addPerson(generation[GrGrPARENTS][i], "my-fullwidth", label[labelId][i], highlight, colorsArray[RED]);

			if (generation[GrGrPARENTS][i+1] == -1)
				html += addDummyImage(true, i+1, label[labelId][i+1], shouldDummyHighlight(GrGrPARENTS, i+1));
			else
				html += addPerson(generation[GrGrPARENTS][i+1], "my-fullwidth", label[labelId][i+1], highlight, colorsArray[RED]);
	
			i += 2;
		}
		else
		{
			var colSplit = split[generation[GrGrPARENTS].length-1];
		
			html +=	"			<div class=\"" + colSplit + "\">\n" +
					"				<div class=\"my-container my-shadow\">\n\n";
			if (generation[GrGrPARENTS][i] == -1)
				html += addDummyImage(true, i, label[labelId][i], shouldDummyHighlight(GrGrPARENTS, i));
			else
				html += addPerson(generation[GrGrPARENTS][i], "my-fullwidth", label[labelId][i], highlight, colorsArray[RED]);

			i++;
		}
	
		html +=		"				</div>\n" +
					"			</div>\n";			
	}
	
	html +=			"\n" +
					"		</div>\n" +
					"		<!-- First Row ends -->\n";
	//console.log(html);
	return html;
}

function addLevelOne(labelId)
{
	var label = [ /* Starts at bottom panel or middle panel */
				  [  /* Boxes: 0, 1, 2, 3, 4, 5, 6 */
						 /* Elder */		 /* Middle */		   /* Younger */				  
					[ [PERIYAPPA, ATHTHAI], [APPA, AMMA],	[CHITHTHAPPA, ATHTHAI] ],
					[ [MAMA, PERIYAMMA], [APPA, AMMA], [MAMA, CHITHTHI] ],
					[ [MAMANAAR, PERIYAMMA], [MAMANAAR, MAAMIYAAR], [MAMANAAR, CHITHTHI] ],
					[ [PERIYAPPA, MAAMIYAAR],	[MAMANAAR, MAAMIYAAR], [CHITHTHAPPA, MAAMIYAAR] ],
					[ [MAMANAAR, PERIYAMMA], [MAMANAAR, MAAMIYAAR], [MAMANAAR, CHITHTHI] ],
					[ [PERIYAPPA, MAAMIYAAR], [MAMANAAR, MAAMIYAAR], [CHITHTHAPPA, MAAMIYAAR] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ]				
				  ],
				  [
					[ [APPAIYA, AMUCHI], [APPAIYA, APPATHTHA], [APPAIYA, AMUCHI] ],
					[ [APPACHI, APPATHTHA], [APPAIYA, APPATHTHA], [APPACHI, APPATHTHA] ],
					[ [APPACHI, APPATHTHA], [APPACHI, AMUCHI], [APPACHI, APPATHTHA]	],
					[ [APPAIYA, AMUCHI], [APPACHI, AMUCHI], [APPAIYA, AMUCHI] ],
					[ [APPACHI, APPATHTHA], [APPACHI, AMUCHI], [APPACHI, APPATHTHA] ],
					[ [APPAIYA, AMUCHI], [APPACHI, AMUCHI], [APPAIYA, AMUCHI] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
					[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ]
				  ]				  
				];	

	return addLevelCommon(2, GrPARENTS, label[labelId]);	
}

function addLevelTwo(labelId)
{
	var label = [   /* Starts at bottom panel or middle panel */
					[ 	/* Boxes: 0, 1, 2 */
						[ [ANNAN, AKKA], [NAAN, NAAN], [THAMBI, THANGAI] ],
						[ [MACHAN, NAATHANAAR], [KANAVAN, MANAIVI], [MACHINAN, KOLUNTHIYA] ],
						[ [MACHAN, NAATHANAAR], [KANAVAN, MANAIVI], [MACHINAN, KOLUNTHIYA] ],
						[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
						[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
						[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
						[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
						[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
						[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ]
					],
					[
						[ [PERIYAPPA, ATHTHAI], [APPA, AMMA], [CHITHTHAPPA, ATHTHAI] ],
						[ [MAMA, PERIYAMMA], [APPA, AMMA], [MAMA, CHITHTHI] ],
						[ [MAMA, PERIYAMMA], [APPA, AMMA], [MAMA, CHITHTHI]	],
						[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
						[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
						[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
						[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
						[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ],
						[ [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE], [INV_MALE, INV_FEMALE] ]
					]
				];
				
	return addLevelCommon(3, PARENTS, label[labelId]);
}
	
function addLevelCommon(maxColumnInBox, level, label)
{
	var colSplit = 	split[generation[level].length-1];
	var colArray = [ "", "my-fullwidth", "my-half", "my-third" ];
	var numRows = 0;

	/* Find out number of rows required to display */
	for (let index = 0; index < generation[level].length; index++)
	{
		var count = siblingsCount(generation[level][index]);
		numRows = Math.max(numRows, Math.ceil(count/maxColumnInBox));
	}
	
	/* If no valid entry to display, skip this level */
	if (numRows == 0)
		return "";

	var html = 		"		<!-- Level " + (level + 1) + " Row Starts -->\n" +
					"		<div class=\"my-row-padding my-margin-top\"> \n";
	
	for (let index = 0; index < generation[level].length; index++)
	{
		html +=		"			<div class=\"" + colSplit + "\">\n" +
					"				<div class=\"my-container my-shadow\">\n";
					
		var siblings = [];
		allSiblingsList(generation[level][index], siblings);
		
		var remaining = siblings.length;
		var numColumn = siblings.length > maxColumnInBox ? maxColumnInBox : siblings.length;		
		var rows = 1;
		var sib = ELDER;

		if (siblings.length <= numRows * 1)
			numColumn = 1;
		else if (siblings.length <= numRows * 2)
			numColumn = 2;
		
		for (let i = 0, column = 0, color = BLACK, colorIdx = 0; i < siblings.length; i++, column++, remaining--)
		{
			if (column >= numColumn)
			{
				/* After done with previous calculated number of columns, recalculate new column count and reset the counter */
				numColumn = remaining > maxColumnInBox ? maxColumnInBox : remaining;
				if (remaining <= (numRows-rows) * 1)
					numColumn = 1;	
				else if (remaining <= (numRows-rows) * 2)
					numColumn = 2;
		
				/* Reset the counter */
				column = 0;
				rows++;
			}
			
			//console.log("level = " + level + " index = " + index + " colorIdx = " + colorIdx);
			//console.log("siblings[" + i + "] = " + siblings[i]);
			
			/* Get different border color for each slibling and their spouses.
			 * Same color border will be used for kids also.
			 */
			if (dbRecord[siblings[i]].Spouse)
				color = getParentsColor(index, colorIdx++, siblings[i], level);
			else
				color = BLACK;
			
			//console.log("color = " + color);
			//console.log("generation["+level+"]["+index+"] = " + generation[level][index]);
			//console.log("siblings["+i+"] = " + siblings[i]);

			var highlight = false;
			if (generation[level][index] == siblings[i])
				highlight = true;

			if (displayMode == "full" && level == PARENTS && index == 0)
				highlight = true;

			/* Siblings list will be in ELDER, MIDDLE and YOUNGER order always */
			if (highlight)
				sib = MIDDLE;
				
			html += addPerson(siblings[i], colArray[numColumn], label[index][sib], highlight, colorsArray[color]);
			
			if (sib == MIDDLE)
				sib = YOUNGER;
			
			/* If second spouse is there, skip to next color index */
			if (dbRecord[siblings[i]].Spouse2)
				colorIdx++;
		}

		/* 
		 * Gender is found by the box on which it works to display dummy image and label.
		 * Odd numbered boxes are female and even numbered boxes are male.
		 * Spouse2 will is female, but it will be at an even number, change it to odd number before sending.
		 */		
		if (siblings.length == 0)
		{
			var dummyHighlight = shouldDummyHighlight(level, index);
			html += addDummyImage(true, index, label[index][MIDDLE], dummyHighlight);
		}

		for (let i = rows; i < numRows; i++)
			html += addDummyImage(false, 0, 0, false);
		
		html +=		"				</div>\n" +
					"			</div>\n";
	}	
	
	html +=			"		</div>\n" +
					"		<!-- Level " + (level + 1) + "  Ends -->\n";		

	//console.log(html);
	return html;
}

function getParentsColor(index, family, rowNum, level)
{
	if (displayMode != "full")
		return BLACK;
	
	/* Process for level 2 */
	if (level == GrPARENTS)
	{
		if (generation[level][index] == rowNum)
			return RED;

		return BLACK;
	}

	/* Process for level 3 */
	if (index == 0)
		return (family + 1);

	/* If it is a spouse, assign the index as it's color */
	if (rowNum == generation[level][index])
		return index;

	/* If spouse's sibling is coming next in the list, find and assign their index as the color */	
	for (let tmp = index; tmp < generation[level].length; tmp++)
	{
		var sp = generation[level][tmp]
		if (rowNum == dbRecord[sp].Spouse || rowNum == dbRecord[sp].Spouse2)
			return tmp;
	}

	/* For all siblings, set to default color. */
	return BLACK;
}

/* Get the border color same as parents */
function getColor(rowNum)
{
	if (displayMode != "full")
		return colorsArray[BLACK];
	
	for (let box = 1; box < generation[PARENTS].length; box++)
		if (dbRecord[rowNum].Father == generation[PARENTS][box] || dbRecord[rowNum].Mother == generation[PARENTS][box])
			return colorsArray[box];

	console.error("Father or Mother must be found in the parents level. Something wrong for " + rowNum);
	return colorsArray[BLACK];
}

function addKidsAndGrandKids()
{
	var colSplit;
		
	if (generation[KIDS].length > 0)
		colSplit = split[generation[KIDS].length-1];
	else
		colSplit = split[0];
		
	var label = [MAGAN, MAGAL];	
	var spLabel = [MARUMAGAN, MARUMAGAL];		
	var rowNum;

	var html =  "		<!-- Fourth row starts --> \n" +	
				"		<div class=\"my-row-padding\">\n" +
				"			<div class=\"my-fullwidth my-margin-top my-margin-bottom\">\n" +
				"				<div class=\"my-container my-shadow\">\n" + 
				"					<div class=\"my-row-padding my-margin-top\">\n";

	/* Walk through and if anyone has two spouses, we may need to add dummy image */	
	var spousePresent = false;
	var spouse2Present = false;
	for (let i = 0; i < generation[KIDS].length; i++)
	{	
		rowNum = generation[KIDS][i];
		if (dbRecord[rowNum].Spouse)
			spousePresent = true;
		
		if (dbRecord[rowNum].Spouse2)
			spouse2Present = true;
	}
	
	var breakRowCount = 5;
	if (displayMode == "full")
		breakRowCount = 10;

	for (let i = 0; i < generation[KIDS].length; i++)
	{
		rowNum = generation[KIDS][i];
		var highlight = shouldHighLight(rowNum, KIDS);
		var color = getColor(rowNum);

		html +=	"						<div class=\"" + colSplit + " my-margin-bottom\">\n" + 
				"							<div class=\"my-container my-shadow\">\n\n";
		
		if (dbRecord[rowNum].Spouse)
		{
			/* If there are more than 'breakRowCount' couples to display, then add them in two rows */
			if (generation[KIDS].length > breakRowCount)
			{
				html += addPerson(rowNum, "my-fullwidth", label, highlight, color);
				html += addPerson(dbRecord[rowNum].Spouse, "my-fullwidth", spLabel, false, color);
				
				if (dbRecord[rowNum].Spouse2)
					html += addPerson(dbRecord[rowNum].Spouse2, "my-fullwidth", spLabel, false, color);
				else if (spouse2Present) /* Atleast one has spouse2. The dummy image must be added for others also */
					html += addDummyImage(false, 0, 0, false);
			}
			else
			{
				if (dbRecord[rowNum].Spouse2)
				{
					html += addPerson(rowNum, "my-third", label, highlight, color);
					html += addPerson(dbRecord[rowNum].Spouse, "my-third", spLabel, false, color);
					html += addPerson(dbRecord[rowNum].Spouse2, "my-third", spLabel, false, color);
				}
				else
				{
					html += addPerson(rowNum, "my-half", label, highlight, color);
					html += addPerson(dbRecord[rowNum].Spouse, "my-half", spLabel, false, color);
				}
			}				
		}
		else
		{
			html += addPerson(rowNum, "my-fullwidth", label, highlight, color);
			/* If there are more than 'breakRowCount' couples to display, then second row also be added. */
			if (generation[KIDS].length > breakRowCount)
			{
				html += addDummyImage(false, 0, 0, false);  /* This is for spouse */
				if (spouse2Present) 			    		/* This is for spouse2 */
					html += addDummyImage(false, 0, 0, false);				
			}
		}
		
		html +=	"							</div>\n" +
				"						</div>\n\n";
	}

	/* If no kids to display, add empty box */
	if (generation[KIDS].length == 0)
		html += addDummyImage(false, 0, 0, false);	

	if (spousePresent)
		html += addGrandKids();
	
	html +=		"					</div>\n" +
				"				</div>\n" +
				"			</div>\n" +
				"		</div>\n" +
				"		<!-- Fourth row ends -->\n";

	//console.log(html);
	return html;
}

function addGrandKids()
{
	var label = [PERAN, PAETHI];
	var colSplit;

	if (generation[KIDS].length > 0)
		colSplit = split[generation[KIDS].length-1];
	else
		colSplit = split[0];
		
	var colArray = [ 
					[ 
					  /* count 1 */ ["my-fullwidth" ], /* first row  */
					  /* count 2 */ ["my-half" ],      /* first row  */
					  /* count 3 */ ["my-half", "my-fullwidth" ], /* 2nd row */
					  /* count 4 */ ["my-half", "my-half" ],      /* 2nd row */    
					  /* count 5 */ ["my-half", "my-half", "my-fullwidth" ],/* 3rd row */        
					  /* count 6 */ ["my-half", "my-half", "my-half" ],		/* 3rd row */
					  /* count 7 */ ["my-half", "my-half", "my-half", "my-fullwidth" ], /* 4th row */
					  /* count 8 */ ["my-half", "my-half", "my-half", "my-half" ]		/* 4th row */
					],
					[
					  /* count 1 */ ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"], /* 1st row */
					  /* count 2 */ ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"], /* 2nd row */
					  /* count 3 */ ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"], /* 3rd row */       
					  /* count 4 */ ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"], /* 4th row */   
					  /* count 5 */ ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"], /* 5th row */
					  /* count 6 */ ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"], /* 6th row */
					  /* count 7 */ ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"], /* 7th row */
					  /* count 8 */ ["my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth", "my-fullwidth"]  /* 8th row */					
					]
				   ];

	var html = "";
	var maxCount = 0;
	var MAXPERROW = 2;
	var col = 0;

	if (displayMode == "full" && generation[KIDS].length > 10)
	{
		MAXPERROW = 1;
		col = 1;
	}
	
	for (let i = 0; i < generation[KIDS].length; i++)
		maxCount = Math.max(childCount(generation[KIDS][i]), maxCount);

	var displayRows =  Math.floor((maxCount+MAXPERROW-1)/MAXPERROW);

	for (let index = 0; index < generation[KIDS].length; index++)
	{	
		var child = [];
		childrenList(generation[KIDS][index], child);
		var highlight = shouldHighLight(generation[KIDS][index], KIDS);
		var color = getColor(generation[KIDS][index]);
		
		html +=	"						<div class=\"" + colSplit + " my-margin-bottom\">\n" + 
				"							<div class=\"my-container my-shadow\">\n";
				
		for (let i = 0, count = 0; i < child.length; i++, count++)
				html += addPerson(child[i], colArray[col][child.length-1][Math.floor(count/MAXPERROW)], label, highlight, color);

		/* Fill the last rows if they are empty */
		for (let i = Math.floor((child.length + MAXPERROW-1)/MAXPERROW); i < displayRows; i++)
			html += addDummyImage(false, 0, 0, false);
	
		html +=	"							</div>\n" +
				"						</div>\n";
	}
	
	return html;
}

function addAsKid(myRowNum)
{
	var label = [ [ANNAN, AKKA], [NAAN, NAAN], [THAMBI, THANGAI] ];
	
	/* Number of siblings group can be found by looking at parents level 
	 * If any of them don't have kids, that family can be ignored for this level
	 */
	var familyCount = 0;

	for (let i = 0; i < generation[PARENTS].length; i++)
		if (childCount(generation[PARENTS][i]) > 0)
			familyCount++;
		
	/* PARENTS level will have one family box common. 
	 * i.e all siblings in one box and their spouses in separate box
	 */
	familyCount--;

	var html =	"			<!-- Level Four starts --> \n" +
				"			<div class=\"my-row-padding my-margin-top my-margin-bottom\"> \n";
				
	let index = 0; 
	while (index < generation[KIDS].length)
	{
		html +=		"			<div class=\"" + split[familyCount-1] + "\">\n" +
					"				<div class=\"my-container my-shadow\">\n\n";

		var siblings = [];
		allSiblingsList(generation[KIDS][index], siblings);
		var color = getColor(generation[KIDS][index]);
		var labelId = ELDER;
		
		for (let i = 0; i < siblings.length; i++)
		{
			if (siblings[i] != myRowNum)
				html += addPerson(siblings[i], split[siblings.length-1], label[labelId], false, color);		
			else
			{
				html += addPerson(siblings[i], split[siblings.length-1], label[MIDDLE], true, color);
				labelId = YOUNGER;
			}
		}
		
		index += siblings.length;
		
		html +=		"				</div>\n" +
					"			</div>\n";
	}

	html +=			"		</div>\n" +
					"		<!-- Level Four Ends -->\n";

	return html;		
}