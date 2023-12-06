const urlall = 'https://apicategorias.onrender.com/categorias'
//const url = 'http://127.0.0.1:5000/categorias'
const urlbase = 'https://apicategorias.onrender.com/categoria'
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
                            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><span> | </span><a class="btnBorrar btn btn-danger">Borrar</a></td>
                        </tr>
        
        `
    })
    contenedor.innerHTML = resultados
}

fetch(urlall)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error) )


const on = (element, event, selector, handler) => {
    //console.log(selector)
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//Metodo Borrar registro
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    alertify.confirm("Confirma borrar?",
    function(){
        fetch(urlbase+'/'+id, {
            method: 'DELETE'
        })
        .then ( res => res.json() )
        .then ( ()=> location.reload() )
        alertify.success('Ok')
    },
    function(){
        alertify.error('Cancelar')
    })
})

//Metodo Editar registro
let idForm = 0
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    console.log(idForm)
    const nombreForm = fila.children[1].innerHTML
    const despForm = fila.children[2].innerHTML
    nombre.value = nombreForm
    descripcion.value = despForm
    opcion = 'editar'
    modalCategoria.show()
})

//Metodo para Crear y Editar
formCategoria.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion == 'crear'){
        fetch(urlbase, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                cat_nom: nombre.value,
                cat_desp: descripcion.value
            })
        })
        .then( response => response.json() )
        .then( data => {
            const nuevaCategoria = []
            nuevaCategoria.push(data)
            mostrar(nuevaCategoria)
        })
    }
    if(opcion == 'editar'){
        fetch(urlbase+'/'+idForm, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                cat_nom: nombre.value,
                cat_desp: descripcion.value
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalCategoria.hide()
})