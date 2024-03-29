const formulario = document.getElementById('formulario');

const validaCorreo = ()=>{
    const expresionRegularCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const inputCorreo = formulario['correo-receptor'];
    if(expresionRegularCorreo.test(inputCorreo.value)){
       inputCorreo.classList.remove('formulario__input--error');
       return true;
    } else {
        inputCorreo.classList.add('formulario__input--error');
        return false;
    }
};

export default validaCorreo;