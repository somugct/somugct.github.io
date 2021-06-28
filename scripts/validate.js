function createTableRow(myRow, highlight)
{
	if (myRow == undefined)
		return "";
	
	var style = "";
	var html =  "<tr>\n" +
				"	<td>" + excelRows[myRow].ID + "</td>\n" +
				"	<td>" + excelRows[myRow].Name + "</td>\n";
				
	
	if (highlight == FATHER)
		style = "style=\"background-color:red; color:white\"";
	else
		style = "";
	
	if (excelRows[myRow].Father)
		html += "	<td " + style + ">" + excelRows[myRow].Father + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (highlight == MOTHER)
		style = "style=\"background-color:red; color:white\"";
	else
		style = "";
	
	if (excelRows[myRow].Mother)
		html += "	<td " + style + ">" + excelRows[myRow].Mother + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (highlight == SPOUSE)
		style = "style=\"background-color:red; color:white\"";
	else
		style = "";
	
	if (excelRows[myRow].Spouse)	
		html += "	<td " + style + ">" + excelRows[myRow].Spouse + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (excelRows[myRow].Spouse2)	
		html += "	<td " + style + ">" + excelRows[myRow].Spouse2 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (highlight == CHILDREN)
		style = "style=\"background-color:red; color:white\"";		
	else
		style = "";
		
	if (excelRows[myRow].Child1)	
		html += "	<td " + style + ">" + excelRows[myRow].Child1 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (excelRows[myRow].Child2)	
		html += "	<td " + style + ">" + excelRows[myRow].Child2 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (excelRows[myRow].Child3)	
		html += "	<td " + style + ">" + excelRows[myRow].Child3 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (excelRows[myRow].Child4)	
		html += "	<td " + style + ">" + excelRows[myRow].Child4 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (excelRows[myRow].Child5)	
		html += "	<td " + style + ">" + excelRows[myRow].Child5 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (excelRows[myRow].Child6)	
		html += "	<td " + style + ">" + excelRows[myRow].Child6 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (excelRows[myRow].Child7)	
		html += "	<td " + style + ">" + excelRows[myRow].Child7 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (excelRows[myRow].Child8)	
		html += "	<td " + style + ">" + excelRows[myRow].Child8 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";
	
	if (highlight == SIBLINGS)
		style = "style=\"background-color:red; color:white\"";	
	else
		style = "";
	
	if (excelRows[myRow].ElderSib1)	
		html += "	<td " + style + ">" + excelRows[myRow].ElderSib1 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";
	
	if (excelRows[myRow].ElderSib2)	
		html += "	<td " + style + ">" + excelRows[myRow].ElderSib2 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (excelRows[myRow].ElderSib3)	
		html += "	<td " + style + ">" + excelRows[myRow].ElderSib3 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (excelRows[myRow].ElderSib4)	
		html += "	<td " + style + ">" + excelRows[myRow].ElderSib4 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (excelRows[myRow].ElderSib5)	
		html += "	<td " + style + ">" + excelRows[myRow].ElderSib5 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (excelRows[myRow].ElderSib6)	
		html += "	<td " + style + ">" + excelRows[myRow].ElderSib6 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";
	
	if (excelRows[myRow].ElderSib7)	
		html += "	<td " + style + ">" + excelRows[myRow].ElderSib7 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";
	
	if (excelRows[myRow].YoungSib1)	
		html += "	<td " + style + ">" + excelRows[myRow].YoungSib1 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (excelRows[myRow].YoungSib2)	
		html += "	<td " + style + ">" + excelRows[myRow].YoungSib2 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (excelRows[myRow].YoungSib3)	
		html += "	<td " + style + ">" + excelRows[myRow].YoungSib3 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (excelRows[myRow].YoungSib4)	
		html += "	<td " + style + ">" + excelRows[myRow].YoungSib4 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (excelRows[myRow].YoungSib5)	
		html += "	<td " + style + ">" + excelRows[myRow].YoungSib5 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (excelRows[myRow].YoungSib6)	
		html += "	<td " + style + ">" + excelRows[myRow].YoungSib6 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";

	if (excelRows[myRow].YoungSib7)	
		html += "	<td " + style + ">" + excelRows[myRow].YoungSib7 + "</td>\n";
	else
		html +=	"	<td " + style + "></td>\n";
	
	html +=	"</tr>\n";
	return html;
}
/*
 * - Verify the spouses are referring to each other correctly 
 */
