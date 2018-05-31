
document.getElementById('myForm').addEventListener('submit',saveBookmark);

function saveBookmark(e){

  var siteName= document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

if(!validateForm(siteName,siteUrl)){
  return;
}

  var bookMark={
    name:siteName,
    url:siteUrl
  }

  /*localStorage.setItem('test', 'Hello World');
  console.log(localStorage.getItem('test'));
  localStorage.removeItem('test');
  console.log(localStorage.getItem('test'));*/
  if(!JSON.parse(localStorage.getItem('bookMarks'))){
    var bookMarks=[];
    bookMarks.push(bookMark);
    localStorage.setItem('bookMarks',JSON.stringify(bookMarks));
  }
  else{

    var bookMarksArray = JSON.parse(localStorage.getItem('bookMarks'));
    bookMarksArray.push(bookMark);
    localStorage.setItem('bookMarks',JSON.stringify(bookMarksArray));
  }

  console.log(localStorage);


  fetchBookMarks();

  document.getElementById('myForm').reset()

  e.preventDefault();

}

function fetchBookMarks(){
  var bookMarksArray = JSON.parse(localStorage.getItem('bookMarks'));

  document.getElementById('bookmarkResults').innerHTML =`<div class="card" style="width: 18rem;">
  <ul class="list-group list-group-flush">`;

  bookMarksArray.forEach((obj)=>{
    document.getElementById('bookmarkResults').innerHTML +=`
    <li class="list-group-item">
    <h3> ${obj.name}
    <a  class="card-link" target="_blank" href="${obj.url}">Visit</a>
    <a class="btn btn-danger" onclick="deleteBookMark('${obj.url}')" href="#">Delete</a>
    </h3></li>`
  });

  document.getElementById('bookmarkResults').innerHTML +=`</ul></div>`

}

function deleteBookMark(url){
  var bookMarksArray = JSON.parse(localStorage.getItem('bookMarks'));
  bookMarksArray.forEach((obj,index)=>{
    if(obj.url==url){
      bookMarksArray.splice(index,1);
    }

  });
  localStorage.setItem('bookMarks',JSON.stringify(bookMarksArray));
  fetchBookMarks();
}

function validateForm(siteName,siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
  
if(!siteUrl.match(regex)){
  alert('Please insert valid URL');
  return false;
}
return true;
}
