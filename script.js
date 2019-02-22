var svgString = new XMLSerializer().serializeToString(document.querySelector('svg'));
  
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var DOMURL = self.URL || self.webkitURL || self;
    console.log(DOMURL)
  var img = new Image();
  console.log('IMG: ', img)
  var svgBlob = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
  console.log('SVG-Blob: ', svgBlob)
  var url = DOMURL.createObjectURL(svgBlob);
  console.log('URL: ', url)
  var png;
  img.onload = function() {
      ctx.drawImage(img, 0, 0);
      png = canvas.toDataURL("image/png");
      console.log('PNG :', png)
      document.querySelector('#png-container').innerHTML = '<img src="'+png+'"/>';
      DOMURL.revokeObjectURL(png);
     
  };  
  img.src = url;
  console.log("png", png);

  function download(filename) {
    var a = document.createElement("a");
      document.body.appendChild(a);
      a.setAttribute("class", "svg-crowbar");
      a.setAttribute("download", filename + timeStamp + ".png");
      a.setAttribute("href", canvas.toDataURL("image/png"));
      a.style["display"] = "none";
      a.click();
  }


var popup = document.getElementById("popup");
var overlay = document.getElementById("overlay");
var closePopup = document.getElementById("close-popup");
var errorMessage = document.getElementById("error-message");


function showPopup() {
	overlay.style.visibility = "visible";
	popup.style.visibility = "visible";
}

function hidePop() {
	overlay.style.visibility = "hidden";
	popup.style.visibility = "hidden";
	closePopup.visibility = "hidden";
	filenameInput.value = '';
	hideErrorMessage();
}

var filenameInput = document.getElementById("name");
var filenameValue = "";


function getPngName() {
  if(!filenameInput.value) {
    showErrorMessage()
  } else {
    fileNameValue = filenameInput.value;
	  download(fileNameValue);
  }
}

function showErrorMessage() {
	errorMessage.style.visibility = "visible";
}

function hideErrorMessage() {
	errorMessage.style.visibility = "hidden";
}

///DATE
function formatDate(date) {
	var d = new Date(date),
		year = '' + d.getFullYear(),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		hours = '' + (d.getHours()),
		minutes = '' + (d.getMinutes());

	if (month.length < 2) { month = '0' + month; }
	if (day.length < 2) { day = '0' + day; }
	if (hours.length < 2) { hours = '0' + hours; }
	if (minutes.length < 2) { minutes = '0' + minutes; }

	var dateStamp = [year, month, day].join('');
	var hourStamp = [hours, minutes].join('');

	result = [dateStamp, hourStamp].join('_');
	return result;
}

var timeStamp = "_" + formatDate(new Date);