$(document).ready(() =>{
  $('#second').hide();
});
/*-----------
   FIREBASE
 ------------*/

// funcion para registrar usuarios
function registrar(){
  // console.log('diste un click');
  // lo que se encuentra dentro del input se llama, se toma y se guarda en la variable correspondiente
  var email = document.getElementById('email').value;
  var contrasena = document.getElementById('contrasena').value;

  // se le pasan por parametros el email y la contrasena
  // auth() auntenticacion
   firebase.auth().createUserWithEmailAndPassword(email, contrasena)
  // si el usuario se registra correctamente (con el then), se ejecutara el verificar, para enviar el correo electronico al nuevo 
  // usuario
  .then(function(){
    //funcion mas abajo que mandara un correo de verificacion al usuario
    verificar();
    // toDayImage();
  })

  // promesa catch() para que si no funciona el mail con la contrasena, se ejecutara un catch con la funcion 
  // que se le pasa el parametro error, el cual dicta los dos errores que se guardan en variables
  .catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
  });
}

// funcion para ingresar al sitio web con usuario ya registrado
function ingresar(){

  // lo que se encuentra dentro del input se llama, se toma y se guarda en la variable correspondiente
  var email2 = document.getElementById('email2').value;
  var contrasena2 = document.getElementById('contrasena2').value;

  // llama a firebase con la autenticacion, con sign dice que se va a hacer un ingreso con el mail y la contrasena como parametros
  firebase.auth().signInWithEmailAndPassword(email2, contrasena2)

  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
}

// funcion que siempre verifica la pagina web buscando si esque existe el usuario
function observador(){
  // si existe una autentificacion (auth) de usuario o un cambio de usuario, 
  // osea una persona se registro
  firebase.auth().onAuthStateChanged(function(user) {
    // se ejecuta el if
    // si existe el usuario se ejecutan las variables
    if (user) {
      console.log('Bievenido a la Nasaaa!!');
      // como el usuario existe, aparecera el mensaje que es solo para los usuarios activos
      aparecer(user);
      
      var displayName = user.displayName;
      var email = user.email;

      toDayImage();

      $('#second').show();
      $('#container').show();
      $('#titulo-logo').hide();
      $('.supLog').hide();

      console.log('******************');
      console.log('user.emailVerified');
      console.log('******************')

      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // si al momento de ejecutarse la funcion observador y no encontrar al usuario 
      //registrado, mostrara el mensaje de que no existe.
    } else {
      console.log('Houston, we have a problem!! No existeeesss');
      contenido.innerHTML = ` 
        <div class="col-md-12 text-center"> 
          <h4 class="alert-heading">Sesion no iniciada!</h4>
        </div>
        `;
    }
  });
}

// ejecutando la funcion de observador
observador();

// aparece la info del usuario al logearse
function aparecer(user){
  var user = user;
  //div en donde aparecera el mensaje para el usuario
  var contenido = document.getElementById('contenido');
  // si user tiene el mail verificado
  if(user.emailVerified){
    // mostrara el boton de cerrar sesion
    contenido.innerHTML = ` 
    <div class="col-md-6 text-center">  
      <h4 class="alert-heading">Hola! ` + user.email + ` </h4>
    </div>
    <div class="col-md-6 text-center">
      <button onclick="cerrar()" class='btn btn-danger redButton'>CERRAR SESION</button>
    </div>
    `;


    $('#titulo-logo').hide();
    $('.supLog').hide();
    $('#second').show();
    $('#container').show();
  }
}

function cerrar(){
  // llama a firebase con la autentificacion, llama a cerrar sesion
  firebase.auth().signOut()

  // then para una respuesta positiva
  .then(function(){
    console.log('Cerrando la sesion..');
  })
  // respuesta negativa, de error
  .catch(function(error){
    console.log(error);
  })

  $('#titulo-logo').show();
  $('.supLog').show();
  $('#second').hide();
}

// funcion de verificacion despues de registrarse para mandar correo electronico al 
// nuevo usuario, se enviara cada vez que el usuario se registre
function verificar(){
  // 
  var user = firebase.auth().currentUser;

  // si se envia un mail de verificacion al usuario
  user.sendEmailVerification().then(function() {
    // Email sent.
    console.log('Enviando correo de verificacion al nuevo usuario');
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
}

/* ---------------
  FIN  FIREBASE
 ----------------*/


//https://api.nasa.gov/api.html#EPIC
//tomar fecha para actualizar imagen cada día
// toDayImage();
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
      $('#descrip2').html(`<div id="descrip2"><i class="fa fa-arrow-down"></i> Ocultar descripción</div>`);
    } 
  })
})

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

$('#descrip2').click(function() {
  $('#content').html(`<div id="descrip3"><i class="fa fa-arrow-up"></i> Mostrar descripción</div>`);
  $('#descrip p').fadeOut();
  $('#container img').css('height', '80vh');      
})
$('#descrip3').click(function() {
  $('#content').html(`<div id="descrip2"><i class="fa fa-arrow-down"></i> Ocultar descripción</div>`);
  $('#descrip p').show();
  $('#container img').css('height', '60vh'); 
})