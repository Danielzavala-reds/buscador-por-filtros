// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const maximo = document.querySelector('#maximo');
const minimo = document.querySelector('#minimo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const resultado = document.querySelector('#resultado');

// Variable para poner el maximo de año
const max = new Date().getFullYear();
const min = max - 12;

// Generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
    
}



// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // Muestra los automoviles al cargar


    // Llena las opciones de años
    llenarSelect();
});
// Event listener para los select de busqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    
    // Filtrar auto como funcion
    filtrarAuto();
});

year.addEventListener('change', e =>{
    datosBusqueda.year = parseInt (e.target.value);
    
    filtrarAuto();
});

minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = e.target.value;
    
    filtrarAuto();
});

maximo.addEventListener('change', e =>{
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
   
});

puertas.addEventListener('change', e =>{
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
    
});

transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
    console.log(datosBusqueda);
});



// Funciones
function mostrarAutos(autos){

    limpiarHTML(); //Elimina el HTML previo
    autos.forEach(auto => {

        // Haciendo distrocturing para una mejor sintaxis
        const {marca, modelo, year, precio, puertas, color, transmision} = auto;

        const autoHMTL = document.createElement('p');

        autoHMTL.textContent= `
        ${marca} ${modelo} - Año: ${year} - Precio: ${precio} - Puertas: ${puertas} - Color: ${color} - Transmision: ${transmision}
       
        `
        // Insertar resultado en el HTML

        resultado.appendChild(autoHMTL);
    });
}

// Limpiar HTML

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

// Genera los años del select
function llenarSelect(){
    for( let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // Agrega las opciones de año al select
    }
}


// Funcion que filtra en base a la busqueda

function filtrarAuto(){
    // Aquí se crea una funcion de alto nivel, es decir una funcion que toma otra funcion
    const resultado = autos.filter( filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    
    console.log(resultado);
    

    if( resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
}

// Funcion que va a mostrar mensaje de no resultado
function noResultado(){
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados, cambia algúnos parametros de búsqueda';
    resultado.append(noResultado);
}

function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if( marca ) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto){
    const {year} = datosBusqueda;
   
    if (year) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if(minimo){
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if(maximo){
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if (puertas){
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if (transmision){
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto){
    const {color} = datosBusqueda;
    if (color){
        return auto.color === color;
    }
    return auto;
}

