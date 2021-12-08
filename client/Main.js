import React from 'react'
import axios from 'axios'
import Products from './Products'
import SingleProduct from './SingleProduct'


class Main extends React.Component {
  constructor(){
    super()
    this.state ={
      products: [],
      selectedProduct: {},
      cart: {}
    }
    this.selectProduct = this.selectProduct.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }
  async selectProduct(id){
    if(!id){
      this.setState({selectedProduct: {}})
    }
    else{
      const response = await axios.get(`api/products/${id}`)
      const product = response.data
      this.setState({selectedProduct: product})
    }
  }
  async addToCart(productId){
    const productInCart = (await axios.get(`api/products/${productId}`)).data
    const cart = (await axios.post('/api/cart', {productId: productInCart.id}))
    this.setState({cart: productInCart})
  }

  async componentDidMount(){
    const resCart = await axios.get('/api/cart')
    const response = await axios.get('/api/products')
    this.setState({products: response.data})
    this.setState({cart: resCart.data})
    // console.log("cart", cart)
    const hash = window.location.hash.slice(1)
    if(hash){
      this.selectProduct(hash)
    }
    window.addEventListener('hashchange', ()=>{
      const hash =window.location.hash.slice(1)
      this.selectProduct(hash)
    })
    window.addEventListener('click', async(ev)=>{
      const target = ev.target
      const hash =window.location.hash.slice(1)
      if(target.tagName === 'BUTTON'){
        let productId = target.getAttribute('data-id')
        this.addToCart(productId)
      }
    })

  }

  
  render () {
    const {products, selectedProduct, cart} = this.state
    console.log('cart', cart)
    const {selectProduct} = this
    return (
      
        <div id='main' className='row container'>
          {/* <!-- Sidebar --> */}
          <div id='sidebar'>
            <section>
              <h4>
                <a href='#'>Products({products.length})</a>
              </h4>
              <h4>
                <a>Orders</a>
              </h4>
              <h4>
                <a>Cart</a>
              </h4>
            </section>
          </div>

          {/* <!-- All Products --> */}
          {
            selectedProduct.id ? (
              <SingleProduct selectedProduct={ selectedProduct }/>
              ):(
              <Products products={ products }/>
            )

          }
      </div>
    
  
    )
  }
}
export default Main