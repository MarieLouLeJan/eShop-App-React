import Product from '../Product'
import styles from './ProductItem.module.scss'
import Card from '../../card/Card'
import { Link } from 'react-router-dom'

const ProductItem = ({product, grid, id, title, priceHT, image, tva, description}) => {

    const priceTTC = (HT, TVA) => {
        HT = parseFloat(HT)
        let totalTTC = (HT * TVA) + HT;
        return totalTTC.toFixed(2);
    }

    const shortenText = (text, n) => {
      if (text.length > n ) {
        const shortenedText = text.substring(0, n).concat('...')
        return shortenedText
      }
      return text
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
            <p>{`€${priceTTC(priceHT, tva.value)}`}</p>
            <h4>{shortenText(title, 15)}</h4>
        </div>

        {!grid && <p className={styles.description}>{shortenText(description, 200)}</p>}

        <button className='--btn --btn-danger'>Add to cart</button>

      </div>

    </Card>
  )
}

export default ProductItem