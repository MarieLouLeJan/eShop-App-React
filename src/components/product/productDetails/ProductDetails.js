import React, { useEffect, useState } from 'react'
import styles from './ProductDetails.module.scss'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useGetOneProductShopQuery } from '../../../redux/api/shopApi'
import Loader from '../../loader/Loader'

const ProductDetails = () => {

    const { param } = useParams()
    const [ product, setProduct ] = useState({})
    const [ tva, setTva ] = useState('')


    const {
        data,
        isLoading,
        isError
    } = useGetOneProductShopQuery(parseInt(param))

    const priceTTC = (HT, TVA) => {
        HT = parseFloat(HT)
        let totalTTC = (HT * TVA) + HT;
        return totalTTC.toFixed(2);
    }

    useEffect(() => {
        if(data) {
            setProduct({...data.data, priceTTC: priceTTC(data.data.priceHT, data.data.tva.value)});
            setTva(data.data.tva.title)
        } else if (isError) toast.error('Product not found')
    }, [data, isError])


  return (
    <>
        {isLoading && <Loader/>}

        <section>
            <div className={`container ${styles.product}`}>
                <h2>Details</h2>
                <div>
                    <Link to='/#products'>&larr; Back to shop</Link>
                </div>

                { product === null 
                ? ( <p>Something went wrong</p>) 
                : 
                <>
                    <div className={styles.details}>
                        <div className={styles.img}>
                            <img src={product.image} alt={product.title} />
                        </div>
                        <div className={styles.content}>
                            <h3>{product.title}</h3>
                            <p className={styles.price}>€{product.priceTTC}</p>
                            <p>{product.description}</p>
                            <p>
                                <b>TVA</b> {tva}
                            </p>
                            <div className={styles.count}>
                                <button className='--btn'>-</button>
                                <p>
                                    <b>1</b>
                                </p>
                                <button className='--btn'>+</button>
                            </div>

                            <button className='--btn --btn-danger'>Add to cart</button>
                        </div>
                        
                    </div>
                </>
            }                

            </div>
        </section>

    </>
  )
}

export default ProductDetails