function validateSpouse(myRow)
{
	if (myRow == undefined)
		return "";
	
	var log = "";
	
	if (excelRows[myRow].Spouse == undefined && excelRows[myRow].Spouse2)
	{
		log += createTableRow(myRow, SPOUSE);
		console.error(myRow + ": **TEST1-1: Row " + myRow + " spouse is not set, but spouse2 is set. Wrong!!\n");
	}
	else if (excelRows[myRow].Spouse && excelRows[myRow].Spouse2 == undefined)
	{
		var sp = excelRows[myRow].Spouse;			
		if (excelRows[sp].Spouse == undefined)
		{
			console.error(myRow + ": TEST1-2: Row " + sp + "'s spouse is not set. Should it be set to " + myRow + "?\n");
			log += createTableRow(myRow, SPOUSE);
		}
		else if (myRow != excelRows[sp].Spouse)
		{
			console.error("TEST1-3: " + myRow + ": Spouse of row " + myRow + " is not same as the spouse of row " + sp + "\n");
			log += createTableRow(myRow, SPOUSE);
		}
	}			
	else if (excelRows[myRow].Spouse && excelRows[myRow].Spouse2)
	{
		var s1 = excelRows[myRow].Spouse;
		var s2 = excelRows[myRow].Spouse2;

		if (excelRows[s1].Spouse == undefined || excelRows[s1].Spouse2 == undefined)
		{
			console.error(myRow + ": TEST1-4: Spouses of row " + s1 + " is not complete\n");
			log += createTableRow(myRow, SPOUSE);
		}
		else if (excelRows[s1].Spouse != myRow && excelRows[s1].Spouse2 != myRow)
		{
			console.error(myRow + ": TEST1-5: Spouses of row " + s1 + " is wrong\n");
			log += createTableRow(myRow, SPOUSE);
		}

		if (excelRows[s2].Spouse == undefined || excelRows[s2].Spouse2 == undefined)
		{
			console.error(myRow + ": TEST1-6: Spouses of row " + s2 + " is not complete\n");	
			log += createTableRow(myRow, SPOUSE);
		}
		else if (excelRows[s2].Spouse != myRow && excelRows[s2].Spouse2 != myRow)
		{
			console.error(myRow + ": TEST1-7: Spouses of row " + s2 + " is wrong\n");	
			log += createTableRow(myRow, SPOUSE);
		}
	}	
	
	return log;
}
/*
 * - Verify both spouses have same children.
 */
