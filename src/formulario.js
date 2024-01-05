import validarCantidad from "./validaciones/validarCantidad";
import validarNombre from "./validaciones/validarNombre";
import validaCorreo from "./validaciones/validarCorreo";
import marcarPaso from "./marcarPaso";
import siguientePaso from "./siguientePaso";

const formulario = document.getElementById('formulario');

//Reiniciando scroll al cargar el formulario
formulario.querySelector('.formulario__body').scrollLeft = 0;

formulario.addEventListener('keyup',(e)=>{
    if(e.target.tagName === 'INPUT'){
        if(e.target.id === 'cantidad'){
            validarCantidad();
        } else if(e.target.id === 'nombre-receptor'){
            validarNombre();
        } else if(e.target.id === 'correo-receptor'){
            validaCorreo();
        };
    };
});

const btnFormulario = document.getElementById('formulario__btn');

btnFormulario.addEventListener('click',(e)=>{
    e.preventDefault();
    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;
    
    if(pasoActual === 'cantidad'){
        
        if(validarCantidad()){
            marcarPaso('cantidad');
            siguientePaso();
        };
    } else if(pasoActual === 'datos'){
        if(validarNombre() && validaCorreo()){
            marcarPaso('datos');
            siguientePaso();
        };
    } else if (pasoActual === 'metodo'){
        marcarPaso('metodo');

        //Formato de moneda Colombiana

        const opciones = {style: 'currency', currency: 'COP'}
        const formatoMoneda = new Intl.NumberFormat('es-CO', opciones);

        document.querySelector('[data-valor="cantidad"] span').innerText = formatoMoneda.format(formulario.cantidad.value);
        document.querySelector('[data-valor="nombre-receptor"] span').innerText = formulario['nombre-receptor'].value;
        document.querySelector('[data-valor="correo-receptor"] span').innerText = formulario['correo-receptor'].value;
        document.querySelector('[data-valor="metodo"] span').innerText = formulario.metodo.value;

        //Cambiar el texto del btn a Transferir
        btnFormulario.querySelector('span').innerHTML =  'Transferir';

        //Agregamos la clase que deshabilita el boton
        btnFormulario.classList.add('formulario__btn--disabled');

        //Ocultar icono siguiente
        btnFormulario.querySelector('[data-icono="siguiente"]').classList.remove('formulario__btn-contenedor-icono--active');

        //Mostrar icono Banco
        btnFormulario.querySelector('[data-icono="banco"]').classList.add('formulario__btn-contenedor-icono--active');

        siguientePaso();

        setTimeout(()=>{
            btnFormulario.classList.remove('formulario__btn--disabled');
        },3000)
    } else if (pasoActual === 'confirmacion' && !btnFormulario.matches('.formulario__btn--disabled')){
        //Aqui se haria la peticion al servidor
        ///////////////////////////////////////////////
        ///////////////////////////////////////////////

        
        //Cambiamos el texto del boton 
        btnFormulario.querySelector('span').innerHTML =  'Transfiriendo';
        //Deshabilitamos el btn
        btnFormulario.classList.add('formulario__btn--disabled');


        setTimeout(()=>{
            //Ocultamos el formulario
            formulario.classList.add('formulario--hidden');
            //Mostramos la alerta
            document.getElementById('alerta').classList.add('alerta--active');
        },3000);
    };
    
});