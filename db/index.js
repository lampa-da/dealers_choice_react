const Sequelize = require('sequelize')
const {STRING, INTEGER, UUID, UUIDV4, TEXT} = Sequelize
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/store_react_db')
const faker = require('faker')

let productData = new Array(50).fill('').map(_ => faker.commerce.productName())
let priceData = new Array(50).fill('').map(_=> faker.commerce.price(50, 500, 2, '$'))
let descriptionData = new Array(50).fill('').map(_=> faker.lorem.paragraphs(faker.random.number({min: 2, max: 5})))
let userNameData = new Array(3).fill('').map(_ => faker.internet.userName())


const Product = conn.define('product', {
  name: {
    type: STRING
  },
  price: {
    type: STRING
  },
  description: {
    type: TEXT
  },
  avatarUrl:{
    type: STRING,
    defaultValue: "avatar-default.jpg"
  }
})
const User = conn.define('user', {
  name: {
    type: STRING
  },
})

const Order = conn.define('order', {
  
})

const OrderProduct = conn.define('order_product', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: INTEGER
  },
  productId: {
    type: INTEGER
  }
});
const Cart = conn.define('cart', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    // autoIncrement: true
  }
})
const CartProduct = conn.define('cart_product', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cartId: {
    type: INTEGER
  },
  productId: {
    type: INTEGER
  }
});

Cart.belongsTo(User)
Cart.belongsTo(Product)
// Product.belongsToMany(Cart, { through : CartProduct })
// Cart.belongsToMany(Product, { through : CartProduct })



User.hasMany(Order)
Order.belongsTo(User)
Order.belongsToMany(Product, { through : OrderProduct })
Product.belongsToMany(Order, { through : OrderProduct })


const syncAndSeed = async()=>{
  await conn.sync({force: true})
  const products = await Promise.all(
    productData.map((name, idx)=> Product.create({name: name, price: priceData[idx], description: descriptionData[idx]}))
  )
  const users = await Promise.all(
    userNameData.map((name)=> User.create({name: name}))
  )
  
  const orders = await Promise.all([
    Order.create({userId: 1}),
    Order.create({userId: 1})
  ])

  const orderProducts = await Promise.all([
    OrderProduct.create({productId: 1, orderId: 1}),
    OrderProduct.create({productId: 2, orderId: 1}),
    OrderProduct.create({productId: 3, orderId: 2}),
    OrderProduct.create({productId: 4, orderId: 2}),
    OrderProduct.create({productId: 5, orderId: 2})
  ])
}

module.exports ={
  models: {
    Product, 
    Order, 
    User,
    OrderProduct,
    Cart
  },
  conn,
  syncAndSeed,
  productData,
  priceData,
  userNameData
}