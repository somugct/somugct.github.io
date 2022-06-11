function initialize()
{
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) 
	{
		var modal = document.getElementById('myModal');		
		if (event.target == modal)
			modal.style.display = "none";
	}
}

function processLoadPerson(elem)
{
	var myform = document.getElementById("myIdForm");
	var input = document.getElementsByName("myId")[0];
	input.value = elem.id;
	myform.submit();
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

	var capt = myName;
	
	if (myAddress)
		capt += ", " + myAddress;
	
	if (myKulam)
	{
		captionText.style.height = "75px";
		capt += "<br>" + myKulam + "<br>";
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

function displayDetail()
{
	var form = document.getElementById("myFooterForm");
	form.submit();
}