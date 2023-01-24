import styles from './ProductItem.module.scss'
import Card from '../../card/Card'
import { Link } from 'react-router-dom'
import setTTC from '../../../services/setTTCPrice'
import { useDispatch } from 'react-redux'
import { ADD_TO_CART } from '../../../redux/slices/cartSlice'


const ProductItem = ({product, grid, id, title, priceHT, image, tva, description}) => {

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n ) {
      const shortenedText = text.substring(0, n).concat('...')
      return shortenedText
    }
    return text
  }

  const addToCart = () => {
    dispatch(ADD_TO_CART({
      myProduct: {
        id,
        priceHT,
        TVA_title: tva.title,
        TVA_value: tva.value,
        title
      },
      quantity: 1
    }))
  }

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
        
        <Link to={`/product-details/${id}`}>
          <div className={styles.img}>
            <img src={image} alt={title} />
          </div>
        </Link>
      
      <div className={styles.content}>
        <div className={styles.details}>
            <p>{`€${setTTC(priceHT, tva.value)}`}</p>
            <h4>{shortenText(title, 15)}</h4>
        </div>

        {!grid && <p className={styles.description}>{shortenText(description, 200)}</p>}

        <button className='--btn --btn-danger' onClick={addToCart}>Add to cart</button>

      </div>

    </Card>
  )
}

export default ProductItem
