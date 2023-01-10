import React, { useEffect } from 'react';
import styles from './Admin.module.scss'
import Navbar from '../../components/admin/navbar/Navbar'
import { Route, Routes } from 'react-router-dom';
import Home from '../../components/admin/home/Home';
import ViewProducts from '../../components/admin/viewProducts/ViewProducts'
import AddProduct from '../../components/admin/addProduct/AddProduct';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { STORE_CATEGORIES, STORE_PRODUCTS, STORE_TVA } from '../../redux/slices/adminSlice';

const Admin = () => {

  const dispatch = useDispatch()

  const getCats = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_ROOT_URL}/categories/getAllAdmin`)
    .catch(function (e) {
      if(e.response) {
        toast.error(e.response.data.message)
      }
    })
    Object.keys(res.data.categories).forEach(function(key, index) {
      res.data.categories[key].products.sort((a, b) => b.active - a.active)
    })
    return res.data.categories
  }

  const getProducts = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_ROOT_URL}/products/getAllAdmin`)
    .catch(function (e) {
      if(e.response) {
        toast.error(e.response.data.message)
      }
    })
    return res.data.products
  }

  const getTVA = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_ROOT_URL}/TVA/getAll`)
    .catch(function (e) {
      if(e.response) {
        toast.error(e.response.data.message)
      }
    })
    return res.data.TVAs
  }

  useEffect(() => {

    const storeCats = async () => {
      const categories = await getCats()
      dispatch(
        STORE_CATEGORIES({
          categories
        })
      )
    }
    const storeProds = async () => {
      const products = await getProducts()
      dispatch(
        STORE_PRODUCTS({
          products
        })
      )
    }

    const storeTva = async () => {
      const tva = await getTVA()
      dispatch(
        STORE_TVA({
          tva
        })
      )
    }

    storeCats()
    storeProds()  
    storeTva()

  }, [dispatch])

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

          <Route path='addProduct/:id' element={<AddProduct/>}>

          </Route>


        </Routes>
      </div>
    </div>
  )
}

export default Admin
