const GGPARENTS = 0;
const GPARENTS = 1;
const PARENTS = 2;
const KIDS = 3;

var generation = [];
var split = ["my-fullwidth", "my-half", "my-third", "my-quarter", "my-fifth", "my-sixth", "my-seventh", "my-eighth", "my-ninth", "my-tenth", "my-eleventh", "my-twelveth",];

function addGenerations(current, next)
{
	for (let i = 0; i < generation[current].length; i++)
	{
		row = generation[current][i];
		if (row == -1)
		{
			generation[next].push(-1);
			generation[next].push(-1);			
		}
		else
		{
			if (excelRows[row].Father)
				generation[next].push(excelRows[row].Father);
			else
				generation[next].push(-1);
		
			if (excelRows[row].Mother)
				generation[next].push(excelRows[row].Mother);
			else
				generation[next].push(-1);			 
		}
	}
}

function displayFullTree(myRowNum)
{
	for (let index = GGPARENTS; index <= KIDS; index++)
		generation[index] = new Array();

	if (excelRows[myRowNum].Spouse)
	{
		generation[PARENTS].push(myRowNum);
		generation[PARENTS].push(excelRows[myRowNum].Spouse);
		
		if (excelRows[myRowNum].Spouse2)
			generation[PARENTS].push(excelRows[myRowNum].Spouse2);
		
		childrenList(myRowNum, generation[KIDS]);
		kidsAddType = CHILDREN;
	}
    else
	{
		generation[KIDS].push(myRowNum);
		kidsAddType = SIBLINGS;
		addGenerations(KIDS, PARENTS);
	}
	
	addGenerations(PARENTS, GPARENTS);
	addGenerations(GPARENTS, GGPARENTS);

	/*
	for (let i = 0; i < generation.length; i++)
	{
		for (let j = 0; j < generation[i].length; j++)
		{
			if (generation[i][j] == -1)
				console.log("generation[" + i + "][" + j + "] excelRow : " + generation[i][j] + " Name : -");
			else
				console.log("generation[" + i + "][" + j + "]  excelRow : " + generation[i][j] + " Name : " + excelRows[generation[i][j]].Name);
		}
	}
	*/
	
	var pageContent =
		"<!-- Page Container -->\n" + 
		"<div class=\"my-margin-top my-light-grey\" style=\"margin-left:auto; margin-right:auto; max-width:1900px;\"> \n" +
		"	<div class=\"my-container my-card-2\" style=\"background-image: url('images/tree.jpg'); background-size: 100% 100%; background-repeat: no-repeat;\">\n\n" +
		addGreatGrandParents(kidsAddType) +	
		"\n" +	
		addTopPanel(myRowNum) +
		"\n" +
		addMidPanel(myRowNum) +
		"\n";

	if (kidsAddType == CHILDREN)
		pageContent += addKids();
	else
		pageContent += addAsKid();

	pageContent +=
		"\n" +	
		"	</div>\n" +
		"</div> \n" +
		"<!-- End Page Container -->\n\n";

	return pageContent;
}
function addGreatGrandParents(baseGen)
{
	var label = [
				  [
					[APPAIYA, APPATHTHA], [APPAIYA, APPATHTHA], [APPACHI, AMUCHI], [APPACHI, AMUCHI],
					[APPACHI, AMUCHI], [APPACHI, AMUCHI], [APPAIYA, APPATHTHA], [APPAIYA, APPATHTHA],
					[APPACHI, AMUCHI], [APPACHI, AMUCHI], [APPAIYA, APPATHTHA], [APPAIYA, APPATHTHA]
				  ],
				  [
					[POOTTAN, POOTTI], [POOTTAN, POOTTI], [POOTTAN, POOTTI], [POOTTAN, POOTTI],
					[POOTTAN, POOTTI], [POOTTAN, POOTTI], [POOTTAN, POOTTI], [POOTTAN, POOTTI],
					[POOTTAN, POOTTI], [POOTTAN, POOTTI], [POOTTAN, POOTTI], [POOTTAN, POOTTI]
				  ]
				];
					
	var colSplit = 	split[generation[GGPARENTS].length-1];
	var labelId = baseGen == CHILDREN ? 0 : 1;
	var html = 		"		<!-- First Row starts -->\n" +
					"		<div class=\"my-row-padding my-margin-top\">\n";

	for (let i = 0; i < generation[GGPARENTS].length; i++)
	{
		var rowNum = generation[GGPARENTS][i];
		
		if (rowNum == -1)
		{
			html +=	"			<div class=\"" + colSplit + "\">\n" +
					"				<div class=\"my-container my-shadow\">\n\n";
			html += addDummyImage(1, i, label[labelId][i]);
			html +=		
					"				</div>\n" +
					"			</div>\n";
			continue;
		}

		html += 	"			<div class=\"" + colSplit + "\">\n" +
					"				<div class=\"my-container my-shadow\">\n\n" +
					addPerson(rowNum, "my-fullwidth", label[labelId][i], 1) +
					"				</div>\n" +
					"			</div>\n";
	}
	html += 		"		</div>\n" +
					"		<!-- First Row ends -->\n";

	return html;
}

