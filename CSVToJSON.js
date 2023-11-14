let json_data, newString, newString2, newString3, newString4, newString5, headers2, CVSdata2, styleNum = "", wrapperInfo, best, sortedAscending, sortedDescending, worst, numDivided, red = 255, id, green = 255, num = 0;
let json_data_array = [], result = [], CVSheaders = [], CVSdata = [], dataWithoutHeaders = [], headersForSort = [], arrayAscend = [], arrayDescend = [];
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
  newString3 = newString2.replace("]", "");
  newString4 = newString3.replace(/}/g, "");
  newString5 = newString4.replace("[", "");
  json_data_array = newString5.split(',');

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
    div.setAttribute("id", "div" + i)
    div.setAttribute('class', 'box');
    document.getElementById("wrap").appendChild(div);
    const span = document.createElement("span");

    span.setAttribute("id", "spnData" + i);
    div.appendChild(span);

    document.getElementById("spnData" + i).innerHTML = dataWithoutHeaders[i];
  }
  //Ascending code
  var selectList = document.getElementById("sortAscending");
  selectList.setAttribute("id", "mySelect");
  //Create and append the options
  for (var i = 0; i < headersForSort.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", headersForSort[i]);
    option.text = headersForSort[i];
    selectList.appendChild(option);
  }
  ///////////////////////////////////////////////////////
  //Descending code
  var selectList2 = document.getElementById("sortDescending");
  selectList2.setAttribute("id", "mySelect2");
  //Create and append the options
  for (var i = 0; i < headersForSort.length; i++) {
    var option2 = document.createElement("option");
    option2.setAttribute("value", headersForSort[i]);
    option2.text = headersForSort[i];
    selectList2.appendChild(option2);
  }
  ///////////////////////////////////////////////////////////////
  //color code
  var selectList3 = document.getElementById("color");
  selectList3.setAttribute("id", "mySelect3");
  //Create and append the options
  for (var i = 0; i < headersForSort.length; i++) {
    var option3 = document.createElement("option");
    option3.setAttribute("value", headersForSort[i]);
    option3.text = headersForSort[i];
    selectList3.appendChild(option3);
  }
  ////////////////////////////////////////////////////////////
  //color Scale code
  var selectList4 = document.getElementById("colorScale");
  selectList4.setAttribute("id", "mySelect4");
  //Create and append the options
  for (var i = 0; i < headersForSort.length; i++) {
    var option4 = document.createElement("option");
    option4.setAttribute("value", headersForSort[i]);
    option4.text = headersForSort[i];
    selectList4.appendChild(option4);
  }
  ////////////////////////////////////////////////////////////
  //color Scale code
  var selectList5 = document.getElementById("color10");
  selectList5.setAttribute("id", "mySelect5");
  //Create and append the options
  for (var i = 0; i < headersForSort.length; i++) {
    var option5 = document.createElement("option");
    option5.setAttribute("value", headersForSort[i]);
    option5.text = headersForSort[i];
    selectList5.appendChild(option5);
  }
}
function sort(id) {
  let FirstIdVal = $('#' + id + ' option:nth-child(1)').val();
  if (document.getElementById(id).value == FirstIdVal) {
    alert("Not a valid option");
  }
  else {
    for (let i = 0; i < headersForSort.length; i++) {
      let x = i;
      if (document.getElementById(id).value == headersForSort[i]) {
        for (let k = 0; k < (dataWithoutHeaders.length / headersForSort.length); k++) {
          arrayAscend.push(parseFloat(dataWithoutHeaders[x]));
          x += headersForSort.length;
        }
      }
    }
    sortedAscending = arrayAscend.sort();
    arrayAscend = [];
  }
  return sortedAscending;
}
function sortAscending() {
  id = "mySelect";
  sort(id);
  console.log(sortedAscending);
}

function SortDescending() {
  id = "mySelect2";
  sort(id);
  console.log(sortedAscending.reverse());
}

