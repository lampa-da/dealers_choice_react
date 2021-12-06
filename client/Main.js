import React from 'react'
import axios from 'axios'

export default class Main extends React.Component {
  constructor(){
    super()
    this.state ={
      products: [],
      // selectedProduct: {}
    }
    // this.selectProduct = this.selectProduct.bind(this)
    // this.componentDidMount = this.componentDidMount.bind(this)
    // this.playSong = this.playSong.bind(this)
  }
  // async selectProduct(id){
  //   const response = await axios.get(`api/products/${id}`)
  //   const product = response.data
  //   console.log(product)
  //   this.setState({selectedProduct: product})
  // }
  async componentDidMount(){
    const response = await axios.get('/api/products')
    this.setState({products: response.data})
  }

  
  render () {
    const {products, selectedProduct} = this.state
    console.log(products)
    const {selectProduct, componentDidMount} = this
    return (
      
        <div id='main' className='row container'>
          {/* <!-- Sidebar --> */}
          <div id='sidebar'>
            <section>
              <h4>
                <a>Products</a>
              </h4>
              <h4>
                <a>Users</a>
              </h4>
              <h4>
                <a>Orders</a>
              </h4>
              <h4>
                <a>Cart</a>
              </h4>
            </section>
          </div>

          <div className='container'>

            {/* <!-- All Products --> */}
            <div id='products' className='row wrap'>
              <div className='product'>
                <a>
                  <img src='avatar-default.jpg' />
                  <p>Product Name</p>
                  <small>Price</small>
                  <button className="add-to-cart-btn">Add to cart</button>
                </a>
              </div>
          </div>
        </div>
      </div>
    
  
    )
  }
}