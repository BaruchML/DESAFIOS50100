const mostrarLista = (lista) => {
    if (lista.length === 0){
        console.log('Lista vacia');
        
    }else {
        for (let i = 0; i < lista.length; i++) {
            console.log(lista[i]);
            
        }
        console.log(`La lista tiene ${lista.length} elementos`);
    }
}
const arr = ['hola', 1, {name:'baruch'}]
mostrarLista([])
mostrarLista(arr)
