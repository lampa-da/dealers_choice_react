import React from 'react'

const Products = (props)=>{
  const {products} = props
  console.log('props', props)
  return(
    <div className='container'>
      <div id='products' className='row wrap'>
        {
          products.map(product =>{
            return(
              <div key={product.id} className='product'>
                <a href={`#${product.id}`}>
                  <img src='avatar-default.jpg' />
                  <p>{product.name}</p>
                  <small>{product.price}</small>
                  <button className="add-to-cart-btn" >Add to cart</button>
                </a>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Products