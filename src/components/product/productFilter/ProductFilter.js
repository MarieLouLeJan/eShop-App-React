import React, { useEffect, useState } from 'react'
import styles from './ProductFilter.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_BY_CATEGORY, FILTER_BY_PRICE, selectMaxPrice, selectMinPrice } from '../../../redux/slices/filterSlice'

const ProductFilter = ({products, categories}) => {

  const [ category, setCategory ] = useState('All');
  const [ cats, setCats ] = useState([]);
  const [ price, setPrice ] = useState(10000);

  const minPrice = useSelector(selectMinPrice)
  const maxPrice = useSelector(selectMaxPrice)

  const dispatch = useDispatch()

  useEffect(() => {
    setCats([{title: 'All'}, ...categories])
  }, [categories])

  
  const filterProducts = (cat) => {
    setCategory(cat)
    dispatch(FILTER_BY_CATEGORY({
      category: cat,
      products
    }))
  }

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({
      products,
      price
    }))
  }, [ price, dispatch, products])

  const clearFilters = () => {
    setPrice(10000)
    setCategory('All')
    dispatch(FILTER_BY_CATEGORY({
      category: {title: 'All'},
      products
    }))
  }
  

  return (
    <div className={styles.filter}>

      <h4>Categories</h4>

      <div className={styles.category}>
        {cats.map((cat, index) => {
          return (
          <button 
            key={index} 
            type='button' 
            className={`${category.title}` === cat.title ? `${styles.active}` : null} onClick={() => filterProducts(cat)}>  
              &#8250; {cat.title}
          </button>
        )})}
      </div>

      <div className={styles.brand}>

        <h4>Price</h4>
        <p>{ `€${price}` }</p>
        <div className={styles.price}>
          <input className={styles.custom} type="range" value={price} onChange={(e) => setPrice(e.target.value)} min={minPrice} max={maxPrice}/>
        </div>

        <br />

        <button className='--btn --btn-danger' onClick={clearFilters}>Clear filter</button>
        
      </div>

    </div>
  )
}

export default ProductFilter
