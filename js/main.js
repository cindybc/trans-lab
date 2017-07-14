/* Holiii acá va tu código también */
$(document).ready(function(){
     //MENU
   $(".button-collapse").sideNav();


   //VALIDACION FORMULARIO INDEX.HTML Y PASO A MENU.HTML
   $('#btn-form').click(function() {

   		if(validarCorreo()){
   			if(validarContraseña()){
   				window.open('menu.html', '_self', false);
   			}
   		}
   	})
   //VALIDACION DE NUMERO Y MOSTRAR NUMERO INGRESADO
   $('#btn-perfil').click(function() {
   	   numeroTarjeta();
   })

   //SELECT TARJETAS
    $('select').material_select();

    //INPUT TRAJETA 2
    $('#verSaldo').click(function() {
    	inputTarjeta2();
    });
})
/**********INDEX.HTML************/

   //VALIDACION FORMULARIO INDEX.HTML
   	function validarCorreo(){

	  if(!(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test( $('#email').val()))) {
          $('#email').css('border-color', 'red');
      	  $('#res1').html('*Debe ingresar un email valido');
      	  $('#email').val("");
      	  return false;
      	 
      }else{
      	$('#email').css('border-color', 'green');
      	$('#res1').html('');
      	localStorage.setItem('correo',$('#email').val());
      	return true;
      }
	}

	function validarContraseña(){
		 if(!/^\d{8}$/.test( $('#pw').val())) {
          $('#pw').css('border-color', 'red');
      	  $('#res2').html('*Debe ingresar sólo números');
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
  contador = 0;
  function numeroTarjeta(){
  	     var num= $('#inputTarjeta').val();
  	     console.log(num);
  		if(!$.isNumeric(num)){
          $('#inputTarjeta').css('border-color', 'red');
      	  $('#noValido').html('*Debe ingresar sólo números');
      	  $('#inputTarjeta').val("");
  		}else{
  		  $('#inputTarjeta').css('border-color', 'green');	
  		  $('#noValido').html('');
  		  var div= $('<div/>', 
  		                  {'class' : 'nuevo center',
  		                    'id' : contador});
  		      div.html(num);
  		      contador++;
  		  $('#inputTarjeta').val("");
  		  $('#guardarNumero').append(div);

  		  // localStorage.setItem('numTarjeta',$('#inputTarjeta').val());
  		  // console.log(numTarjeta);
  		}
  }
  /***************************************/
  /*****IMPRIMIR EMAIL - NUMEROS ***/
    //LOCALSTORAGE DE CORREO
  var correoElect = localStorage.getItem('correo');
   $('#lSCorreo').html(correoElect);

    //LOCALSTORAGE DE NÚMERO TARJETA BIP
  



  /**********************************/
  /***********SALDO.HTML************/
 function inputTarjeta2(){
  	     var num= $('#inputTarjeta2').val();
  	     console.log(num);
  		if(!$.isNumeric(num)){
          $('#inputTarjeta2').css('border-color', 'red');
      	  $('#noValido2').html('*Debe ingresar sólo números');
      	  $('#inputTarjeta2').val("");
  		}else{
  		  $('#inputTarjeta2').css('border-color', 'green');	
  		  $('#noValido2').html('');
  		  $('#inputTarjeta2').val("");

  		 
}
  $.ajax({
  	url: 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json',
  	type: 'GET',
  	dataType: 'json',
  	data: {'bip': num},
  })
  .done(function(res) {
  	console.log(res);
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

  function mostrarSaldo(res){
  	var dato = res.saldoTarjeta;
  	var h5 = $('<h5/>', {'class': 'saldito center','text':'SALDO'});
  	var saldito = $('<p/>',{'class': 'saldoP center'});
  	    saldito.append(dato);
  	$('#saldo').append(h5);    
  	$('#saldo').append(saldito);

  }