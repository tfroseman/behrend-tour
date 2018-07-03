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
     element.classList.remove('textfield-focused');
  }
})

// Add listeners to getElements
if(document.addEventListener){
  document.getElementById("upload-file-image").addEventListener('change', function(e){
    uploadImages(e);
  });
}
else{
  document.getElementById("upload-file-image").attachEvent("onchange", function(e){
    uploadImages(e);
  })
}
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

function uploadImages(e){

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

function loadFile(event){
  var output = document.getElementById('preview');
  var editIcon = document.querySelector('#media');
  // output.style.display = "";
  // editIcon.style.display="none";
  output.classList.toggle('hide');
  editIcon.classList.toggle('hide');
  output.src = URL.createObjectURL(event.target.files[0]);
}
