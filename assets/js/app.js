
//https://api.nasa.gov/api.html#EPIC
//tomar fecha para actualizar imagen cada día
toDayImage();
function toDayImage() {
  let d = new Date();
  let arrMonth = ['01','02','03','04','05','06','07','08','09','10','11','12',];
  let toDay = d.getDate();
  let toMonth = d.getMonth();
  let toYear = d.getFullYear();
  // let patt = ^[0-9]+$;
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
      const media = result.media_type;
      if (media === 'video') {
        console.log(result);
        $('#container').html(`
          <iframe width="100%" height="600px"
          src="${imgs}&autoplay=1">
          </iframe>`     
        );
        $('#descrip').html(`
          <div class="title">
          <h2>${title}</h2>
          </div>`     
        );
        $('#descrip').append(`<p class="exp">${explanation}</p>`);
      }
      if (media === 'image') {
        console.log(result);
        $('#container').html(`
          <div class="fondo">
          <img src="${imgs}" alt="">
          </div>`
        );
        $('#descrip').html(`
          <div class="title">
          <h2>${title}</h2>
          </div>`     
        );
        $('#descrip').append(`<p class="exp">${explanation}</p>`);
      }      
    }
  });
}

//filtro para buscar imagen por fecha
$('#btnSearch').click(function() {
  const day = $('#day').val();
  const month = $('#month').val();
  const year = $('#year').val();
  if (day.length > 2) {
    alert('Pon un día de dos dígitos numéricos')
  }
  let url = `https://api.nasa.gov/planetary/apod?date=${year}-${month}-${day}&api_key=Tqbm56QokO6KA0u6wjbcnSVeiYwlsq9dNK46y7fE`;
  $.ajax({
    url: url,
    success: function (result){
      const imgs = result.url;
      const title = result.title;
      const explanation = result.explanation;
      const media = result.media_type;
      if (media === 'video') {
        console.log(result);
        $('#container').html(`
          <iframe width="100%" height="600px"
          src="${imgs}&autoplay=1">
          </iframe>`     
        );
        $('#descrip').html(`
          <div class="title">
          <h2>${title}</h2>
          </div>`     
        );
      }
      if (media === 'image') {
        console.log(result);
        $('#container').html(`
          <div class="fondo">
          <img src="${imgs}" alt="">
          </div>`
        );
        $('#descrip').html(`
          <div class="title">
          <h2>${title}</h2>
          </div>`     
        );
      }
      $('#descrip').append(`<p class="exp">${explanation}</p>`);
      $('#content').html(`<div id="descrip2"><i class="fa fa-arrow-down"></i> Ocultar descripción</div>`);
    } 
  });
});

$('#slide').click(function() {
  if($('#content').attr('value') === 'hide') {
    $('#content').html('<i class="fa fa-arrow-up"></i> Mostrar descripción');
    $('#intro').css({'top':'85vh', 'background':'white', 'height':'10vh'});
    $('#descrip p').fadeOut(500);
    $('#content').attr('value','show');
  }
  else if($('#content').attr('value') === 'show'){
    $('#content').html(`<i class="fa fa-arrow-down"></i> Ocultar descripción`);
    $('#intro').css({'top':'40vh', 'height':'60vh', 'background':'linear-gradient(to bottom, rgba(255,255,255,.6), #fff)'});
    $('#content').attr('value','hide');
    $('#descrip p').fadeIn(500);
  }
})