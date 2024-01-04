const formulario = document.getElementById('formulario');

const validarNombre = ()=>{
    const expresionRegularNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    const inputNombre = formulario['nombre-receptor'];
    if(expresionRegularNombre.test(inputNombre.value)){
       inputNombre.classList.remove('formulario__input--error');
       return true;
    } else {
        inputNombre.classList.add('formulario__input--error');
        return false;
    };
};

export default validarNombre;