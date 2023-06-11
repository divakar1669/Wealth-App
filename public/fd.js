
var JsonFileToPrint = null;
function updateValue(inputId) {
    let result = inputId.includes("Range");

    if (result === true) {
      var RangeElement = document.getElementById(inputId);
      var slideElement = document.getElementById(inputId.replace("Range", ""));
      var valueElement = document.getElementById(inputId + 'Value');
      //valueElement.textContent = inputElement.value;
      slideElement.value = RangeElement.value;
    }
    else {
      var inputElement = document.getElementById(inputId);
      var RangeElement = document.getElementById(inputId + 'Range');
      var valueElement = document.getElementById(inputId + 'Value');
      //valueElement.textContent = inputElement.value;
      RangeElement.value = inputElement.value;
    }
    calculate();

  }



  function calculate() {
    var principal = parseFloat(document.getElementById('principal').value);
    var interest = parseFloat(document.getElementById('interest').value);
    var tenure = parseFloat(document.getElementById('tenure').value);
    var compounding = 1;//parseFloat(document.getElementById('compounding').value);
    var inflation = parseFloat(document.getElementById('inflationPercentage').value);
    interest = interest - inflation;
    var maturityAmount = principal * Math.pow(1 + interest / (100 * compounding), compounding * tenure);
    var interestEarned = maturityAmount - principal;

    var table = "<table>";
    table += "<tr><th> Year </th><th> Maturity Amount </th><th> Interest Earned  </th></tr>";

    var dataPoints = [];

    for (var year = 1; year <= tenure; year++) {
      var maturityYear = principal * Math.pow(1 + interest / (100 * compounding), compounding * year);
      var interestYear = maturityYear - principal;
      table += "<tr><td>" + year + "</td><td>" + maturityYear.toFixed(2) + "</td><td>" + interestYear.toFixed(2) + "</td></tr>";
      dataPoints.push({ x: year, y: maturityYear });
    }

    table += "</table>";
    document.getElementById('result').innerHTML = table;
    updateChart(dataPoints);
    constructJson(dataPoints,principal,interest,tenure);
    
  }


  function constructJson(dataPoints,principal,interest,tenure)
  {
      var jsonObject = 
      { 
          "pricipalAmount" : principal,
          "interest":interest,
          "tenure":tenure,
          "dataPoints": dataPoints
      };
  
  const jsonString = JSON.stringify(jsonObject);
  console.log(jsonString);
  JsonFileToPrint =jsonString;
  
  }

  function printAsPDF()
    {
    const encodedData = encodeURIComponent(JsonFileToPrint); 
    const url = `http://localhost:3000/generate-pdf/endpoint?data=${encodedData}`;
    window.open(url, '_blank');
    }

  function updateChart(dataPoints) {
    var chart = Chart.getChart("chart");

    if (chart) {
      chart.data.datasets[0].data = dataPoints;
      chart.update();
    } else {
      chart = new Chart(document.getElementById('chart'), {
        type: 'line',
        data: {
          datasets: [{
            label: 'Maturity Amount',
            data: dataPoints,
            borderColor: 'rgb(75, 192, 192)',
            fill: false
          }]
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom'
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  updateValue('principal');
  updateValue('interest');
  updateValue('tenure');
  updateValue('inflationPercentage');