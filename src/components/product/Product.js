import React, { useEffect, useState } from 'react';
import {  useGetCategoriesShopQuery, useGetProductsShopQuery } from '../../redux/api/shopApi';
import styles from './Product.module.scss'
import ProductFilter from './productFilter/ProductFilter';
import ProductList from './productList/ProductList';

const Product = () => {

  const [ categories, setCategories ] = useState([])
  const [ products, setProducts ] = useState([])

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

  
  useEffect(() => {
    if(isCatSuccess) {
      setCategories(catData.data)
    } else if (isCatError) {
    }
    if(isProdSuccess) {
      setProducts(prodData.data)
    } else if (isProdError) {
      console.log(prodError)
    }
  }, [catData, catError, isCatError, isCatSuccess, isProdSuccess, isProdError, prodData, prodError])



  return (
    <section>
      <div className={`container ${styles.product}`}>

        <aside className={styles.filter}>
          {(isCatLoading || isProdLoading) ? null : <ProductFilter/>}
        </aside>


        <div className={styles.content}>
          { (isCatLoading || isProdLoading) 
            ? (<img src='/images/loader.gif' alt='Loading...' style={{width: '50px'}} className='--center-all'/> )
            : ( <ProductList products={products}/> )}
        </div>

      </div>
    </section>
  )
}

export default Product
