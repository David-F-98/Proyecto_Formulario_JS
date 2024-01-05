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
        if(!validaCorreo() || !validarNombre()){
            return;
        }
    };

    console.log('Cambaindo de paso');
    
})