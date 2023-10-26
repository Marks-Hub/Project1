
var json_data, newString, newString2, newString3, newString4, headers2, CVSdata2, styleNum = "", wrapperInfo;
var json_data_array = [], result = [], CVSheaders = [], CVSdata = [], dataWithoutHeaders = [];
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
}

function getHeaders(headers2) {//this function filters the headers2 variable so that there are no repeating values in the array.
  return headers2.filter((item, index) => headers2.indexOf(item) === index);
}


function displayData() {
  
  // for (let i = 0; i < getHeaders(headers2).length; i++) {
  //document.getElementById("spnHeader" + i).innerHTML = getHeaders(headers2)[i];
  // }
  //const wrapper = document.createElement("div");
  //wrapper.setAttribute('class','wrapper');
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
    //span.innerHTML = getHeaders(headers2)[i];
    //let test = document.getElementById("spnHeader" + i).innerHTML;
    //console.log(test); 
    div.appendChild(span);
    //document.getElementById("Text").value = para;
    //document.getElementsByClassName("box").appendChild(span);

  }

  for (let i = 0; i < getHeaders(headers2).length; i++) {
    document.getElementById("spnHeader" + i).innerHTML = getHeaders(headers2)[i];
  }
  document.getElementById("Text").innerHTML = " "

  for (let i = 0; i < dataWithoutHeaders.length; i++) {
    const div = document.createElement("div");
    div.setAttribute('class', 'box');
    document.getElementById("wrap").appendChild(div);
    const span = document.createElement("span");

    span.setAttribute("id", "spnData" + i);
    div.appendChild(span);

    document.getElementById("spnData" + i).innerHTML = dataWithoutHeaders[i];
  }

}

function sortAscending(){
  //data.sort();
}

function SortDescending(){
  //data.sort();
  //data.reverse();
}
