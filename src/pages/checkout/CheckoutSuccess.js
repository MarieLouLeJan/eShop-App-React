import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { RESET_ALL } from '../../redux/slices/cartSlice';

const CheckoutSuccess = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(RESET_ALL())
  }, [dispatch])


  return (
    <section>
      <div className="container">
        <h2>Checkout successful</h2>
        <p>Thank you for your purchase</p>
        <br />
        
        <button className='--btn --btn-primary'>
          <Link to='/order-history'>
            View order status
          </Link>
        </button>
      </div>
    </section>
  )
}

export default CheckoutSuccess
