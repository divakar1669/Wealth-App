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
      data: [investment, returns-investment],
      backgroundColor: ['#3366cc', '#ff6384']
    }]
    
    };
    
    var ctx = document.getElementById('chartContainer').getContext('2d');
    
    if (window.myChart) {
    window.myChart.data = chartData;
    window.myChart.update();
    } else {
    window.myChart = new Chart(ctx, {
     type: 'doughnut', // Use doughnut type for a ring chart
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
        
       var  yearlyInvestment = 0;
       var maturityAmount = 0;
        if(year == 1)
        {
            yearlyInvestment = initialInvestmentAmount;
            maturityAmount = yearlyInvestment * Math.pow(1 + (expectedReturn/100), year  )
            maturityAmounts.push(maturityAmount.toFixed(2));
        }
        else
        {
            // yearlyInvestment = maturityAmounts[year-1];
            maturityAmount = initialInvestmentAmount * Math.pow(1 + (expectedReturn/100), year  )
            maturityAmounts.push(maturityAmount.toFixed(2));
        }

        var yearWiseResult = {
            year: year,
            investment: yearlyInvestment.toFixed(2),
            maturity: maturityAmount.toFixed(2)
        }; 
        yearWiseResults.push(yearWiseResult);
    
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
    document.getElementById('Principal').textContent = parseInt(initialInvestmentAmount) ;
    document.getElementById('Intrest').textContent = parseInt(returns) -  parseInt(initialInvestmentAmount);
    updateChart(initialInvestmentAmount, returns);
    constructJson(maturityAmounts,yearWiseResults)
    
    }
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
    JsonFileToPrint =jsonString;
    
    }
    
    
    
    updateValue('investmentAmount');
    updateValue('duration');
    updateValue('expectedReturn');
    updateValue('increasePercentage');

    function printAsPDF()
    {
    const encodedData = encodeURIComponent(JsonFileToPrint); 
    const url = `http://localhost:3000/generate-pdf/endpoint?data=${encodedData}`;
    window.open(url, '_blank');
    }
    