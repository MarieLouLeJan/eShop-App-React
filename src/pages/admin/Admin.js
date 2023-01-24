import styles from './Admin.module.scss'
import Navbar from '../../components/admin/navbar/Navbar'
import { Route, Routes } from 'react-router-dom';
import Home from '../../components/admin/home/Home';
import ViewProducts from '../../components/admin/viewProducts/ViewProducts'
import AddProduct from '../../components/admin/addProduct/AddProduct';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SAVE_URL } from '../../redux/slices/cartSlice';
import Orders from '../../components/admin/orders/allOrders/Orders';
import OrderDetails from '../../components/admin/orders/orderDetails/OrderDetails';

const Admin = () => {

  const dispatch = useDispatch()
  useEffect(() => {dispatch(SAVE_URL(""))}, [dispatch]);

  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar/>
      </div>
      <div className={styles.content}>
        <Routes>

          <Route path='home' element={<Home/>}/>

          <Route path='allProducts' element={<ViewProducts/>}/>

          <Route path='addProduct/:param' element={<AddProduct/>}/>

          <Route path='orders' element={<Orders/>}/>

          <Route path='order-details/:param' element={<OrderDetails/>}/>

        </Routes>
      </div>
    </div>
  )
}

export default Admin