function addKids()
{
	var colSplit = split[generation[KIDS].length-1];
	var label = [MAGAN, MAGAL];	
	var spLabel = [MARUMAGAN, MARUMAGAL];		
	var found = false;

	for (let i = 0; !found && i < generation[KIDS].length; i++)
		if (excelRows[generation[KIDS][i]].Spouse)
			found = true;
			
	/* If none of the kids are married, then put them all in one box */
	if (!found)
	{
		var html =
				"					<!-- Fourth row starts --> \n" +
				"					<div class=\"my-row-padding\">\n" +				
				"						<div class=\"my-fullwidth my-margin-bottom\">\n" + 
				"							<div class=\"my-container my-shadow\">\n\n";

		if (generation[KIDS].length == 0) /* No kids. Atleast add an empty box.  */
			html += addDummyImage(0, 0, 0);
		else
			for (let i = 0; i < generation[KIDS].length; i++)
				html += addPerson(generation[KIDS][i], colSplit, label, 1);

		html +=
				"							</div> \n" +
				"						</div> \n" +
				"					</div> \n" +				
				"					<!-- Fourth row ends --> \n";
		//console.log(html);
		return html;
	}

	var html =  "						<!-- Fourth row starts --> \n" +	
				"						<div class=\"my-row-padding\">\n" +
				"							<div class=\"my-fullwidth my-margin-bottom\">\n" +
				"								<div class=\"my-container my-shadow\">\n" + 
				"									<div class=\"my-row-padding my-margin-top\">\n\n";
	
	/* Atleast one kid is married. All have to be separate box with spouses */
	for (let i = 0; i < generation[KIDS].length; i++)
	{
		html +=	"										<div class=\"" + colSplit + " my-margin-bottom\">\n" + 
				"											<div class=\"my-container my-shadow\">\n\n";
					
		rowNum = generation[KIDS][i];
		if (excelRows[rowNum].Spouse)
		{
			html += addPerson(rowNum, "my-half", label, 1);
			html += addPerson(excelRows[rowNum].Spouse, "my-half", spLabel, 0);
		}
		else
		{
			html += addPerson(rowNum, "my-fullwidth", label, 1);
		}
		html +=	"											</div>\n" +
				"										</div>\n\n";
	}
	
	html += addGrandKids();
	html +=		"									</div>\n" +
				"								</div>\n" +
				"							</div>\n" +
				"						</div>\n" +
				"						<!-- Fourth row ends -->\n";					
	//console.log(html);
	return html;
}

function addAsKid()
{
	if (generation[KIDS].length <= 0)
	{
		alert("kids generation length can't be zero.")
		return;
	}

	var rowNum = generation[KIDS][0]; /* There will be only one entry */
	var boxElder = [];
	var boxYounger = [];
			
	siblingsList(rowNum, boxElder, boxYounger);
	var label = [ [ANNAN, AKKA], [NAAN, NAAN], [THAMBI, THANGAI] ];

	var count = boxElder.length + 1 + boxYounger.length;
	var colSplit = split[count-1];

	var html =	"						<!-- Fourth row starts --> \n" +
				"						<div class=\"my-row-padding my-margin-bottom\"> \n" +
				"							<div class=\"my-fullwidth my-margin-bottom\">\n" + 
				"								<div class=\"my-container my-shadow\">\n\n";
				
	/* Add the elders */
	for (let i = 0; i < boxElder.length; i++)
		html += addPerson(boxElder[i], colSplit, label[ELDER], 0);
	
	/* Add the middle person */
	html += addPerson(rowNum, colSplit, label[MIDDLE], 1);		
	
	/* Add the youngers */
	for (let i = 0; i < boxYounger.length; i++)
		html += addPerson(boxYounger[i], colSplit, label[YOUNGER], 0);
		
	html +=		"\n" +
				"								</div>\n" +
				"							</div> \n" +
				"						</div>\n" +
				"						<!-- Fourth row ends -->\n";	

	//console.log(html);
	return html;		
}

function addGrandKids()
{
	var colSplit = split[generation[KIDS].length-1];
	var label = [PERAN, PAETHI];

	var colArray =  [ 
					  /* count 1 */ ["my-fullwidth" ], /* first row */
					  /* count 2 */ ["my-half" ],      /* first row */
					  /* count 3 */ ["my-half", "my-fullwidth" ], /* 2nd row */
					  /* count 4 */ ["my-half", "my-half" ],      /* 2nd row */    
					  /* count 5 */ ["my-half", "my-half", "my-fullwidth" ],/* 3rd row */        
					  /* count 6 */ ["my-half", "my-half", "my-half" ],		/* 3rd row */
					  /* count 7 */ ["my-half", "my-half", "my-half", "my-fullwidth" ], /* 4th row */
					  /* count 8 */ ["my-half", "my-half", "my-half", "my-half" ]		/* 4th row */
					];

	var html = "";
	var maxCount = 0;
	const MAXPERROW = 2;
	
	for (let i = 0; i < generation[KIDS].length; i++)
		maxCount = Math.max(childCount(generation[KIDS][i]), maxCount);

	var displayRows =  Math.floor((maxCount+MAXPERROW-1)/MAXPERROW);
	
	for (let i = 0; i < generation[KIDS].length; i++)
	{	
		var child = [];
		childrenList(generation[KIDS][i], child);

		html +=	"										<div class=\"" + colSplit + " my-margin-bottom\">\n" + 
				"											<div class=\"my-container my-shadow\">\n\n";
				
		for (let i = 0, count = 0; i < child.length; i++, count++)
				html += addPerson(child[i], colArray[child.length-1][Math.floor(count/MAXPERROW)], label, 1);

		/* Fill the last rows if they are empty */
		for (let i = Math.floor((child.length + MAXPERROW-1)/MAXPERROW); i < displayRows; i++)
			html += addDummyImage(0, 0, 0);
	
		html +=	"\n" +
				"											</div> \n" +
				"										</div>\n";
	}
	return html;
}