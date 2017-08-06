$(document).ready(function(){
     //MENU.
   $(".button-collapse").sideNav();


   //VALIDACION FORMULARIO INDEX.HTML Y PASO A MENU.HTML.
   $('#btn-form').click(function() {
        //Toma la funcion validar correo de mas abajo.
      if(validarCorreo()){
        //Toma la funcion de validar contraseña de mas abajo.
        if(validarContraseña()){
          //Si el correo y la contraseña son validos , me permite pasar al siguiente HTML (MENU.HTML).
          window.open('menu.html', '_self', false);
        }
      }
    })

   //VALIDACION DE NUMERO Y MOSTRAR NUMERO INGRESADO
   $('#btn-perfil').click(function() {
       //Cuando se hace click  al boton de perfil llama a la funcion redactada mas abajo en la seccion PERFIL.HTML.
       numeroTarjeta();
   })

   //SELECT TARJETAS
    $('select').material_select();

    //INPUT TARJETA 2
    //Cuando entro al input de ingreso de tarjeta me agrega el atributo disabled que me deshabilita el select.
    $("#inputTarjeta2").on('focus',function() {
    $(".select-wrapper input").attr("disabled", true);
    });
     //Cuando salgo del input de ingreso de tarjeta me remueve el atributo disabled que me deshabilita el select.
    $("#inputTarjeta2").on('blur', function() {
    $(".select-wrapper input").attr("disabled", false);
    });
    //Cuando entro al select me agrega el atributo disabled que me deshabilita el input de tarjeta.
    $(".select-wrapper input").on('focus',function() {
    $("#inputTarjeta2").val("");
    $("#inputTarjeta2").attr("disabled", true);
    });
    //Cuando salgo del select me remueve el atributo disabled que me deshabilita el input de tarjeta.
    $(".select-wrapper input").on('blur', function() {
    $("#inputTarjeta2").attr("disabled", false);
    });

    $('#verSaldo').click(function() {
    $('#saldo').html('');
    //Cuando se hace click  al boton de consulta de saldo llama a la funcion redactada mas abajo en al seccion SALDO.HTML. .
      inputTarjeta2();
     
    });

    //INPUT TARJETA 3
    $("#inputTarjeta3").on('focus',function() {
    $(".select-wrapper input").attr("disabled", true);
    });
     //Cuando salgo del input de ingreso de tarjeta me remueve el atributo disabled que me deshabilita el select.
    $("#inputTarjeta3").on('blur', function() {
    $(".select-wrapper input").attr("disabled", false);
    });
    //Cuando entro al select me agrega el atributo disabled que me deshabilita el input de tarjeta.
    $(".select-wrapper input").on('focus',function() {
    $("#inputTarjeta3").val("");
    $("#inputTarjeta3").attr("disabled", true);
    });
    //Cuando salgo del select me remueve el atributo disabled que me deshabilita el input de tarjeta.
    $(".select-wrapper input").on('blur', function() {
    $("#inputTarjeta3").attr("disabled", false);
    });

    $('#verCalculo').click(function(){
      $('#horario').html('');
      $('#calculo').html('');
    //Cuando se hace click  al boton de consulta de tarifa llama a la funcion redactada mas abajo en la seccion TARIFA.HTML.
      inputTarjeta3();
    });
})
/**********INDEX.HTML************/

   //VALIDACION FORMULARIO INDEX.HTML

    function validarCorreo(){
      var mail = $('#email').val(); 

    if(mail == ""){
          $('#email').css('border-color', 'red');
          $('#res1').html('*Debe ingresar un email');
          $('#email').val("");
          return false;
    }else if(!(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(mail))) {
          $('#email').css('border-color', 'red');
          $('#res1').html('*Debe ingresar un email valido');
          $('#email').val("");
          return false;
      }else{
        $('#email').css('border-color', 'green');
        $('#res1').html('');
        //Me permite guarda en localStorage el email ingresado en el input.
        localStorage.setItem('correo',mail);
        return true;
      }
  }

  function validarContraseña(){
    var password = $('#pw').val();
    if(password == ""){
          $('#pw').css('border-color', 'red');
          $('#res2').html('*Debe ingresar una contraseña');
          $('#pw').val("");
          return false;
    }
    //Verificar si es numero lo ingresado.
    else if(!$.isNumeric(password)){
          $('#pw').css('border-color', 'red');
          $('#res2').html('*Debe ingresar sólo números');
          $('#pw').val("");
          return false;
     //Verificar que no sea menor a 8 digitos.     
    }else if(password.length < 8) {
          $('#pw').css('border-color', 'red');
          $('#res2').html('*Debe ser mayor a 8 digitos');
          $('#pw').val("");
          return false;  
      }else{
        $('#pw').css('border-color', 'green');
        $('#res2').html('');
        return true;
      }
  }
  /*************************************/
  /************PERFIL.HTML*************/
  //Declaro mi variable que almacenaran los numeros de tarjetas ingresados.
  var arrDeNumTarjeta = [];
  function numeroTarjeta(){
         var num= $('#inputTarjeta').val();
         console.log(num);
      if(num == ""){
          $('#inputTarjeta').css('border-color', 'red');
          $('#noValido').html('*Debe ingresar un número de tarjeta');
          $('#inputTarjeta').val("");
          return false
      }//Verifico que lo ingreseado es numero.
      else if(!$.isNumeric(num)){
          $('#inputTarjeta').css('border-color', 'red');
          $('#noValido').html('*Debe ingresar sólo números');
          $('#inputTarjeta').val("");
          return false
      }else{
        $('#inputTarjeta').css('border-color', 'green');  
        $('#noValido').html('');
        var tarjetaIngresada= $('<div/>',{'class' : 'nuevo center'});
            tarjetaIngresada.html(num);
        $('#inputTarjeta').val("");
        $('#guardarNumero').append(tarjetaIngresada);
        //Coloco los numeros de tarjetas ingresados en un arreglo.
         arrDeNumTarjeta.push(num);
         console.log(arrDeNumTarjeta);
       //R%escato los datos de los numeros de tarjeta ingresados y los guardo con localStorage convirtiendolo en un string Json con Json.stringify para luego ser utilizado.
        localStorage.setItem('bipGuardada', JSON.stringify(arrDeNumTarjeta));
       
      }
  }
  /***************************************/
  /*****IMPRIMIR EMAIL - NUMEROS DE TARJETAS***/
    //LOCALSTORAGE DE CORREO - Me permite tomar el email guardado y hacerlo visible en el PERFIL.HTML.
  var correoElect = localStorage.getItem('correo');
   $('#lSCorreo').html(correoElect);

    //LOCALSTORAGE DE NÚMERO TARJETA BIP - Me permite tomar los numeros de tarjetas guardados y poder utilizarlos en otras secciones.
    //Al utilizar JSON.parse me permite convertir mi Json string creado mas arriba en un objeto par apoder utilizarlo luego.
  var json = JSON.parse(localStorage.getItem('bipGuardada'));
      console.log(json.length);
    //Creo un ciclo que dependiendo de el largo o camtidad de numero de tarjetas ingresadas, las tome y por cada una de ellas genere una etiqueta option con el dato ingresado y lo ingrese como una opcion de el select creado en SALDO.HTML.
     for(var i = 0; i < json.length; i++){
        var opcion = $('<option/>',{'text': json[i]});
        $('#elegirTarjeta').append(opcion);
     }
     

  /**********************************/
  /***********SALDO.HTML************/
  //Valido input de la sección SALDO.HTML- primero si ek campo esta vacio, segundo si el valor ingresado es un número y si pasa las dos pruebas previas, me toma su valor y hace la llamada al AJAX.
 function inputTarjeta2(){
         var num= $('#inputTarjeta2').val();
         console.log(num);
        
      if( num == ""){
        $('#noValido2').html('*Debe ingresar o escoger una tarjeta');
        //Si encuentra el input vacio llama a la función SELECTTARJETA, para asi validar si el select tambien esta vacio.
        selectTarjeta();
      }
      else if(!$.isNumeric(num)){
          $('#inputTarjeta2').css('border-color', 'red');
          $('#noValido2').html('*Debe ingresar sólo números');
          $('#inputTarjeta2').val("");
      }else{
          $('#inputTarjeta2').css('border-color', 'green'); 
          $('#noValido2').html('');
          $('#inputTarjeta2').val("");
          //$('#elegirTarjeta option[value="0"').attr('selected', true);
          llamada(num);
      }
}
  //Valido si el select de la seccion SALDo.HTML esta vacio y si no tomo su valor y llamo al AJAX.
  function selectTarjeta(){
  var valorSelect= $('#elegirTarjeta').val();
   console.log(valorSelect);
   if(!valorSelect){
        $('#noValido2').html('*Debe ingresar o escoger una tarjeta');
    }else{
       $('#noValido2').html('');
       $('#inputTarjeta2').val("");

       llamada(valorSelect);
    }
  } 

