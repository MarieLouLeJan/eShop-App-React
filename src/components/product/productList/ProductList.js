import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ProductList.module.scss';
import { BsGrid, BsList } from 'react-icons/bs';
import Search from '../../search/Search'
import ProductItem from '../productItem/ProductItem';
import { FILTER_BY_SEARCH, SORT_PRODUCT, selectFilteredProducts } from '../../../redux/slices/filterSlice';
import Pagination from '../../pagination/Pagination';


const ProductList = ({products}) => {

  const [ grid, setGrid ] = useState(true);
  const [ search, setSearch ] = useState('');
  const [ sort, setSort ] = useState('latest');

  const filteredProducts = useSelector(selectFilteredProducts)

  // Pagination states
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ productsPerPage ] = useState(6);
  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({
      search,
      products
    }))
  }, [dispatch, search, products])

  useEffect(() => {
    dispatch(SORT_PRODUCT({
      sort,
      products
    }))
  }, [dispatch, sort, products])


  return (
    <div className={styles['product-list']} id='product'>
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsGrid size={22} color='#257781' onClick={() => setGrid(true)}/>
          <BsList size={26} color='#257781' onClick={() => setGrid(false)}/>

          <p><b>{filteredProducts.length} </b> products found</p>

        </div>

        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>

        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
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
          {currentProducts.map((product) => {
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
      <Pagination 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
      />
    </div>
  )
}

export default ProductList
