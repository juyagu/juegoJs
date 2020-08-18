let nuevo = document.querySelector("#nuevo");
let rendirse = document.querySelector("#rendirse");
let volver = document.querySelector("#volver");
let alertResult = document.querySelector("#result");
let alertResponse = document.querySelector("#response");
let aceptar = document.querySelector("#aceptar");
let intentos = 0;


let sacados = new Array();

document.addEventListener("DOMContentLoaded", function() {
	obtenerNumeros();
    var n1 = document.querySelector("#n1");
	var n2 = document.querySelector("#n2");
	var n3 = document.querySelector("#n3");
	var n4 = document.querySelector("#n4");	
});

function obtenerNumeros(){
	intentos = 0;
	let numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	sacados = [];
	for (var i = 0; i < 4; i++) {
        var azar = Math.round(Math.random() * (9 - i));
        var seleccionado = numeros.splice(azar, 1);
        sacados.push(seleccionado[0]);
    }
}

nuevo.addEventListener('click',limpiarCampos);

aceptar.addEventListener('click',function(){
	let bien= 0;
	let regular = 0;
	let mal = 0;
	intentos++;

	let numerosIngresados = [Number(n1.value),Number(n2.value),Number(n3.value),Number(n4.value)];
	console.log(sacados);
	sacados.some(v => {
		if(numerosIngresados.includes(v)){
			if(sacados[numerosIngresados.indexOf(v)] === numerosIngresados[numerosIngresados.indexOf(v)]){
				bien++;
			}else{
				regular++;
			}
		}else{
			mal++;
		}

	});
	setearResultados(numerosIngresados,bien,regular,mal,intentos);
	
});

function setearResultados(ingresados,bien,regular,mal,intentos){
	alertResult.classList.remove('hide');
	let msg = '';
	if(bien === 4){
		msg = `Usted ha acertado todos los números en ${intentos} intentos, felicitaciones!!!`;
		n1.disabled = true;
		n2.disabled = true;
		n3.disabled = true;
		n4.disabled = true;
		aceptar.disabled = true;
	}else{
	 msg = `Usted ha ingresado ${bien} números bien, ${regular} números regular y ${mal} números mal.  Intentos: ${intentos}`;
	}
	
	alertResult.innerHTML = msg;
	let nums = '';
	ingresados.forEach(function(numero,key,array){
		if (key === array.length - 1){ 
			nums += " " + numero;	
		}else {
			nums += numero +  ', ';
		}

	});
	let p = document.createElement('p');
	p.innerHTML = nums;
	let mensaje = document.querySelector('#ingresados');
	mensaje.appendChild(p);
	mensaje.classList.remove('hide');
}

rendirse.addEventListener('click',function(){
	n1.value = '';
	n2.value = '';
	n3.value = '';
	n4.value = '';
	nums = '';
	sacados.forEach(function(numero,key,array){
		if (key === array.length - 1){ 
			nums += " " + numero;	
		}else {
			nums += numero +  '- ';
		}

	});
	alertResult.classList.add('hide');
	alertResponse.classList.add('hide');
	document.querySelector('#ingresados').classList.add('hide');
	let response = document.querySelector("#response");
	response.classList.remove('hide');
	response.innerHTML = `El número era ${nums}`;
	aceptar.disabled = true;
});

volver.addEventListener('click',limpiarCampos);

function limpiarCampos(){
	n1.value = '';
	n2.value = '';
	n3.value = '';
	n4.value = '';
	alertResult.classList.add('hide');
	alertResponse.classList.add('hide');
	response.classList.add('hide');
	document.querySelector('#ingresados').innerHTML = '';
	document.querySelector('#ingresados').classList.add('hide');
	n1.disabled = false;
	n2.disabled = false;
	n3.disabled = false;
	n4.disabled = false;
	aceptar.disabled = false;
	obtenerNumeros();
}