
// Variables

//Se pueden declarar las variables de esta forma también.
// const carrito =  document.querySelector('#carrito'),
//       listaCursos = document.querySelector('#lista-cursos');

//const es el que más se utiliza


const carrito =  document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso, presionando 'Agregar al Carrito'
    listaCursos.addEventListener('click', agregarCurso);
}



// Funciones
function agregarCurso(e) {
    // Para que al presionar el boton de agregar al carrito, la página no se vaya hacía arriba
    // Previene esa acción, ya que en una página cuando uno no pone link y solo #, se va para a arriba
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        
        leerDatosCurso(cursoSeleccionado);
    }
}


// Lee el contenido del HTML y extrae la información del curso
function leerDatosCurso(curso) {
    console.log(curso)
    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso]
    console.log(articulosCarrito)

    carritoHTML();
}


// Muestra el carrito de compras en el HTML
function carritoHTML() {

    // Limpiar el HTML 
    limpiarHTML();

    // Recorre el carrito y general el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src='${imagen}' width="100" >
         </td>
         <td> ${titulo} </td>
         <td> ${precio} </td>
         <td> ${cantidad} </td>
         <td> <a href='#' class='borrar-curso' data-id='${id}'> X </a> </td>
         `;

        // Agrega el HTML al tbody
        contenedorCarrito.appendChild(row);
    });
}

// Elimina los cursos del tbody
function limpiarHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    // Forma adecuada y rápida
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}



