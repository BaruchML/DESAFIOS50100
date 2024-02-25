import {Command} from "commander"

const program = new Command()

program     //'argmuent','description','default value'
    .option('-d','Variable para debug', false)
    .option('-p, --port <port>','Puerto en el que se inicia nuestro servidor', 8080)
    .option('--mode <port>','Modo de uso de nuestro server', 'Production')
    .option('-u <user>','Usuario utilizando el server', 'No se ha declarado ningun usuario')
    .parse()
    
console.log('Opciones ', program.opts());
//program.opts nos devuelve un objeto, podemos desetructurarlo y usar las variables
const {d,
    port,
    mode,
    u} = program.opts()
    
console.log('Opciones ', d,port,mode,u);