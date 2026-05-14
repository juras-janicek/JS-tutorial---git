const order = {
    order_num: 67871, 
    customer: {
        name: "Fake Man",
        email: "fake@gmail.com",
    },
    product: {
        name: "Super shoes",
        price: 6700,
    },
    showSumary(){
        console.log(`order ${this.order_num}: ${this.customer.name} ordered ${this.product.name} for ${this.product.price}`)
    }
}


const products = [
    {name: "water", price: 10.99, on_stock: true},
    {name: "apple", price: 15.99, on_stock: false},
    {name: "milk", price: 20.99, on_stock: true},
]

const our_products = products.forEach(products => {return `${products.name}: ${products.price} ${products.on_stock ? "is on stock" : "isn't on stock"}`})

const on_stock = products.filter(products => {return products.on_stock} )

const find_Milk = products.find(products => {return products.name === "milk"})

console.log(find_Milk)