function color() {
  id = "mySelect3";
  sort(id);
  //using x to find which div and span has largest and smallest
  for (let i = 0; i < headersForSort.length; i++) {
    let x = i;
    if (document.getElementById("mySelect3").value == headersForSort[i]) {
      for (let k = 0; k < (dataWithoutHeaders.length / headersForSort.length); k++) {
        if (dataWithoutHeaders[x] == sortedAscending[sortedAscending.length - 1]) {
          //color largest green
          document.getElementById("div" + x).style.backgroundColor = "green";
          document.getElementById("spnData" + x).style.backgroundColor = "green";
        }
        if (dataWithoutHeaders[x] == sortedAscending[0]) {
          //color lowest red
          document.getElementById("div" + x).style.backgroundColor = "red";
          document.getElementById("spnData" + x).style.backgroundColor = "red";
        }
        x += headersForSort.length;
      }
    }
  }
}

function colorPercent() {
  var colorSort = [];
  let redscale = 0;
  let greenscale = 0;
  //repeated sort from the ascend and descend
  if (document.getElementById("mySelect4").value == "Color Scale") {
    alert("Not a valid option");
  }
  else {
    for (let i = 0; i < headersForSort.length; i++) {
      let x = i;
      if (document.getElementById("mySelect4").value == headersForSort[i]) {
        for (let k = 0; k < (dataWithoutHeaders.length / headersForSort.length); k++) {
          colorSort.push(parseFloat(dataWithoutHeaders[x]));
          x += headersForSort.length;
        }
      }
    }
    colorSort = colorSort.sort();
    let numDivided2 = colorSort.length / 2;
    numDivided = Math.ceil(numDivided2);
    redscale = red / numDivided;
    greenscale = green / numDivided;
  }
  //using x to find which div and span has largest and smallest
  for (let i = 0; i < headersForSort.length; i++) {
    let x = i;
    if (document.getElementById("mySelect4").value == headersForSort[i]) {
      for (let k = 0; k < (dataWithoutHeaders.length / headersForSort.length); k++) {
        for (let j = 0; j < colorSort.length; j++) {
          if (dataWithoutHeaders[x] == colorSort[j] && j > numDivided) {
            //color largest green
            document.getElementById("div" + x).style.backgroundColor = "rgb(0, " + green + ", 0)";
            document.getElementById("spnData" + x).style.backgroundColor = "rgb(0, " + green + ", 0)";
            green = green - greenscale + 12;
          }
        }
        for (let j = 0; j < colorSort.length; j++) {
          if (dataWithoutHeaders[x] == colorSort[j] && j <= numDivided) {
            //color lowest red
            document.getElementById("div" + x).style.backgroundColor = "rgb(" + red + ", 0, 0)";
            document.getElementById("spnData" + x).style.backgroundColor = "rgb(" + red + ", 0, 0)";
            red = red - redscale + 12;
          }
        }
        x += headersForSort.length;
      }
    }
  }
}

function color10() {
  id = "mySelect5";
  sort(id);
  num = (sortedAscending.length / 10);
  num = Math.round(num);
  console.log(num);
  console.log(Math.round(-5.5));
  let aray = [];
  let reverseAray = [];
  for (let m = 0; m < sortedAscending.length; m++) {
    if (m < num) {
      aray.push(sortedAscending[m]);
      reverseAray.push(sortedAscending[sortedAscending.length - m - 1]);
    }
  }
  console.log(reverseAray);
  //using x to find which div and span has largest and smallest
  for (let i = 0; i < headersForSort.length; i++) {
    let x = i;
    let p = 0;
    let a = 0;
    if (document.getElementById("mySelect5").value == headersForSort[i]) {
      for (let k = 0; k < (sortedAscending.length); k++) {
        for (let n = 0; n < aray.length; n++) {
          if (dataWithoutHeaders[x] == aray[p] && p < num) {
            //color lowest red
            if (document.getElementById("div" + x).style.backgroundColor != "red") {
              document.getElementById("div" + x).style.backgroundColor = "red";
              document.getElementById("spnData" + x).style.backgroundColor = "red";
              p++;
              x = i;
              k = 0;
            }
          }
        }
        for (let n = 0; n < reverseAray.length; n++) {
          if (dataWithoutHeaders[x] == reverseAray[a] && a < num) {
            if (document.getElementById("div" + x).style.backgroundColor != "green") {
              //color largest green
              document.getElementById("div" + x).style.backgroundColor = "green";
              document.getElementById("spnData" + x).style.backgroundColor = "green";
              a++;
              x = i;
              k = 0;
            }
          }
        }
        x += headersForSort.length;

      }
    }
  }
}
