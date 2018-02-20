
//https://api.nasa.gov/api.html#EPIC
//tomar fecha para actualizar imagen cada día
toDayImage();
function toDayImage() {
  let d = new Date();
  let arrMonth = ['01','02','03','04','05','06','07','08','09','10','11','12',];
  let toDay = d.getDate();
  let toMonth = d.getMonth();
  let toYear = d.getFullYear();

  if (toDay < 10) {
    toDay = '0' + toDay;
  };

  let url = `https://api.nasa.gov/planetary/apod?date=${toYear}-${arrMonth[toMonth]}-${toDay}&api_key=Tqbm56QokO6KA0u6wjbcnSVeiYwlsq9dNK46y7fE`;

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
}

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
      $('#gallery').html(`
        <div class="base">
          <div class="fondo">
            <img src="${imgs}" alt="">
          </div>
          <div class="title">
            <h2>${title}</h2>
          </div>
        </div>`
      );
    }
  });
});


// $("p").hide(1000);
//     $("button").click(function(){
//         $("p").show(1000);
//     });
