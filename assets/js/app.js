$(document).ready(() =>{

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

  // console.log(email);
  // console.log(contrasena);

  // se le pasan por parametros el email y la contrasena
  // auth() auntenticacion
   firebase.auth().createUserWithEmailAndPassword(email, contrasena)
  // si el usuario se registra correctamente (con el then), se ejecutara el verificar, para enviar el correo electronico al nuevo 
  // usuario
  .then(function(){
    verificar();
  })

  // promesa catch() para que si no funciona el mail con la contrasena, se ejecutara un catch con la funcion 
  // que se le pasa el parametro error, el cual dicta los dos errores que se guardan en variables
  .catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    //...
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
    // ...
  });
}

// funcion que siempre verifica la pagina web buscando si esque existe el usuario
function observador(){
  // si existe una autenticacion (auth) de usuario o un cambio de usuario, 
  // osea una persona se registro
  firebase.auth().onAuthStateChanged(function(user) {
    // se ejecuta el if
    // si existe el usuario se ejecutan las variables
    if (user) {
      console.log('Bievenido a la Nasaaa!!');
      aparecer(user);
      // User is signed in.
      var displayName = user.displayName;
      // email
      var email = user.email;

      toDayImage();
      searchPhoto ();

      $('#titulo-logo').hide();

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

// 
function aparecer(user){
  var user = user;
  var contenido = document.getElementById('contenido');
  // si user tiene el mail verificado
  if(user.emailVerified){
    // mostrara el boton de cerrar sesion
    contenido.innerHTML = ` 
    <div class="col-md-6 text-center">  
      <h4 class="alert-heading">Hola! ` + user.email + ` </h4>
    </div>
    <div class="col-md-6 text-center">
      <button onclick="cerrar()" class='btn btn-danger btn-sm'>CERRAR SESION</button>
    </div>
    `;
    // toDayImage();
    // searchPhoto ();

    // $('#titulo-logo').hide();
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

function searchPhoto(){
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
}


// $("p").hide(1000);
//     $("button").click(function(){
//         $("p").show(1000);
//     });
