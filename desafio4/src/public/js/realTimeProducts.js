const socket = io()
socket.emit('message', 'Buenas desde socket')

let productsList = document.querySelector('#productos')
console.log(productsList)

const chatbox = document.querySelector('#chatbox')
chatbox.addEventListener('keyup', (evt) => {
    if (evt.key === 'Enter') {
        socket.emit('prodeliminado', chatbox.value)

        console.log(chatbox.value);
        chatbox.value = ''

    }
})

socket.on('Datos', data => {
    let products = ''
    data.forEach(element => {
        products += `<li>Producto: ${element.title} a un precio de  $${element.price}. -- ID:${element.id} </li>`
    });

    productsList.innerHTML = products
})


const newProductForm = document.getElementById('newProduct')

newProductForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    const newProduct= {
    title: newProductForm[0].value,
    price: newProductForm[1].value,
}
    socket.emit('newProduct', newProduct)
    newProductForm.reset()
})

console.log('Hola desde realtime');