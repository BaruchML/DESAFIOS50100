class Contador {
    constructor(name){
        this.name = name
        this.count = 0
    }

    static globalCounter = 0
    getResponsable= () => {
        console.log(this.name);
    }
    contar = () => {
        this.count = this.count + 1 
        Contador.globalCounter = Contador.globalCounter + 1
        console.log(this.count, Contador.globalCounter);
        
    }
}

const Contador1 = new Contador('Baruch');
const Contador2 = new Contador('Ana');

Contador1.getResponsable()
Contador1.contar()
Contador2.contar()
Contador2.getResponsable()
