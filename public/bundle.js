'use strict';

const formulario$1 = document.getElementById('formulario');

const validarCantidad = () => {
    const expresionRegularCantidad = /^\d+(\.\d+)?$/;
    const inputCantidad = formulario$1.cantidad;
    if(expresionRegularCantidad.test(inputCantidad.value)){
       inputCantidad.classList.remove('formulario__input--error');
       return true;
    } else {
        inputCantidad.classList.add('formulario__input--error');
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
        }    }});

const btnFormulario = document.getElementById('formulario__btn');

btnFormulario.addEventListener('click',(e)=>{
    e.preventDefault();
    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;
    
    if(pasoActual === 'cantidad'){
        
        if(validarCantidad()){
            marcarPaso('cantidad');
            siguientePaso();
        }    }
});
//# sourceMappingURL=bundle.js.map
