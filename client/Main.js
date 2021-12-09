import React from 'react'
import axios from 'axios'
import Products from './Products'
import SingleProduct from './SingleProduct'
import Cart from './Cart'


class Main extends React.Component {
  constructor(){
    super()
    this.state ={
      products: [],
      selectedProduct: {},
      cart: []
    }
    this.selectProduct = this.selectProduct.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
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
    await axios.post('/api/cart', {productId: productInCart.id})
    this.setState({...this.state, cart: [...this.state.cart, productInCart]})
  }

  async deleteProduct(productId){
    const productInCart = (await axios.get(`api/products/${productId}`))
    console.log(productInCart)
    await axios.delete(`/api/cart/${productId}`)
    // this.setState({...this.state, cart: [...this.state.cart, productInCart]})
  }

  async componentDidMount(){
    const resCart = await axios.get('/api/cart')
    this.setState({cart: resCart.data}) 
    const response = await axios.get('/api/products')
    this.setState({products: response.data})
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
      const hash = window.location.hash.slice(1)
      if(target.tagName === 'BUTTON' && target.className === 'add-to-cart-btn'){
        let productId = target.getAttribute('data-id')
        this.addToCart(productId)
      }
      else if(target.tagName === 'BUTTON' && target.className === 'delete-from-cart-btn'){
        let productId = target.getAttribute('data-id')
        console.log(productId)
        this.deleteProduct(productId)
      }
    })

  }

  
  render () {
    const {products, selectedProduct, cart} = this.state
    console.log('cart', cart)
    const {selectProduct, addToCart, deleteProduct} = this
    return (
      
        <div id='main' className='row container'>
          {/* <!-- Sidebar --> */}
          <div id='sidebar'>
            <section>
              <h4>
                <a href='#'>Products({products.length})</a>
              </h4>
              <h4>
                {/* <a>Orders</a> */}
              </h4>
              <h4>
                <a>Cart({cart.length})</a>
              </h4>
            </section>
          </div>
          <Cart cart={ cart } deleteProduct={deleteProduct}/>
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