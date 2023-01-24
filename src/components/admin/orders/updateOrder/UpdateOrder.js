import Notiflix from 'notiflix';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetAllOrderStatesQuery, useUpdateOrderMutation } from '../../../../redux/api/orderApi';
import Card from '../../../card/Card';
import Loader from '../../../loader/Loader';
import styles from './UpdateOrder.module.scss'


const UpdateOrder = ({order}) => {

  const navigate = useNavigate()

  const [ allStatus, setAllStatus ] = useState([])
  const [ status, setStatus ] = useState({})
  const [ errorMessage, setErrorMessage ] = useState('')

  const {
    data,
    error,
    isLoading
  } = useGetAllOrderStatesQuery() 

  const [ updateOrder, { isLoading: isUpdateLoading} ] = useUpdateOrderMutation()


  useEffect(() => {
    if(data) setAllStatus(data.data);
    else if (error) setErrorMessage("Sorry something went wront")
  }, [data, error])

  const confirmEdit = async (e) => {
    e.preventDefault()
    Notiflix.Confirm.show(
      'Warning',
      `You're about to edit this order`,
      'Edit',
      'Cancel',
      function okCb() {
        editOrder()
      },
      function cancelCb() {
        toast.success('Changed your mind ? :)')
      },
      {
        width: '320px',
        borderRadius: '8px',
        titleColor: 'red',
        okButtonBackground: 'green',
        cssAnimationStyle: 'fade'
      },
    );
  }

  const editOrder = async () => {
    updateOrder({id: order.id, body: {order_states_id: status}})
    toast.success('Order edited !')
    navigate('/admin/orders')
  }

  return (
    <>

    {(isLoading || isUpdateLoading) && <Loader/>}

    {errorMessage ? (
            <p><b>{errorMessage}</b></p>
          ) : (
            <div className={styles.status}>
              <Card cardClass={styles.card}>
                <h4>Update Status</h4>
                <form onSubmit={(e) => confirmEdit(e)}>
                  <span>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                      {allStatus.map(stat => {
                        return (
                          <option value={stat.id} key={stat.id}>{stat.title}</option>
                        )
                      })}
                    </select>
                  </span>
                  <span>
                    <button type='submit' className='--btn --btn-primary'>
                      Update status
                    </button>
                  </span>
                </form>
              </Card>
            </div>
        )}


      
    </>
  )
}

export default UpdateOrder
