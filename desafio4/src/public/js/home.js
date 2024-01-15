
/// PARTE 1 CLASE 10------------------------

// const socket = io() //config socket del lado del cliente 

// socket.emit('message', 'Hola server')


//aca el cliente esta escuchando si en el server es esta socket.emit
// socket.on('solo-para-el-actual', data => {console.log(data);})
// socket.on('para-todos', data => {console.log(data);})
/// PARTE 1 CLASE 10------------------------

//PARTE PARA CHAT
// const socket = io()
// let user
// Swal.fire({
//     title:'Identificate',
//     input:'text',
//     text:'Ingresa el usuario para identificarte en el chat',
//     inputValidator: valor => {
//         return !valor && 'Necesitas ingresar el nombre de usuario para continuar'

//     } ,
//     allowOutsideClick:false
// }).then( result => {
//     user=result.value
//  console.log(user);
// })

//metodo para traernos las cosas por el chat
//metodoviejo y que utilizaria otras variables para traer cosas de todo tipo
//const chatbox = document.getElementById ('chatbox')

//metodo actual y que trae todo tipo de archivos
// const chatbox= document.querySelector('#chatbox')
// chatbox.addEventListener('keyup', (evt) => {
// if(evt.key === 'Enter'){
//                 //trim quita espacios al inicio y al final
//     if(chatbox.value.trim().length > 0){
//         socket.emit('message',{user, message: chatbox.value})
//         chatbox.value = ''
//     }
// }
// })
// socket.on('messageLogs', data => {
//     // console.log(data);
//     let messageLogs = document.querySelector('#messageLogs')
//     let mensajes = ''
//     data.forEach(mensaje => {
//         mensajes += `<li>${mensaje.user} dice ${mensaje.message}</li>`
//     })

//     messageLogs.innerHTML = mensajes
// })

console.log('Hola desde home.js');