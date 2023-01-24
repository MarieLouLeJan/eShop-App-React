import { useEffect, useState } from 'react';
import styles from './CheckoutDetails.module.scss'
import Card from '../../../components/card/Card';
import { useGetAllAdressesByUserQuery } from '../../../redux/api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SET_ADRESSES } from '../../../redux/slices/cartSlice';
import CheckoutSummary from '../../../components/checkoutSummary/CheckoutSummary';
import { FaTrashAlt } from 'react-icons/fa';
import Notiflix from 'notiflix';
import { useUpdateAdressPatchMutation } from '../../../redux/api/userApi'


const CheckoutDetails = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ adresses, setAdresses ] = useState([])
    const [ billingAdress, setBillingAdress ] = useState(null)
    const [ shippingAdress, setShippingAdress ] = useState(null)

    const user = useSelector(selectUser)

    const {
        data,
    } = useGetAllAdressesByUserQuery(parseInt(user.id))    

    const handleShipping = (e, value) => {
        setShippingAdress(value)
    }
    const handleBilling = (e, value) => {
        setBillingAdress(value)
    }
    const handleCheckout = (e) => {
        setBillingAdress(null)
        setShippingAdress(null)
        if(billingAdress === null|| shippingAdress === null) toast.error("Please choose adresses")
        else {
            dispatch(SET_ADRESSES({
                billing: billingAdress,
                shipping: shippingAdress
            }))
            navigate('/checkout')
        }
    }

    const confirmDelete = (id) => {
        Notiflix.Confirm.show(
            "Delete Product!!!",
            "You are about to delete this product",
            "Delete",
            "Cancel",
            function okCb() {
              deleteAdress(id);
            },
            function cancelCb() {
              console.log("Delete Canceled");
            },
            {
              width: "320px",
              borderRadius: "3px",
              titleColor: "orangered",
              okButtonBackground: "orangered",
              cssAnimationStyle: "zoom",
            }
          );
    }

    const [ unactiveAdress ] = useUpdateAdressPatchMutation()

    const deleteAdress = async (id) => {
        const myBody = { body: { active: 'false' }, id} 
        await unactiveAdress(myBody).unwrap()
        .then((result) => {
            if(billingAdress === id || shippingAdress === id) {
                setBillingAdress(null)
                setShippingAdress(null)
            }
            toast.success(`Adress deleted !`)
        })
        .catch((err) => {
            console.log(err.data.message)
            toast.error('Sorry something went wrong')
        })
    }

    useEffect(() => {
        if(data) {
            const adresses = data.data.filter(ad => ad.active === true)
            setAdresses(adresses)
        }
    }, [data])


  return (
    <section>
        
        <div className={`container ${styles.checkout}`}>
            <div className={styles.card}>
                <h2 className='--text-center'>Choose adresses</h2>
                {adresses.length > 0 
                ? ( 
                <>
                    <h4 className='--text-center'>Shipping address</h4>
                    <br />
                    <div className={styles.adresses}>
                        {adresses.map((ad) => {                                        
                            return (
                            <div key={ad.id}>
                                <Card cardClass={styles.adress}>
                                    <input name='shipping' type="radio" value={ad.id} id={ad.id} onChange={(e) => handleShipping(e, ad)} />
                                    <label htmlFor={ad.id} className={styles.label}>
                                        <p><b>{ad.entitled}</b></p>
                                        <p>{ad.number} {ad.number_complement} {ad.street}</p>
                                        <p>{ad.postal_code} {ad.city}</p>
                                        <p>{ad.country}</p>
                                        <p>{ad.complement}</p>
                                    </label>
                                    <div className={styles.trash}>
                                        <FaTrashAlt onClick={() => confirmDelete(ad.id)} color={'#257781'} size={15}/>
                                    </div>
                                </Card>
                                <br />
                            </div>
                            )
                        })} 
                    </div>                
                    <br />
                    <h4 className='--text-center'>Billing address</h4>
                    <br />
                    <div className={styles.adresses}>
                        {adresses.map((ad) => {
                            return (
                            <div key={ad.id}>
                                <Card cardClass={styles.adress}>
                                    <input name="billing" type="radio" value={ad.id} id={ad.id} onChange={(e) => handleBilling(e, ad)} />
                                    <label htmlFor={ad.id} className={styles.label} >
                                        <p><b>{ad.entitled}</b></p>
                                        <p>{ad.number} {ad.number_complement} {ad.street}</p>
                                        <p>{ad.postal_code} {ad.city}</p>
                                        <p>{ad.country}</p>
                                        <p>{ad.complement}</p>
                                    </label>
                                    <div className={styles.trash}>
                                        <FaTrashAlt onClick={() => confirmDelete(ad.id)} color={'#257781'} size={15}/>
                                    </div>
                                </Card>
                                <br />
                            </div >
                            )
                        })}
                    </div>
                </>
                ):(
                    <NavLink to='/addAdress'>
                        <div className={`--btn --btn-secondary ${styles.btn}`}>
                            Add a new adress
                        </div>            
                    </NavLink>
                )
                }        
            </div>   
            <div className={styles.card}>
                <Card cardClass={styles.card}>
                    <CheckoutSummary/>
                    <br />
                    <NavLink to='/addAdress'>
                        <div className={`--btn --btn-secondary ${styles.btn}`}>
                            Add a new adress
                        </div>            
                    </NavLink>
                    <br />
                    <button className={`--btn --btn-danger ${styles.btn}`} onClick={(e) =>  handleCheckout(e)}>
                        Go to checkout
                    </button> 
                </Card>
                <br />

            </div>
        </div>


    </section>
    )
}   

export default CheckoutDetails
