import React, { useState } from 'react';
import styles from './ProductList.module.scss';
import { BsGrid, BsList } from 'react-icons/bs';
import Search from '../../search/Search'
import ProductItem from '../productItem/ProductItem';


const ProductList = ({products}) => {

  const [ grid, setGrid ] = useState(true)
  const [ search, setSearch ] = useState('')

  return (
    <div className={styles['product-list']} id='product'>
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsGrid size={22} color='#257781' onClick={() => setGrid(true)}/>
          <BsList size={26} color='#257781' onClick={() => setGrid(false)}/>

          <p><b>10 </b> products found</p>

        </div>

        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>

        <div className={styles.sort}>
          <label>Sort by:</label>
          <select>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest price</option>
            <option value="highest-price">Highest price</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>

      <div className={grid? `${styles.grid}` : `${styles.list}`}>

      {products.length === 0 
      ? ( <p>No products found</p> ) 
      : (
        <>
          {products.map((product) => {
            return (
              <div key={product.id}>
                <ProductItem {...product} grid={grid} product={product} />
              </div>
            )
          })}
        </>
      )
    }

      </div>
    </div>
  )
}

export default ProductList
