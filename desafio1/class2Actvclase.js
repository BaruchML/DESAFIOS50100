const objetos = [ 
    {
        manzanas:3,
        peras: 2,
        jugos:3,
        carnes:4,
        dulces:1
    },
    {
        manzanas:1,
        peras: 4,
        jugos:10,
        carnes:0,
        dulces:3
    },
];
const products = Object.values(objetos)
console.log(productos);
console.log(Object.entries(objetos));
console.log(

    objetos.includes('manzana')
);

