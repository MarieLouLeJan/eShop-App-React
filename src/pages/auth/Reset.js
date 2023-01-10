import React, { useState } from 'react';
import styles from './auth.module.scss';
import Card from '../../components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Reset = () => {

  const [ email, setEmail ] = useState('');

  const navigate = useNavigate()

  const resetPassword = async (e) => {
    e.preventDefault();

    const res = await axios.patch('http://localhost:8888/reset-password', { email })
    .catch(function (e) {toast.error(e.response.data.message)})

    if(res) {
      toast.success('Your account had been created')
      navigate('/login')
    }
  }
  
  return (

    <section className={`container ${styles.auth}`}>

      <div className={styles.img}>
        <img src="/images/forgot.png" alt="LoginImg" width='400px'/>
      </div>

      <Card>
        <div className={styles.form}>

          <h2>Reset Password</h2>

          <form onSubmit={resetPassword}>
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
  )
}

export default Reset
