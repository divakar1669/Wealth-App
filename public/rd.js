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

  function updateChart(monthlyAmount, tenure, interestEarned) {
  var x = parseInt(monthlyAmount) * parseInt(tenure);
  var y = parseInt(interestEarned);

  var canvas = document.getElementById('chart');
  var existingChart = Chart.getChart(canvas); // Check if there is an existing chart

  if (existingChart) {
    existingChart.destroy(); // Destroy the existing chart if it exists
  }

  var chart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['Total Deposits', 'Interest Earned'],
      datasets: [{
        label: 'Interest Distribution',
        data: [x, y],
        backgroundColor: ['#36a2eb', '#ff6384']
      }]
    }
  });

  chart.data.datasets[0].data = [x, y];
  chart.update();
}


    function calculate() {
      var monthlyAmount = parseFloat(document.getElementById('monthlyAmount').value);
      var interest = parseFloat(document.getElementById('interest').value);
      var tenure = parseFloat(document.getElementById('tenure').value);
      var inflation = parseFloat(document.getElementById('inflationPercentage').value);
      interest = interest - inflation;
      
      var maturityAmount = monthlyAmount * tenure + (monthlyAmount * tenure * (tenure + 1) * interest) / (2 * 12 * 100);
      var interestEarned = maturityAmount - (monthlyAmount * tenure);
      document.getElementById('Maturity').textContent =  maturityAmount.toFixed(2);
      document.getElementById('Intrest').textContent = interestEarned.toFixed(2);
      updateChart(monthlyAmount,tenure,interestEarned)
      constructJson(monthlyAmount,interestEarned,tenure)

    }

  updateValue('monthlyAmount');
  updateValue('interest');
  updateValue('tenure');
  updateValue('inflationPercentage');


  function constructJson(principal,interest,tenure)
  {
      var jsonObject = 
      { 
          "type":"RD",
          "pricipalAmount" : principal,
          "interestEarned":interest,
          "tenure":tenure,
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