//Llamada generada por la validación de un input o select, que me permite tomar el valor ingresado y a traves de la API de tarjeta bip me permite generar información a utilizar.
function llamada(x){
    $.ajax({
      url: 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json',
      type: 'GET',
      dataType: 'json',
      data: {'bip': x},
    })
    .done(function(res) {
      console.log(res);
       //Si existe una respuesta me llama a la función MOSTRARSALDO().
        mostrarSaldo(res);
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
}
 //Funcion que se llamo a traves del AJAX si es que hubo una respuesta positiva.
 //Me permite mostrar el saldo en pantalla de la tarjeta ingresada.
  function mostrarSaldo(res){

    //Dato rescatado de la API sobre el saldo de la bip, segun el número de tarjeta ingresado por el usuario.
    var dato = res.saldoTarjeta;
    var h5 = $('<h5/>', {'class': 'saldito center','text':'SALDO'});
     //Compruebo si el valor del de saldo no fue generado por la API, entregando un mensaje al usuario que "No existe registro de us saldo"
    if(dato == '---'){
        var diferente =  $('<p/>',{'class': 'saldoP center', 'text' : 'No tiene saldo registrado'});
        $('#saldo').append(h5); 
        $('#saldo').append(diferente);
    }else{
    var saldito = $('<p/>',{'class': 'saldoP center'});
        saldito.append(dato);
    $('#saldo').append(h5);    
    $('#saldo').append(saldito);
  }
}
/********************************/
/**********TARIFA.HTML***********/
//Valido input de la sección TARIFA.HTML- Primero si esta vacio, segundo si es un número, y si pasa las pruebas llama a la función VALORTARIFA(Me permite validar si no hay elección en el select tarifa) y a el AJAX para generar el calculo.
 function inputTarjeta3(){
         var num= $('#inputTarjeta3').val();
         console.log(num);
        
      if( num == ""){
        $('#noValido3').html('*Debe ingresar o escoger una tarjeta');
        //Llamo a SELECTTARJETA3 que verifica que si el el input esta vacio, revise si el selecta tambien lo esta.
        selectTarjeta3();
      }
      else if(!$.isNumeric(num)){
          $('#inputTarjeta3').css('border-color', 'red');
          $('#noValido3').html('*Debe ingresar sólo números');
          $('#inputTarjeta3').val("");
      }else{
        $('#inputTarjeta3').css('border-color', 'green'); 
        $('#noValido3').html('');
        $('#inputTarjeta3').val("");

        valorTarifa();
        llamadaCalculo(num);
      }
}
  //Validación de select de tarjeta de la sección TARIFA.HTML, comprueba que no este vacio y si pasa la prueba llama a la validación de tarifa y al AJAX para el calculo.
  function selectTarjeta3(){
  var valorSelect= $('#elegirTarjeta').val();
   console.log(valorSelect);
   if(!valorSelect){
        $('#noValido3').html('*Debe ingresar o escoger una tarjeta');
    }else{
       $('#noValido3').html('');
       $('#inputTarjeta3').val("");
       valorTarifa();
       llamadaCalculo(valorSelect);
    }
  } 
//Me ayuda a validar que el se haya seleccionado una tarifa del select de la sección TARIFA.HTML, para poder generar un calculo.  
function valorTarifa(){
   var tari = $('#elegirTarifa').val();
    if(!tari){
      $('#noValido3').html('*Debe escoger una tarifa');
    }
}

//Llamada que me permite tomar la API de tarjeta bip y ocuparla para darme el saldo de la tarjeta ingresada, para posteriormente ocupar los datos.
function llamadaCalculo(y){
    $.ajax({
      url: 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json',
      type: 'GET',
      dataType: 'json',
      data: {'bip':y},
    })
    .done(function(res) {
      console.log(res);
      //Si hay respuesta positiva me llama a la función MOSTRARCALCULO().
        mostrarCalculo(res);
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
}
//Tomo el saldo que genero el numero de tarjeta y lo muestra en pantalla.
  function mostrarCalculo(res){
    //La PRIMERA parte toma el valor selecionado en el input de tarifa y lo hace visible en pantalla como "COSTO DE PASAJE".
      var selectTarifa = $('#elegirTarifa').val();
      var h5 = $('<h5/>', {'class': 'saldito center','text':'COSTO PASAJE'});
      var pHorario = $('<p/>',{'class': 'calculoP center'});
          pHorario.append(selectTarifa);
      $('#horario').append(h5);    
      $('#horario').append(pHorario);

      //La SEGUNDA parte.
      //Toma el valor del saldo de tarjeta
      var dato = res.saldoTarjeta;
      var h5 = $('<h5/>', {'class': 'saldito center','text':'COSTO FINAL'});
      
      //Compruebo si el valor del de saldo no fue generado por la API, entregando un mensaje al usuario que "No existe registro de us saldo"
      if(dato == '---'){
        var diferente =  $('<p/>',{'class': 'calculoP center', 'text' : 'No tiene saldo registrado'});
        $('#calculo').append(h5); 
        $('#calculo').append(diferente);
      }
      //Si el saldo generado tiene un valor , toma este y lo resta segun el horario elegido(BAJO:$640- VALLE:$660- ALTO:$740).
      //Si es HORARIO BAJO($640).
      else if(selectTarifa == '$640'){
        //Utilizo SLICE pra poder desplazar a simbolo $ y tomar desde la siguiente cifra.
        var desplazar = dato.slice(1, dato.length);
        //Utilizo replace por si el saldo supera los $1.000 me quite el punto(.), para poder generar la resta.
        var reemplazo = desplazar.replace('.', '');
        //Se genera la resta según tarifa selecionada
        var resta1 = (reemplazo - 640);
        var saldito1 = $('<p/>',{'class': 'calculoP center', 'text': '$'});
        console.log(resta1);
        saldito1.append(resta1);
      $('#calculo').append(h5);    
      $('#calculo').append(saldito1);
      }
      //Si es HORARIO VALLE($660).
      else if(selectTarifa== '$660'){
        var desplazar = dato.slice(1, dato.length);
        var reemplazo = desplazar.replace('.', '');
        var resta2 = (reemplazo - 660);
        var saldito2 = $('<p/>',{'class': 'calculoP center', 'text': '$'});
        saldito2.append(resta2);
      $('#calculo').append(h5);    
      $('#calculo').append(saldito2);
      }
      //Si es HORARIO ALTO($740).
      else if(selectTarifa== '$740'){
        var desplazar = dato.slice(1, dato.length);
        var reemplazo = desplazar.replace('.', '');
        var resta3 = (reemplazo - 740);
        var saldito3 = $('<p/>',{'class': 'calculoP center', 'text': '$'});
        saldito3.append(resta3);
      $('#calculo').append(h5);    
      $('#calculo').append(saldito3);
      }
  
}

  