// const miFuncionMap = (array, cb) => {
//     const newArray = [];
//     for (let i = 0; i < array.length; i++) {
//         const aplicandoFuncion = cb(array[i])
//         newArray.push(aplicandoFuncion)
//     }
//     return newArray
// }


// const miArray = [1,2,3,4,5]

// console.log(miFuncionMap(miArray,x=> x*10));
// console.log(miArray.map(x=> x*10));

// // si quiero agregar el metodo al propio array
//                             //SE DEBE ASIGNAR UNA FUNCION CLASICA.
// Array.prototype.miPropioMap = function(cb){
//     const newArray = [];
//     for (let i = 0; i < this.length; i++) {
//         const aplicandoFuncion = cb(this[i])
//         newArray.push(aplicandoFuncion)
//     }
//     return newArray
// }

// console.log(miArray.miPropioMap(x=>x*10));


// const sumar = (num1,num2) => num1 + num2
// const restar = (num1,num2) => num1 - num2
// const multiplicar = (num1,num2) => num1 * num2
// const dividir = (num1,num2) => num1 / num2

// const calculadora = (num1,num2,cb) => {
//     const result = cb(num1,num2)
//     return result
// }


// console.log(calculadora(5,5,sumar));
// console.log(calculadora(5,5,restar));
// console.log(calculadora(5,5,multiplicar));
// console.log(calculadora(5,5,dividir));


const probandoPromesas = (dividendo,divisor) => {
    return new Promise((resolve,reject) =>{
        if(dividendo === 0){
            reject('No se puede dividir entre 0')
        }else{
            resolve(dividendo/divisor)
        }
    })
}

// probandoPromesas(6,3)
//     .then(resultado => console.log(resultado))
//     .catch(error => console.log(error));
// probandoPromesas(0,3)
//     .then(resultado => console.log(resultado))
//     .catch(error => console.log(error));

    //Ahora con async y await 
    const dividirAsincronamente = async () => {
        try{
             let result = await probandoPromesas(4,3)   
             let result2 = await probandoPromesas(0,3)   
             console.log(result,result2);
             
        }
        catch(error){
            console.log(error);
            
        }
        finally{
            console.log('Este siempre se ejecuta');
            
        }
    }

    dividirAsincronamente()