import { useState } from 'react'
import { CountryDropdown } from 'react-country-region-selector';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateOneAdressMutation } from '../../redux/api/userApi';
import { selectUser } from '../../redux/slices/authSlice';
import Card from '../card/Card';
import Loader from '../loader/Loader';
import styles from './Adress.module.scss'



const AddAdress = () => {

    const user = useSelector(selectUser)
    const navigate = useNavigate()

    const [ newAdress, setNewAdress ] = useState({
        entitled: '',
        number: 0,
        number_complement: '',
        street: '',
        postal_code: 0,
        city: '',
        country: '',
        complement: '',
        active: true
    })

    const [ addAdress, { isLoading } ] = useCreateOneAdressMutation()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAdress({ ...newAdress, [ name ]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const adress = { ...newAdress }
        adress.number = parseInt(adress.number)
        adress.postal_code = parseInt(adress.postal_code)
        adress.user_id = user.id
        setNewAdress(adress)
        await addAdress(adress)
        .unwrap()
        .then((result) => {
          toast.success(`Your adress has been created !`)
          navigate('/checkout-details')
        })
        .catch((err) => {
          console.log(err)
        })
    }

  return (
    <div className={styles.checkout}>

        {(isLoading) && <Loader/>}
        <Card cardClass={styles.card}>

            <h3>Add a new address</h3>

            <form onSubmit={handleSubmit}>
                <label>Entitled</label>
                        <input 
                        required
                        type="text" 
                        placeholder='Entitled'
                        name="entitled" 
                        value={newAdress.entitled} 
                        onChange={(e) => handleInputChange(e)}/>

                    <label>Number</label>
                    <input 
                        required
                        type="text" 
                        placeholder='111'
                        name="number" 
                        value={newAdress.number} 
                        onChange={(e) => handleInputChange(e)}/>
                    
                    <label>Number complement</label>
                    <input 
                        type="text" 
                        placeholder='bis'
                        name="number_complement" 
                        value={newAdress.number_complement} 
                        onChange={(e) => handleInputChange(e)}/>

                    <label>Street</label>
                    <input 
                        required
                        type="text" 
                        placeholder='St Street'
                        name="street" 
                        value={newAdress.street} 
                        onChange={(e) => handleInputChange(e)}/>

                    <label>Postal code</label>
                    <input 
                        required
                        type="text" 
                        placeholder='90000'
                        name="postal_code" 
                        value={newAdress.postal_code} 
                        onChange={(e) => handleInputChange(e)}/>
                
                    <label>City</label>
                    <input 
                        required
                        type="text" 
                        placeholder='Paris'
                        name="city" 
                        value={newAdress.city} 
                        onChange={(e) => handleInputChange(e)}/>

                    <label>Country</label>
                    <CountryDropdown
                        className={styles.select}
                        valueType='short'
                        value={newAdress.country}
                        onChange={(val) => handleInputChange({
                        target: {
                        name: 'country',
                        value: val
                        }
                    })}/>

                    <label>Complement</label>
                    <input 
                        type="text" 
                        placeholder='Some other information'
                        name="complement" 
                        value={newAdress.complement} 
                        onChange={(e) => handleInputChange(e)}/>
                    
                    <button className='--btn --btn-danger' type='submit'>Add address</button>
            </form>
        </Card>
    </div>
  )
}

export default AddAdress
