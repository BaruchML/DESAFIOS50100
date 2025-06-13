const suma = (num1,num2) => {
     return new Promise((resolve,reject) =>{
        if(num1 === 0 || num2 === 0){
            reject('Operación Innecesaria')
        }else{
            resolve(num1+num2)
        }
    })
}
const resta = (num1,num2) => {
     return new Promise((resolve,reject) =>{
        if(num1 === 0 || num2 === 0){
            reject('Operación Invalida')
        }else if(num1 < num2){
            reject('La calculadora solo puede devolver numeros positivos')

        }else{
            resolve(num1-num2)

        }
    })
}


const calculadora = async (num1,num2,cb) => {
    try{
        let result = await cb(num1,num2)
        console.log(result);
        
    }
    catch(err){
        console.log(err);
        
    }
}

calculadora(0,1,suma)
calculadora(2,1,suma)
calculadora(2,0,resta)
calculadora(2,5,resta)
calculadora(10,5,resta)