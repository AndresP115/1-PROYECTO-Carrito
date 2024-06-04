
// Variables

//Se pueden declarar las variables de esta forma también.
// const carrito =  document.querySelector('#carrito'),
//       listaCursos = document.querySelector('#lista-cursos');

//const es el que más se utiliza


const carrito =  document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso, presionando 'Agregar al Carrito'
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',  () => {
        articulosCarrito = []; // Reseteamos el arreglo

        limpiarHTML(); // Eliminamos todo el HMTL

    })

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

// Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
        
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
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

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            } else {
                return curso; // Retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];

    } else {
        // Agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }



    // Agrega elementos al arreglo de carrito
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