function validateSpousesChildren(myRow)
{
	if (myRow == undefined)
		return "";
	
	var html = "";
	var s1 = excelRows[myRow].Spouse;
	var s2 = excelRows[myRow].Spouse2;
	
	var husband = [];
	var wife1 = [];
	var wife2 = [];
	
	if (excelRows[myRow].Gender == "Male")
	{
		childrenList(myRow, husband);
		childrenList(s1, wife1);
		childrenList(s2, wife2);
	}
	else
	{
		childrenList(s1, husband);
		childrenList(myRow, wife1);
		childrenList(s2, wife2);
	}

	if (husband.length != (wife1.length + wife2.length))
	{
		console.error(myRow + ": TEST2-1: Children count is not matching with spouse(s)\n");
		html += createTableRow(myRow, CHILDREN);
	}
	else
	{
		for (let i = 0; i < husband.length; i++)
		{
			var found = false;			
			for (let j = 0; !found && j < wife1.length; j++)
				if (husband[i] == wife1[j])
					found = true;

			for (let j = 0; !found && j < wife2.length; j++)
				if (husband[i] == wife2[j])
					found = true;
			
			if (!found)
			{
				console.error(myRow + ": TEST2-2: Children are not same as spouse(s) row\n");
				html += createTableRow(myRow, CHILDREN);
				break;
			}
		}
	}
	return html;
}
function validateParentsChildren(myRow)
{
	if (myRow == undefined)
		return "";
	
	var html = "";
	var children = [];
	childrenList(myRow, children);
	
	for (let i = 0; i < children.length; i++)
	{
		if (excelRows[myRow].Gender == "Male")
		{
			if (excelRows[children[i]].Father != myRow)
			{
				console.error(myRow + ": TEST3-1: Row " + children[i] + "'s Father is wrong\n");
				html += createTableRow(myRow, CHILDREN);
				break;
			}
		}
		else
		{
			if (excelRows[children[i]].Mother != myRow)
			{
				console.error(myRow + ": TEST3-2: Row " + children[i] + "'s Mother is wrong\n");
				html += createTableRow(myRow, CHILDREN);
				break;
			}
		}
	}
	
	if (excelRows[myRow].Father)
	{
		var fathers = [];
		childrenList(excelRows[myRow].Father, fathers);
		var found = false;
		
		for (let i = 0; !found && i < fathers.length; i++)
			if (fathers[i] == myRow)
				found = true;
			
		if (!found)
		{
			console.error(myRow + ": TEST3-3: is not found in Father's child list\n");
			html += createTableRow(myRow, FATHER);
		}
	}
	
	if (excelRows[myRow].Mother)
	{
		var mothers = [];
		childrenList(excelRows[myRow].Mother, mothers);
		var found = false;
		
		for (let i = 0; !found && i < mothers.length; i++)
			if (mothers[i] == myRow)
				found = true;
			
		if (!found)
		{
			console.error(myRow + ": TEST3-4 is not found in Mother's child list\n");
			html += createTableRow(myRow, MOTHER);
		}		
	}
	
	return html;
}

