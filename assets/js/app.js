
//https://api.nasa.gov/api.html#EPIC
var url = "https://api.nasa.gov/planetary/apod?date=2018-02-18&api_key=Tqbm56QokO6KA0u6wjbcnSVeiYwlsq9dNK46y7fE";

$.ajax({
  url: url,
  success: function(result){
    const imgs = result.url;
    const title = result.title;
    const explanation = result.explanation;
    console.log(result);
    $('#container').html(`<img src="${imgs}" alt="">`);
  }
});

$('#btnSearch').click(function() {
  const day = $('#day').val();
  const month = $('#month').val();
  const year = $('#year').val();
  let url = `https://api.nasa.gov/planetary/apod?date=${year}-${month}-${day}&api_key=Tqbm56QokO6KA0u6wjbcnSVeiYwlsq9dNK46y7fE`;
  $.ajax({
    url: url,
    success: function(result){
      const imgs = result.url;
      const title = result.title;
      const explanation = result.explanation;
      console.log(result);
      $('#gallery').html(`<img src="${imgs}" alt="">`);
    }
  });
});

