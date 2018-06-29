document.addEventListener('focusin', function(e) {
  var elementName = e.srcElement.name;
  if(elementName == 'locationTitle'){
    var elementNodeList = document.getElementsByName(elementName);
    var element = elementNodeList.item(0);
    element.classList.add('textfield-focused');
  }
})
document.addEventListener('focusout', function(e) {
  var elementName = e.srcElement.name;
  if(elementName == 'locationTitle'){
    var elementNodeList = document.getElementsByName(elementName);
    var element = elementNodeList.item(0);
    element.classList.remove('textfield-focused');
  }
})
document.getElementById("upload-file-all").addEventListener('change', setBackroundImage, true);
// Drop Down Menu
function dropDownControl(){
  document.getElementById("gallery-dropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// File upload
function fileUploadAll(){
  const fileInput = document.querySelector('#upload-file-all');
  fileInput.click();
}
function fileUploadImage(){
  const fileInput = document.querySelector('#upload-file-image');
  fileInput.click();
}
function fileUploadAudio(){
  const fileInput = document.querySelector('#upload-file-audio');
  fileInput.click();
}
function fileUploadVideo(){
  const fileInput = document.querySelector('#upload-file-video');
  fileInput.click();
}
function setBackroundImage(){
  console.log("Image is being set.");
  var file = document.querySelector('#upload-file-all').files[0];
  var reader = new FileReader();
  reader.onloadend = function(e){
    document.getElementById('gallery').style.backgroundImage = "url(" + reader.result + ")";
    if(file){
      reader.readAsDataUrl(file);
    }else{
      console.log(e);
    }
  }
}
function locationTitleFocused(){
  const locationTitle = document.activeElement;
  console.log(locationTitle);
}

function populateTable(nColumns, data){
  let arrayCopy = data.slice(0) // create copy of the data to modify for table.
  let myTable = "<table>"

  // Populate body
 while (arrayCopy.length > 0) {
   myTable += "<tr>";
   for (let i = 0; i < nColumns; i++) {
     if (arrayCopy.length == 0) {
       myTable += "<td>" + "" + "</td>";
     } else {
       myTable += "<td>" + arrayCopy.shift() + "</td>";
     }
   }
   myTable += "</tr>";
 }

 myTable += "</table>";
 return myTable;
}
}
