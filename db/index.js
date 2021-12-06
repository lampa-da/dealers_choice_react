const Sequelize = require('sequelize')
const {STRING, INTEGER, UUID, UUIDV4} = Sequelize
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/store_react_db')
const faker = require('faker')

let productData = new Array(50).fill('').map(_ => faker.commerce.productName())
let priceData = new Array(50).fill('').map(_=> faker.commerce.price(50, 500, 2, '$'))
let userNameData = new Array(3).fill('').map(_ => faker.internet.userName())


const Product = conn.define('product', {
  name: {
    type: STRING
  },
  price: {
    type: STRING
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

User.hasMany(Order)
Order.belongsTo(User)
Order.belongsToMany(Product, { through : OrderProduct })
Product.belongsToMany(Order, { through : OrderProduct })


const syncAndSeed = async()=>{
  await conn.sync({force: true})
  const products = await Promise.all(
    productData.map((name, idx)=> Product.create({name: name, price: priceData[idx]}))
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
    OrderProduct
  },
  conn,
  syncAndSeed,
  productData,
  priceData,
  userNameData
}