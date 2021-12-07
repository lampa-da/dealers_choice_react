import React from 'react'


const SingleProduct = (props)=>{
  const {selectedProduct} = props
  console.log('props', props)
  return(
    <div className='container'>
      <div id='single-product' className='row wrap'>    
        <div className='product'>
          <a>
            <img src='avatar-default.jpg' />
            <p>{selectedProduct.name}</p>
            <small>{selectedProduct.price}</small>
            <button className="add-to-cart-btn" >Add to cart</button>
          </a>
        <div>
          <h2>Description: {selectedProduct.name}</h2>
          {selectedProduct.description}
        </div> 
        </div>
      </div>
    </div>
  )
}

export default SingleProduct