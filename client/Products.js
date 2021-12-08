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
                </a>
                  <button className="add-to-cart-btn" data-id={product.id}>Add to cart</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Products