import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../../components/loader/Loader'
import { useGetOneOrderQuery } from '../../../redux/api/orderApi'
import styles from './OrderDetails.module.scss'
import setTTC from '../../../services/setTTCPrice'
import setDate from '../../../services/dateFormat'


const OrderDetails = () => {

  const { param } = useParams()

  const [ order, setOrder ] = useState({})
  const [ products, setProducts ] = useState([])
  const [ status, setStatus ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)

  const {
    data,
    error,
    isLoading
} = useGetOneOrderQuery(parseInt(param)) 

  useEffect(() => {

    if(data) {
      setOrder(data.order)
      setProducts(data.products)
      setStatus(data.order.order_states.title)
      console.log(data)
    } else if (error) {
      setErrorMessage('Sorry, something went wrong')
    }

  }, [data, error])

  return (
    <section>

      <div className={`container ${styles.table}`}>
        <h2>Order Details</h2>
        <div>
          <Link to='/order-history'>
            &larr; Back to orders
          </Link>
        </div>
        <br />

        <>
          {(isLoading) && <Loader/>}

          {errorMessage ? (
            <p><b>{errorMessage}</b></p>
          ) : (
            <>
              <p>
                <b>Order reference:</b> {order.reference}
              </p>
              <p>
                <b>Date:</b> {setDate(order.created_at, 'MM/dd/yyyy')}
              </p>
              <p>
                <b>Order amount excl tax:</b> € {order.totalHT}
              </p>
              <p>
                <b>Order amount incl tax:</b> € {order.totalTTC}
              </p>
              <p>
                <b>Order status:</b> {status}
              </p>
              <br />

              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Tax</th>
                    <th>Quantity</th>
                    <th>Total amount</th>
                    <th>Review</th>
                  </tr>
                </thead>
                <tbody>
                  { products.map(prod => {
                    const {product, priceHT, TVA_title, quantity, TVA_value} = prod;
                    const priceTTC = setTTC(priceHT, TVA_value)
                    return (
                      <tr key={product.id}>
                        <td>
                            <b> <Link to={`/product-details/${product.id}`}>{product.title}</Link> </b>
                        </td>
                        <td>€{priceTTC}</td>
                        <td>{TVA_title}</td>
                        <td>{quantity}</td>
                        <td>€{(priceTTC * quantity).toFixed(2)}</td>
                        <td className={styles.icons}>
                          <button className='--btn --btn-primary'>
                            <Link to={`/review-product/${product.id}`}>
                              Review Product
                            </Link>
                          </button>

                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

            </>
          )}

        </>


      </div>
      
    </section>
  )
}

export default OrderDetails
