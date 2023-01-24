import styles from './Home.module.scss'
import { selectUser } from '../../../redux/slices/authSlice'
import { useSelector } from 'react-redux'
import InfoBox from '../adminInfos/infoBox/InfoBox'
import { AiFillDollarCircle } from 'react-icons/ai'
import { BsCart4 } from 'react-icons/bs'
import { FaCartArrowDown } from 'react-icons/fa'
import { useGetProductsAdminQuery } from '../../../redux/api/shopApi'
import { useEffect } from 'react'
import { useState } from 'react'
import { useGetAllOrdersAdminQuery } from '../../../redux/api/orderApi'
import Chart from '../orders/chart/Chart'

const earningIcon = <AiFillDollarCircle size={30} color='#b624ff'/>
const productIcon = <BsCart4 size={20} color='#1f93ff'/>
const orderIcon = <FaCartArrowDown size={20} color='rgb(51, 175, 88)'/>

const Home = () => {

  const user = useSelector(selectUser)

  const { data: prodData } = useGetProductsAdminQuery(); 

  const { data: orderData } = useGetAllOrdersAdminQuery(); 

  const [ productsCount, setProductsCount ] = useState(0)
  const [ earnings, setEarnings ] = useState(0)
  const [ ordersCount, setOrdersCount ] = useState(0)



  useEffect(() => {
    if(prodData) {
      setProductsCount(prodData.data.length)
    }
    if(orderData) {
      const orderNotCancelled = orderData.data.filter(order => order.order_states.id !== 5)
      let earnings = 0
      for (const ord of orderNotCancelled) earnings += ord.totalTTC
      setEarnings(earnings)
      setOrdersCount(orderData.data.length)
    }
  }, [orderData, prodData])

    return (
      <div className={styles.home}>
        <h2>Hi {user.firstname}</h2>
        
        <div className={styles['info-box']}>

          <InfoBox 
            cardClass={`${styles.card} ${styles.cardEarning}`}
            title={'Earnings'}
            count={`$ ${earnings.toFixed(2)}`}
            icon={earningIcon}/>

          <InfoBox 
            cardClass={`${styles.card} ${styles.cardProducts}`}
            title={'Products'}
            count={productsCount}
            icon={productIcon}/>

          <InfoBox 
            cardClass={`${styles.card} ${styles.cardOrders}`}
            title={'Orders'}
            count={ordersCount}
            icon={orderIcon}/> 

        </div>

        <div>
          <Chart/>
        </div>
      </div>
    )
  }
  
  export default Home
  