import React from 'react'

const Cart = (props)=>{
  const {cart, deleteProduct} = props
  console.log('propssssss', cart)
  return(
    <div className='container'>
      <table id='product-in-cart'>
        <tbody>
          <tr className='gray'>
            <td />
            <td>#</td>
            <td>Name</td>
            <td>Price</td>
            <td />
          </tr>
          { 
            cart.map((product, idx) =>{
              return(
                <tr key={idx}>
                  <td />
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td><button className='delete-from-cart-btn' data-id={product.id}>x</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Cart