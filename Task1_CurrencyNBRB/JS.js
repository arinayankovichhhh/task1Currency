
// Constants
const requestURL = 'https://www.nbrb.by/api/exrates/currencies/'
const xhr = new XMLHttpRequest()

// Variables
var currencyObjectList = new Map()
var startButton = document.getElementById('start')
var currencyLabel = document.getElementById('result')

//Loader HTTP
xhr.open('GET', requestURL)
xhr.responseType = 'json'

xhr.onload = () => {
  if (xhr.status >= 400) {
    console.error(xhr.response)
  } else {

    var resultCur = getCur(xhr.response, "Cur_ID")
    var resultCurAbbr = getAbr(xhr.response, "Cur_Abbreviation")
    var links = getCourse(resultCur)
    let select = document.getElementById("selectCurrency")
    let a = Object.assign(...resultCurAbbr.map((n, i) => ({ [n]: links[i] })))

    // Creating object with Cur_Abbreviation and link to each currency 
    Object.entries(a).map(([key, value]) => {
      currencyObjectList.set(key, value)
    })

    resultCurAbbr.forEach((currency) => {
      let element = document.createElement("option");
      element.textContent = currency;
      element.value = currency;
      select.appendChild(element)
    })

    // Send button method
    startButton.addEventListener("click", buttonPresed)

    function buttonPresed() {
      getVaiute(currencyObjectList, select.value)
    }
  }
}

//Methods: 

// Function for getting needeed Cours of money 
function getVaiute(array, cur) {
  var output0;
  var keyCur = cur
  var urlCur = array.get(keyCur)
  xhr.open('GET', urlCur)
  console.log(urlCur)
  xhr.responseType = 'json'
  xhr.onload = () => {
    output0 = (xhr.response)
    let a = (output0['Cur_OfficialRate'])
    let b = (output0['Cur_Name'])
    var html = `<b> ${b} : </b>` + a
    console.log(html)
    currencyLabel.innerHTML = html;
  }
  xhr.send()
  return output0
}

// Function for getting valute Cud_ID
function getCur(input, field) {
  var output1 = []
  for (var i = 0; i < input.length; ++i)
    output1.push(input[i][field]);
  return output1
}

// Function for getting valute Abbriviature
function getAbr(input, field) {
  var output2 = []
  for (var i = 0; i < input.length; ++i)
    output2.push(input[i][field]);
  return output2
}

// Function for getting links for all valutes 
function getCourse(Cur) {
  var output3 = []
  for (var i = 0; i < Cur.length; i++) {
    output3.push(`https://www.nbrb.by/api/exrates/rates/${Cur[i]}`)
  }
  return output3
}

xhr.send()


