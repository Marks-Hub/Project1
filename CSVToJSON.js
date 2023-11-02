
var json_data, newString, newString2, newString3, newString4, headers2, CVSdata2, styleNum = "", wrapperInfo;
var json_data_array = [], result = [], CVSheaders = [], CVSdata = [], dataWithoutHeaders = [], headersForSort = [];
function csvJSON() {
  const testForm = document.getElementById("testForm");
  const csvDataFile = document.getElementById("UploadFile");

  testForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = csvDataFile.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      const csvData = d3.csvParse(text);
      document.getElementById("Text").innerHTML = JSON.stringify(csvData);
      //document.write(JSON.stringify(csvData));
      json_data = document.getElementById("Text").innerHTML;
      document.getElementById("Text").innerHTML = "";

    };
    reader.readAsText(input);


  });
}

function clicky() {
  newString = json_data.replace(/{/g, "");
  newString2 = newString.replace(/"/g, "");
  newString3 = newString2.replace(/]/g, "");
  newString4 = newString3.replace("[", "");
  json_data_array = newString4.split(',');

  for (let i = 0; i < json_data_array.length; i++) {
    CVSheaders.push(json_data_array[i].split(':', 1));

  }
  for (let i = 0; i < json_data_array.length; i++) {
    CVSdata.push(json_data_array[i].split(':'));
  }
  let text2 = CVSdata.toString()
  CVSdata2 = text2.split(',');
  for (let i = 0; i < CVSdata2.length; i++) {
    dataWithoutHeaders.push(CVSdata2[i + 1]); // data is inside datawithoutheaders
    i++;
  }
  console.log(dataWithoutHeaders);
  let text = CVSheaders.toString()
  headers2 = text.split(',');
  console.log(headers2[2]);

  headers2.filter((item, index) => headers2.indexOf(item) === index);
}

function getHeaders(headers2) {//this function filters the headers2 variable so that there are no repeating values in the array.
  return headers2.filter((item, index) => headers2.indexOf(item) === index);
}

function Clear() {
  location.reload();
}
function displayData() {

  document.getElementsByClassName("wrapper").innerHTML = "";
  for (let i = 0; i < getHeaders(headers2).length; i++) {
    styleNum += "120px ";
    wrapperInfo = ".wrapper { grid-template-columns: " + styleNum + "; }";
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = wrapperInfo;
    document.getElementsByTagName('head')[0].appendChild(style);

    const div = document.createElement("div");
    div.setAttribute('class', 'box');
    document.getElementById("wrap").appendChild(div);
    const span = document.createElement("span");

    span.setAttribute("id", "spnHeader" + i);

    div.appendChild(span);


  }

  for (let i = 0; i < getHeaders(headers2).length; i++) {
    document.getElementById("spnHeader" + i).innerHTML = getHeaders(headers2)[i];
    headersForSort.push(getHeaders(headers2)[i]);
  }
  //document.getElementById("Text").innerHTML = " ";

  for (let i = 0; i < dataWithoutHeaders.length; i++) {
    const div = document.createElement("div");
    div.setAttribute('class', 'box');
    document.getElementById("wrap").appendChild(div);
    const span = document.createElement("span");

    span.setAttribute("id", "spnData" + i);
    div.appendChild(span);

    document.getElementById("spnData" + i).innerHTML = dataWithoutHeaders[i];
  }


  var myDiv = document.getElementById("myDiv");

  //Ascending code
  var selectList = document.createElement("select");
  selectList.setAttribute("id", "mySelect");
  myDiv.appendChild(selectList);

  //Create and append the options
  for (var i = 0; i < headersForSort.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", headersForSort[i]);
    option.text = headersForSort[i];
    selectList.appendChild(option);
  }
  ///////////////////////////////////////////////////////
  //Descending code

  var myDiv2 = document.getElementById("myDiv2");

  var selectList2 = document.createElement("select");
  selectList.setAttribute("id", "mySelect");
  myDiv2.appendChild(selectList2);

  //Create and append the options
  for (var i = 0; i < headersForSort.length; i++) {
    var option2 = document.createElement("option");
    option2.setAttribute("value", headersForSort[i]);
    option2.text = headersForSort[i];
    selectList2.appendChild(option2);
  }
}

function sortAscending() {


}

function SortDescending() {
  //data.sort();
  //data.reverse();
}
