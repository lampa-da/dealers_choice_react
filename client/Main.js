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
      chart: {}
    }
    this.selectProduct = this.selectProduct.bind(this)
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

  async componentDidMount(){
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

  }

  
  render () {
    const {products, selectedProduct} = this.state
    console.log(products)
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