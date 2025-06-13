class ProductManager {
    constructor (){
        this.products = []
    }

    getProducts(){
        return this.products
    }

    addProduct(product){
        if(!product.title || !product.description || !product.price || !product.thumnail || !product.code || !product.stock )
        {
            return 'Le falta un campo'
        }

        const result = this.products.find(prod => prod.code === product.code)
        if (result){
            return 'ya se encuentra ese codigo'
        }
        if (this.products.length === 0){
            this.products.push({...product,id: 1})

        }else {
            this.products.push({...product, id: this.products.length + 1})
        }

        return 'producto agregado'
    }
    getProdById (pid){
        return this.products.find(prod => prod.id === pid)
    }
}

const products = new ProductManager()
const products2 = new ProductManager()

console.log(products.getProducts());

console.log(products.addProduct({title:'arroz',description:'20kg',price: 100 ,thumnail:"sinimagen",code:"abc123",stock:10}))
console.log(products.addProduct({title:'leche',description:'12lt',price: 180 ,thumnail:"sinimagen",code:"888",stock:20}))
console.log(products.addProduct({title:'huevos',description:'caja',price: 120 ,thumnail:"sinimagen",code:"888",stock:20}))
console.log(products.addProduct({title:'pañales',description:'paquete',price: 7000 ,thumnail:"sinimagen",code:"111lala"}))

console.log(products.getProducts());

console.log(products.getProdById(2));



let objeto = {
    title: 'Nombre',
    description: 'Descripcion',
    price: 1200,
    thumbnail: 'Nombre',
    code: 'a',
    stock: 10
}
let objeto2 = {
    title: 'Nombre',
    description: 'Descripcion',
    price: 1200,
    // thumbnail: 'Nombre',
    code: 'a',
    stock: 10
}
let objeto3 = {
    title: 'Nombre',
    // description: 'Descripcion',
    price: 1200,
    thumbnail: 'Nombre',
    code: 'a',
    stock: 10
}
let objeto4 = {
    title: 'Nombre',
    description: 'Descripcion',
    price: 1200,
    thumbnail: 'Nombre',
    code: 'b',
    stock: 10
}


class ProductManager {

  
    constructor() {
        this.idProduct = 0
        this.products = []
    }
    addProduct = ({ ...product }) => {
        if (!product.title || !product.description || !product.price || !product.thumbnail  || !product.code || !product.stock) {
            return 'Producto Incompleto'
        }
        const findCode = this.products.find(p => p.code === product.code)
        if (!findCode) {
            this.idProduct = this.idProduct + 1
            const productAdded = {id:this.idProduct,...product}
            this.products.push(productAdded)
            return productAdded
        }
        return 'Ya se encuentra ese producto'
    }
    getProducts = () => {
          return this.products
    }
    getProductById = (idProduct) => {
         const findProduct = this.products.find(p => p.id === idProduct)
         if (!findProduct) {
            return 'No se encuentra el producto'
         }
         return findProduct
    }

}

const mayonesa = new ProductManager()
console.log(mayonesa.addProduct(objeto));
console.log(mayonesa.addProduct(objeto));
console.log(mayonesa.addProduct(objeto2));
console.log(mayonesa.addProduct(objeto3));
console.log(mayonesa.addProduct(objeto4));
console.log(mayonesa.getProducts());
console.log(mayonesa.getProductById(2));
console.log(mayonesa.getProductById(3));
