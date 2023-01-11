import React, { useEffect, useState } from 'react';
import styles from './auth.module.scss';
import Card from '../../components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useResetPasswordMutation } from '../../redux/api/authApi';
import Loader from '../../components/loader/Loader';


const Reset = () => {

  const [ email, setEmail ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  const [ 
    reset, { 
      isSuccess: isResetSuccess, 
      isError: isResetError, 
      error: resetError,
    }
  ] = useResetPasswordMutation()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    await reset({ email })
  }

  useEffect(() => {
    if(isResetSuccess) {
      setIsLoading(false)
      toast.success('An email had been sent')
      navigate('/login')
    } else if (isResetError) {
      console.log(resetError)
      setIsLoading(false)
      toast.error(resetError.data.message)
    }
  }, [isResetSuccess, resetError, isResetError, navigate])
  
  return (

    <>
      {isLoading && <Loader/>}

      <section className={`container ${styles.auth}`}>

        <div className={styles.img}>
          <img src="/images/forgot.png" alt="LoginImg" width='400px'/>
        </div>

        <Card>
          <div className={styles.form}>

            <h2>Reset Password</h2>

            <form onSubmit={handleSubmit}>
              <input 
              type='text' 
              placeholder='Email' 
              required
              onChange={(e) => setEmail(e.target.value)}/>

              <button type='submit' className='--btn --btn-primary --btn-block'>Reset Password</button>

              <div className={`${styles.links} `}>
                <p><Link to='/login'>Login</Link></p>
                <p><Link to='/register'>Register</Link></p>
              </div>
            </form>

          </div>
        </Card>

      </section>
    </>
  )
}

export default Reset
