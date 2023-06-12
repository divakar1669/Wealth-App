var JsonFileToPrint = null;

function updateValue(inputId) {
let result = inputId.includes("Range");

  if(result === true)
  {
    var RangeElement = document.getElementById(inputId);
    var slideElement = document.getElementById(inputId.replace("Range", ""));
    var valueElement = document.getElementById(inputId + 'Value');
    //valueElement.textContent = inputElement.value;
    slideElement.value = RangeElement.value;
  }
  else
  {
    var inputElement = document.getElementById(inputId);
    var RangeElement = document.getElementById(inputId+'Range');
    var valueElement = document.getElementById(inputId + 'Value');
    //valueElement.textContent = inputElement.value;
    RangeElement.value = inputElement.value;
  }
  calculate();

}



function updateChart(investment, returns) {
var chartData = {
labels: ['Principal Amount', 'Returns'],
datasets: [{
  data: [investment, returns],
  backgroundColor: ['#3366cc', '#ff6384']
}]

};

var ctx = document.getElementById('chartContainer').getContext('2d');

if (window.myChart) {
window.myChart.data = chartData;
window.myChart.update();
} else {
window.myChart = new Chart(ctx, {
 type: 'doughnut',
  data: chartData,
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});
}
}

function calculate() {
var totalInvestment = 0;
var initialInvestmentAmount = parseFloat(document.getElementById("investmentAmount").value);
var duration = parseInt(document.getElementById("duration").value);
var expectedReturn = parseFloat(document.getElementById("expectedReturn").value);
var increasePercentage = parseFloat(document.getElementById("increasePercentage").value);
var inflation = parseInt(document.getElementById("inflationPercentage").value);
expectedReturn = expectedReturn - inflation;
var maturityAmounts = [];
var yearWiseResults = [];
for (var year = 1; year <= duration / 12; year++) {
var investmentAmount = ( initialInvestmentAmount * Math.pow((1 + increasePercentage / 100), year - 1) );
var yearlyInvestment = investmentAmount * 12;
totalInvestment += yearlyInvestment;

var maturityAmount = 0;

  for (var month = 1; month <=12; month++) {
    var monthlyAmount = investmentAmount // + (investmentAmount * (parseFloat(expectedReturn/12)  / 100));
    var monthReturn = monthlyAmount *  (parseFloat(expectedReturn/12)  / 100);
    var CurrentMonthMaturity = monthlyAmount + monthReturn;
    maturityAmount += monthlyAmount + monthReturn;
    investmentAmount = CurrentMonthMaturity;
  }

if (year > 1) {
  var previousYearMaturity = maturityAmounts[year - 2];
  maturityAmount += parseFloat(previousYearMaturity);
}

maturityAmounts.push(maturityAmount.toFixed(2));

var yearWiseResult = {
  year: year,
  investment: yearlyInvestment.toFixed(2),
  maturity: maturityAmount.toFixed(2)
};

yearWiseResults.push(yearWiseResult);
}

var resultElement = document.getElementById("result");
resultElement.innerHTML = "";

var table = document.createElement("table");
var tableHeader = table.createTHead();
var headerRow = tableHeader.insertRow();
headerRow.insertCell().appendChild(document.createTextNode("Year"));
headerRow.insertCell().appendChild(document.createTextNode("Yearly Investment"));
headerRow.insertCell().appendChild(document.createTextNode("Maturity Amount"));

for (var i = 0; i < yearWiseResults.length; i++) {
var yearWiseResult = yearWiseResults[i];

var row = table.insertRow();
row.insertCell().appendChild(document.createTextNode(yearWiseResult.year));
row.insertCell().appendChild(document.createTextNode(yearWiseResult.investment));
row.insertCell().appendChild(document.createTextNode(yearWiseResult.maturity));
}

resultElement.appendChild(table);

var latestYearInvestment = parseFloat(yearWiseResults[yearWiseResults.length - 1].investment);
var latestYearMaturity = parseFloat(yearWiseResults[yearWiseResults.length - 1].maturity);
var returns = latestYearMaturity - totalInvestment;
document.getElementById('Maturity').textContent = parseInt(totalInvestment)+parseInt(returns) ; 
document.getElementById('Principal').textContent = parseInt(totalInvestment) ;
document.getElementById('Intrest').textContent = parseInt(returns) ;
updateChart(totalInvestment, returns);
constructJson(maturityAmounts,yearWiseResults)

}


function constructJson(maturityAmounts,yearWiseResults)
{
    var  year  =[]
    for(let i in maturityAmounts)
    {    year[i] = i;    }
    var jsonObject = 
    {
        "yearWiseResults": yearWiseResults
    };

const jsonString = JSON.stringify(jsonObject);
console.log(jsonString);
JsonFileToPrint = jsonString;

}


function printAsPDF()
{
const encodedData = encodeURIComponent(JsonFileToPrint); 
const url = `http://localhost:9000/generate-pdf/endpoint?data=${encodedData}`;
window.open(url, '_blank');
}



// Initialize the input values on page load
updateValue('investmentAmount');
updateValue('duration');
updateValue('expectedReturn');
updateValue('increasePercentage');
