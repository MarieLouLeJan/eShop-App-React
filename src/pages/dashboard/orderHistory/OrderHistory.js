import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../../../components/loader/Loader'
import { useGetOrderByUserQuery } from '../../../redux/api/orderApi'
import { selectUser } from '../../../redux/slices/authSlice'
import styles from './OrderHistory.module.scss'
import setDate from '../../../services/dateFormat'
import { useNavigate } from 'react-router-dom'


const OrderHistory = () => {

    const navigate = useNavigate()
    
    const user = useSelector(selectUser)
    const [ orders, setOrders ] = useState([])

    const {
        data,
        error,
        isLoading
    } = useGetOrderByUserQuery(parseInt(user.id)) 

    useEffect(() => {
        if(data ) {
            setOrders(data.data)
        } else if(error) {
            console.log(error.data.message);
            toast.error('Sorry, something went wrong')
        }
    }, [data, error])

    const handleClick = (id) => {
        navigate(`/order-details/${id}`);
    }

  return (
    <section>

        <div className={`container ${styles.order}`}>
            
            <h2>Your order history</h2>
            <p>Clic on your order to see the <b>details</b></p>
            <br />

            <>
                {(isLoading) && <Loader/>}
                <div className={styles.table}>
                    {orders.length === 0 ?(
                        <p>No order found</p>
                    ):(
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Reference</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => {
                                    const { id, reference, created_at, totalTTC, order_states, quantity} = order
                                    return (
                                        <tr key={id} onClick={() => handleClick(id)}>
                                            <td>{setDate(created_at, 'MM/dd/yyyy')}</td>
                                            <td>{reference}</td>
                                            <td>{quantity}</td>
                                            <td>€{totalTTC.toFixed(2)}</td>
                                            <td>
                                                <p className={order_states.title !== 'Delivered' ? `${styles.pending}` : `${styles.delivered}`}>
                                                    {order_states.title}
                                                </p>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )
                }
                </div>
            </>

        </div>
      
    </section>
  )
}

export default OrderHistory
