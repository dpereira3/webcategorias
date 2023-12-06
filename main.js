const url = 'https://apicategorias.onrender.com/categorias'
//const url = 'http://127.0.0.1:5000/categorias'
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalCategoria = new bootstrap.Modal(document.getElementById('modalCategoria'))
const formCategoria = document.querySelector('form')
const nombre = document.getElementById('nombre')
const descripcion = document.getElementById('descripcion')
let opcion = ''

btnCrear.addEventListener('click', ()=>{
    nombre.value = ''
    descripcion.value = ''
    modalCategoria.show()
    opcion = 'crear'
})

//funcion para mostrar categorias
const mostrar = (categorias) => {
    categorias.forEach(categoria => {
        resultados += `<tr>
                            <td>${categoria.cat_id}</td>
                            <td>${categoria.cat_nom}</td>
                            <td>${categoria.cat_desp}</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-primary">Borrar</a></td>
                        </tr>
        
        `
    })
    contenedor.innerHTML = resultados
}

fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error) )


const on = (element, event, iselector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

on(document, 'click', '.btnBorrar', e => {
    console.log('BORRADO9')
})