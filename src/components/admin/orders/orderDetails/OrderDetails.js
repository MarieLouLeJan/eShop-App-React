import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetOneOrderQuery } from '../../../../redux/api/orderApi';
import Loader from '../../../loader/Loader';
import styles from './OrderDetails.module.scss';
import setDate from '../../../../services/dateFormat';
import setTTC from '../../../../services/setTTCPrice';
import UpdateOrder from '../updateOrder/UpdateOrder';


const capitalise = (input) => {
  return `${input[0].toUpperCase()}${input.slice(1).toLowerCase()}`
}

const OrderDetails = () => {

  const { param } = useParams()

  const [ order, setOrder ] = useState({})
  const [ products, setProducts ] = useState([])
  const [ adresses, setAdresses ] = useState([])
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
      setAdresses(data.adresses)
      setStatus(data.order.order_states.title)
    } else if (error) setErrorMessage('Sorry, something went wrong')
  }, [data, error])

  return (
    <section>

      <div className={`container ${styles.table}`}>
        <h2>Order details</h2>
        <div>
          <Link to='/admin/orders'>
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
              <br />
              <p>
                <b>Date:</b> {setDate(order.created_at, 'MM/dd/yyyy')}
              </p>
              <br />
              <p>
                <b>Order amount excl tax:</b> €{(order.totalHT)}
              </p>
              <br />
              <p>
                <b>Order amount incl tax:</b> €{(order.totalTTC)}
              </p>
              <br />
              <p>
                <b>Order status:</b> {status}
              </p>
              <br />
                {adresses.map((ad, index) => {
                  const { adress, adress_types } = ad
                  const { entitled, number, number_complement, street, postal_code, city, country, complement } = adress
                  return (
                      <div key={index}>
                        <p><b>{capitalise(adress_types.title)} address:</b></p>
                        <p>{entitled}</p>
                        <p>{`${number} ${number_complement} ${street}`}</p>
                        <p>{complement}</p>
                        <p>{`${postal_code} ${city}`}</p>
                        <p>{`${country}`}</p>
                        <br />
                      </div>
                  )
                })}
              <br />

              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Tax</th>
                    <th>Quantity</th>
                    <th>Total amount</th>
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
                      </tr>
                    )
                  })}
                </tbody>
              </table>

            </>
          )}
          <UpdateOrder order={order}/>
        </>
      </div>
    </section>
  )
}

export default OrderDetails


