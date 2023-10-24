
var json_data, newString, newString2, newString3, newString4, headers2;
var json_data_array = [], result = [], headers = [];

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
    headers.push(json_data_array[i].split(':', 1));

  }
  let text = headers.toString()
  headers2 = text.split(',');
  console.log(headers2[2]);
}
function getHeaders(headers2) {
  return headers2.filter((item, index) => headers2.indexOf(item) === index);
}

function displayData() {
 // for (let i = 0; i < getHeaders(headers2).length; i++) {
    //document.getElementById("spnHeader" + i).innerHTML = getHeaders(headers2)[i];
 // }
 const wrapper = document.createElement("div");
 wrapper.setAttribute('class','wrapper')
  for (let i = 0; i < getHeaders(headers2).length; i++) {
    const div = document.createElement("div");
    div.setAttribute('class','box')
    wrapper.appendChild(div);
    const span = document.createElement("span");
    
    span.setAttribute("id","spnHeader" + i);

    document.getElementById("spnHeader0") = "p";
    document.getElementById("spnHeader0").innerHTML = getHeaders(headers2)[i];
    
    div.appendChild(span);
    
    //document.getElementsByClassName("box").appendChild(span);
    

  }
}
