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
export default siguientePaso;