const socket = io()
socket.emit('message','Buenas desde socket')

let productsList = document.querySelector('#productos')
console.log(productsList)

const chatbox= document.querySelector('#chatbox')
chatbox.addEventListener('keyup', (evt) => {
if(evt.key === 'Enter'){
    socket.emit('prodeliminado', chatbox.value)

    console.log(chatbox.value);
    chatbox.value=''

}
})

socket.on('Datos', data => {
    let products = ''
    data.forEach(element => {
        products += `<li>Producto: ${element.title} a un precio de  $${element.price}. -- ID:${element.id} </li>`
    });

    productsList.innerHTML = products
})



const newTitleProd = document.querySelector('#newTitleProd')
const newPriceProd = document.querySelector('#newPriceProd')

newTitleProd.addEventListener('keyup', (evt)=>{
    if(evt.key === 'Enter'){
        socket.emit('newtitle',{title:newTitleProd.value})
        newTitleProd.value = ''
    } 

})

newPriceProd.addEventListener('keyup', (evt)=>{
    if(evt.key === 'Enter'){
        socket.emit('newprice',{price:newTitleProd.value})
        newPriceProd.value = ''
    } 

})

// if(newTitleProd || newPriceProd){
//     console.log('Producto Creado');
// }


console.log(newPriceProd.value);
console.log(newTitleProd.value);
console.log('Hola desde realtime');