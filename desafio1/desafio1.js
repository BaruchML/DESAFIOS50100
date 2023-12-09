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