function validateSiblings1(myRow)
{
	if (myRow == undefined)
		return "";

	var html = "";
	var myElder = [];
	var myYounger = [];
	siblingsList(myRow, myElder, myYounger)
	var siblingsCount = myElder.length + myYounger.length;
	//console.log("myRow " + myRow);
	
	for (let i = 0; i < myElder.length; i++)
	{
		var elder = [];
		var younger = [];
		siblingsList(myElder[i], elder, younger);
		//console.log("myElder["+i+"] = " + myElder[i]);
		
		var found = false;			
		for (let j = 0; !found && j < elder.length; j++)
			if (elder[j] == myRow)
				found = true;

		for (let j = 0; !found && j < younger.length; j++)
			if (younger[j] == myRow)
				found = true;

		if (!found)	
		{
			console.error(myRow + ": TEST4-1 is not found in sibling's list of " + myElder[i] + "\n");
			html += createTableRow(myRow, SIBLINGS);
			break;
		}
	}
	for (let i = 0; i < myYounger.length; i++)
	{
		var elder = [];
		var younger = [];
		siblingsList(myYounger[i], elder, younger);
		//console.log("myYounger["+i+"] = " + myYounger[i]);
		
		var found = false;
		for (let j = 0; !found && j < elder.length; j++)
			if (elder[j] == myRow)
				found = true;

		for (let j = 0; !found && j < younger.length; j++)
			if (younger[j] == myRow)
				found = true;
			
		if (!found)	
		{
			console.error(myRow + ": TEST4-2 is not found in sibling's list of " + myYounger[i] + "\n");
			html += createTableRow(myRow, SIBLINGS);
			break;
		}			
	}

	return html;
}
function validateSiblings2(myRow)
{
	if (myRow == undefined)
		return "";

	if (excelRows[myRow].Mother == undefined)
		return "";
	
	var html = "";
	var mothersChildren = [];
	childrenList(excelRows[myRow].Mother, mothersChildren)

	var myElder = [];
	var myYounger = [];
	siblingsList(myRow, myElder, myYounger);
		
	for (let i = 0; i < mothersChildren.length; i++)
	{
		if (mothersChildren[i] == myRow)
			continue;
		
		var found = false;
		for (let j = 0; !found && j < myElder.length; j++)
			if (myElder[j] == mothersChildren[i])
				found = true;

		for (let j = 0; !found && j < myYounger.length; j++)
			if (myYounger[j] == mothersChildren[i])
				found = true;
			
		if (!found)	
		{
			console.error("TEST5-1: " + myRow + "'s sibling list is not right\n");
			html += createTableRow(myRow, SIBLINGS);
			break;
		}				
	}
	return html;
}
function validateGender(myRow)
{
	var html = "";
	
	if (excelRows[myRow].Father)
	{
		var father = excelRows[myRow].Father;
		if (excelRows[father].Gender != "Male")
		{
			console.error("TEST6-1: " + myRow + "'s father's gender is wrong\n");
			html += createTableRow(myRow, FATHER);
		}
	}
	if (excelRows[myRow].Mother)
	{
		var mother = excelRows[myRow].Mother;
		if (excelRows[mother].Gender != "Female")
		{
			console.error("TEST6-2: " + myRow + "'s mother's gender is wrong\n");
			html += createTableRow(myRow, MOTHER);
		}
	}
	
	var spouse = excelRows[myRow].Spouse;
	if (spouse && excelRows[myRow].Gender == excelRows[spouse].Gender)
	{
		console.error("TEST6-3: Row " + myRow + "'s gender is same as the spouse\n");
		html += createTableRow(myRow, SPOUSE);
	}
	
	spouse2 = excelRows[myRow].Spouse2;
	if (spouse2 && excelRows[myRow].Gender != "Male" && excelRows[spouse].Gender == excelRows[spouse2].Gender)
	{
		console.error("TEST6-4: Row " + myRow + "'s gender is same as the spouse\n");
		html += createTableRow(myRow, SPOUSE);
	}
	return html;
}
function validate()
{
	var errLog = "";
	var myBar = document.getElementById("myBar");
	
	/* Already progressed to 30% in loading the data 
	 * Remaining 70% is for validating the data.
	 */
	var progress = 30;
	var addp = 70/excelRows.length; /* Amount to be added for each iteration */
	var count = 0;
	
	for (let index = 0; index < excelRows.length; index++)
	{
		if (excelRows[index].Name == undefined)
			continue;
		
		progress += addp;
		myBar.style.width = Math.round(progress) + "%";
		
		
		errLog += validateSpouse(index);
		errLog += validateSpousesChildren(index);
		errLog += validateParentsChildren(index);
		errLog += validateSiblings1(index);
		errLog += validateSiblings2(index);
		errLog += validateGender(index);
		
		count++;
	}

	var table = document.getElementById("errInfo");	
	table.style.display = "block";
	table.style.border = "none";
	
	if (errLog.length)
	{
		table.style.textAlign = "center";
		
		var html =  "<caption>Below records have some inconsistencies. Check console log also for details</caption>\n" + 
			    "<tr>\n" + 
				"	<th>ID</th>\n" + 
				"	<th>Name</th>\n" + 
				"	<th>Father</th>\n" + 
				"	<th>Mother</th>\n" + 
				"	<th>Spouse</th>\n" + 
				"	<th>Spouse2</th>\n" + 
				"	<th>Child1</th>\n" + 
				"	<th>Child2</th>\n" + 
				"	<th>Child3</th>\n" + 
				"	<th>Child4</th>\n" + 
				"	<th>Child5</th>\n" + 
				"	<th>Child6</th>\n" + 
				"	<th>Child7</th>\n" + 
				"	<th>Child8</th>\n" + 				
				"	<th>ES1</th>\n" + 
				"	<th>ES2</th>\n" + 
				"	<th>ES3</th>\n" + 
				"	<th>ES4</th>\n" + 
				"	<th>ES5</th>\n" + 
				"	<th>ES6</th>\n" + 
				"	<th>ES7</th>\n" + 				
				"	<th>YS1</th>\n" + 
				"	<th>YS2</th>\n" + 
				"	<th>YS3</th>\n" + 
				"	<th>YS4</th>\n" + 
				"	<th>YS5</th>\n" + 
				"	<th>YS6</th>\n" + 
				"	<th>YS7</th>\n" + 				
				"</tr>\n";

		table.innerHTML = html + errLog;
	}
	return count;
}