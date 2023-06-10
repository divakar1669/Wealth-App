document.getElementById('generateBtn').addEventListener('click', () => {
    const value1 = document.getElementById('value1').value;
    const value2 = document.getElementById('value2').value;
  
    const url = `http://localhost:3000/generate-pdf?value1=${encodeURIComponent(value1)}&value2=${encodeURIComponent(value2)}`;
    window.open(url, '_blank');
  });


  const home =  document.getElementById('home');
  const car =  document.getElementById('car');
  const education =  document.getElementById('education');
  const vacation =  document.getElementById('vacation');
  const retire =  document.getElementById('retire');
  const others =  document.getElementById('others');

  
  function getResourceName(num)
  {
    switch(num)
    {
      case 1:
        return "home";
      case 2:
        return "car";
      case 3:
        return "education";
      case 4:
        return "vacation";
      case 5:
        return "retire";
      case 6:
        return "others";
      default:
        return "-1";
      
    }
  }
  function goToCalculatePage(num)
  {
    var el = getResourceName(num);
    window.location.href ="./calculate.html"
    
  }




  
  








  