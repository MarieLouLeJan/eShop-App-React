import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {  useGetCategoriesShopQuery, useGetProductsShopQuery } from '../../redux/api/shopApi';
import { GET_PRICE_RANGE } from '../../redux/slices/filterSlice';
import styles from './Product.module.scss'
import ProductFilter from './productFilter/ProductFilter';
import ProductList from './productList/ProductList';
import { FaCogs } from 'react-icons/fa'

const Product = () => {

  const dispatch = useDispatch()

  const [ categories, setCategories ] = useState([])
  const [ products, setProducts ] = useState([])
  const [ showFilter, setShowFilter ] = useState(false)

  const {
    data: catData,
    isSuccess: isCatSuccess,
    isError: isCatError,
    error: catError,
    isLoading: isCatLoading
  } = useGetCategoriesShopQuery();

  const {
    data: prodData,
    isSuccess: isProdSuccess,
    isError: isProdError,
    error: prodError,
    isLoading: isProdLoading
  } = useGetProductsShopQuery();

  console.log(useGetProductsShopQuery())

  
  useEffect(() => {
    if(isCatSuccess) {
      setCategories(catData.data)

    } else if (isCatError) {
      toast.error('Something went wrong')
      console.log(catError)
    }
    if(isProdSuccess) {
      setProducts(prodData.data)
      dispatch(GET_PRICE_RANGE({
        products: prodData.data
      }))
    } else if (isProdError) {
      toast.error('Something went wrong')
      console.log(prodError)
    }
  }, [catData, catError, isCatError, isCatSuccess, isProdSuccess, isProdError, prodData, prodError, dispatch])

  const toggleFilter = () => {
    setShowFilter(!showFilter)
  }

  return (
    <section>
      <div className={`container ${styles.product}`}>

        <aside className={showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`}>
          {(isCatLoading || isProdLoading) ? null : <ProductFilter products={products} categories={categories}/>}
        </aside>


        <div className={styles.content}>
          { (isCatLoading || isProdLoading) 
            ? (<img src='/images/loader.gif' alt='Loading...' style={{width: '50px'}} className='--center-all'/> )
            : ( <ProductList products={products}/> )}

            <div className={styles.icon} onClick={toggleFilter}>
              <FaCogs size={20} color='#257781'/>
              <p>
                <b>{showFilter ? 'Hide filter' : 'Show filter'}</b>
              </p>
            </div>
        </div>

      </div>
    </section>
  )
}

export default Product
