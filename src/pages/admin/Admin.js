// import { useEffect } from 'react';
import styles from './Admin.module.scss'
import Navbar from '../../components/admin/navbar/Navbar'
import { Route, Routes } from 'react-router-dom';
import Home from '../../components/admin/home/Home';
import ViewProducts from '../../components/admin/viewProducts/ViewProducts'
import AddProduct from '../../components/admin/addProduct/AddProduct';
import { useGetCategoriesAdminQuery, useGetProductsAdminQuery, useGetTvaAdminQuery } from '../../redux/api/adminApi';
import { useDispatch } from 'react-redux';
import { STORE_CATEGORIES, STORE_PRODUCTS, STORE_TVA } from '../../redux/slices/adminSlice';
import { useEffect } from 'react';


const Admin = () => {

  const dispatch = useDispatch()

  const {
    data: catData,
    isSuccess: isCatSuccess,
    isError: isCatError,
    error: catError
  } = useGetCategoriesAdminQuery();

  const {
      data: prodData, 
      isSuccess: isProdSuccess, 
      isError: isProdError, 
      error: prodError
   } = useGetProductsAdminQuery()

  const { 
      data: tvaData, 
      isSuccess: isTvaSuccess, 
      isError: isTvaError, 
      error: tvaError
  } = useGetTvaAdminQuery()

  useEffect(() => {
    if(isCatSuccess) {
      dispatch(
        STORE_CATEGORIES({
          categories: catData.data
        })
      )
    } else if (isCatError) {
      console.log(catError)
    }
  
    if(isProdSuccess) {
      dispatch(
        STORE_PRODUCTS({
          products: prodData.data
        })
      )
    } else if (isProdError){
      console.log(prodError)
    } 
  
    if(isTvaSuccess) {
      dispatch(
        STORE_TVA({
          tva: tvaData.data
        })
      )
    } else if (isTvaError) {
      console.log(tvaError)
    }
  })

  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar/>
      </div>
      <div className={styles.content}>
        <Routes>

          <Route path='home' element={<Home/>}>

          </Route>

          <Route path='allProducts' element={<ViewProducts/>}>

          </Route>

          <Route path='addProduct/:param' element={<AddProduct/>}>

          </Route>


        </Routes>
      </div>
    </div>
  )
}

export default Admin
