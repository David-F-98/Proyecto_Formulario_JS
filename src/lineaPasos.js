import validarCantidad from "./validaciones/validarCantidad";
import validaCorreo from "./validaciones/validarCorreo";
import validarNombre from "./validaciones/validarNombre";


const linea = document.getElementById('linea-pasos');
linea.addEventListener('click',(e)=>{
    // Ejecuta el click unicamente si el elemnto padre tiene dicha clase
    // e.target.closest('.linea-pasos__paso');
    if(!e.target.closest('.linea-pasos__paso')){
        return false;
    };

    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;
    if(pasoActual === 'cantidad'){
        if(!validarCantidad()){
            return;
        };
    }else if (pasoActual === 'datos'){
        if(!validarNombre() || !validaCorreo()){
            return;
        }
    };

    //Obtenemos el paso al que queremos ir
    const pasoANavegar = e.target.closest('.linea-pasos__paso');

    //comprobamos si el paso esta shuleado
    if(pasoANavegar.querySelector('.linea-pasos__paso-check--checked')){
        const pasoActual = linea.querySelector('.linea-pasos__paso-check--active');
        pasoActual.classList.remove('linea-pasos__paso-check--active');
        const identificador = pasoANavegar.dataset.paso;
        linea.querySelector(`[data-paso="${identificador}"] span`).classList.add('linea-pasos__paso-check--active');

        //Navegamos al paso
        document.querySelector(`.formulario__body [data-paso="${identificador}"]`).scrollIntoView({
            //Realiza una animación con el scrollIntoView desplazandose al inicio de la pantalla
            inline: 'start',
            behavior: 'smooth',
        });
    }
    
})