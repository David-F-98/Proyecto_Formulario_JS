'use strict';

const formulario$3 = document.getElementById('formulario');

const validarCantidad = () => {
    const expresionRegularCantidad = /^\d+(\.\d+)?$/;
    const inputCantidad = formulario$3.cantidad;
    if(expresionRegularCantidad.test(inputCantidad.value)){
       inputCantidad.classList.remove('formulario__input--error');
       return true;
    } else {
        inputCantidad.classList.add('formulario__input--error');
        return false;
    }
};

const formulario$2 = document.getElementById('formulario');

const validarNombre = ()=>{
    const expresionRegularNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    const inputNombre = formulario$2['nombre-receptor'];
    if(expresionRegularNombre.test(inputNombre.value)){
       inputNombre.classList.remove('formulario__input--error');
       return true;
    } else {
        inputNombre.classList.add('formulario__input--error');
        return false;
    }};

const formulario$1 = document.getElementById('formulario');

const validaCorreo = ()=>{
    const expresionRegularCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const inputCorreo = formulario$1['correo-receptor'];
    if(expresionRegularCorreo.test(inputCorreo.value)){
       inputCorreo.classList.remove('formulario__input--error');
       return true;
    } else {
        inputCorreo.classList.add('formulario__input--error');
        return false;
    }
};

const marcarPaso = (paso)=>{
    document
    .querySelector(`.linea-pasos [data-paso="${paso}"] span`)
    .classList.add('linea-pasos__paso-check--checked');
};

const siguientePaso = ()=>{
   const pasos = [...document.querySelectorAll('.linea-pasos__paso')];
   const pasoActivo = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso');

   const indexPasoActivo = pasos.indexOf(pasoActivo);

   if(indexPasoActivo < (pasos.length-1)){
        pasoActivo.querySelector('span').classList.remove('linea-pasos__paso-check--active');
        pasos[indexPasoActivo+1].querySelector('span').classList.add('linea-pasos__paso-check--active');
        const identificador = pasos[indexPasoActivo + 1].dataset.paso;
        // Accede por medio de backtips al identificador del data set
        document.querySelector(`.formulario__body [data-paso="${identificador}"]`).scrollIntoView({
            //Realiza una animación con el scrollIntoView desplazandose al inicio de la pantalla
            inline: 'start',
            behavior: 'smooth',
        });
        
   }
};

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
        }    }});

const btnFormulario = document.getElementById('formulario__btn');

btnFormulario.addEventListener('click',(e)=>{
    e.preventDefault();
    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;
    
    if(pasoActual === 'cantidad'){
        
        if(validarCantidad()){
            marcarPaso('cantidad');
            siguientePaso();
        }    } else if(pasoActual === 'datos'){
        if(validarNombre() && validaCorreo()){
            marcarPaso('datos');
            siguientePaso();
        }    } else if (pasoActual === 'metodo'){
        marcarPaso('metodo');

        //Formato de moneda Colombiana

        const opciones = {style: 'currency', currency: 'COP'};
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
        },3000);
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
    }    
});

const linea = document.getElementById('linea-pasos');
linea.addEventListener('click',(e)=>{
    // Ejecuta el click unicamente si el elemnto padre tiene dicha clase
    // e.target.closest('.linea-pasos__paso');
    if(!e.target.closest('.linea-pasos__paso')){
        return false;
    }
    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;
    if(pasoActual === 'cantidad'){
        if(!validarCantidad()){
            return;
        }    }else if (pasoActual === 'datos'){
        if(!validarNombre() || !validaCorreo()){
            return;
        }
    }
    //Obtenemos el paso al que queremos ir
    const pasoANavegar = e.target.closest('.linea-pasos__paso');

    //comprobamos si el paso esta shuleado
    if(pasoANavegar.querySelector('.linea-pasos__paso-check--checked')){
        const pasoActual = linea.querySelector('.linea-pasos__paso-check--active');
        pasoActual.classList.remove('linea-pasos__paso-check--active');
        const identificador = pasoANavegar.dataset.paso;
        linea.querySelector(`[data-paso="${identificador}"] span`).classList.add('linea-pasos__paso-check--active');
        

        //Cambio de iconos y texto del boton
        const btnFormulario = document.getElementById('formulario__btn');
        //Texto
        btnFormulario.querySelector('span').innerHTML = 'Siguiente';
        //Icono lo remueve
        btnFormulario.querySelector('[data-icono="banco"]').classList.remove('formulario__btn-contenedor-icono--active');
        //Icono lo agrega
        btnFormulario.querySelector('[data-icono="siguiente"]').classList.add('formulario__btn-contenedor-icono--active');

        //Deshabilitamos el boton
        btnFormulario.classList.remove('formulario__btn--disabled');

        
        //Navegamos al paso
        document.querySelector(`.formulario__body [data-paso="${identificador}"]`).scrollIntoView({
            //Realiza una animación con el scrollIntoView desplazandose al inicio de la pantalla
            inline: 'start',
            behavior: 'smooth',
        });

    }
    
});
//# sourceMappingURL=bundle.js.map
