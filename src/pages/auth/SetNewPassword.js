import React, { useState } from 'react';
import styles from './auth.module.scss';
import Card from '../../components/card/Card';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const SetNewPassword = () => {

  const [ password, setPassword ] = useState('');
  const [ cPassword, setCPassword ] = useState('');
  const navigate = useNavigate();

  const params = useParams()
  const token = params.token;


  const resetPassword = async (e) => {
    e.preventDefault();
    if(password !== cPassword) {
      toast.error(`Passwords don't match`);
      return
    }

    const res = await axios.patch(`http://localhost:8888/reset-password/${token}`, { password })
    .catch(function (e) {toast.error(e.response.data.message)})

    if(res) {
      toast.success(res.data.message)
      navigate('/login')
    }

    // try {
    //   let res = await fetchResetPassword({password});
    //   toast.success(res.message)
    //   navigate('/login')
    // } catch(e) {
    //   toast.error(e.msg, e.status)
    // }
  }

  // const fetchResetPassword = async (body) => {
  //   const res = await fetch(`http://localhost:8888/reset-password/${token}`, {
  //     method: 'PATCH',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify(body)
  //   });
  //   if(!res.ok) {
  //     const error = await res.json()
  //     throw {msg: error.message, status: error.status};
  //   }
  //   const data = await res.json()
  //   return data
  // }
  
  return (

    <section className={`container ${styles.auth}`}>

      <div className={styles.img}>
        <img src="/images/forgot.png" alt="LoginImg" width='400px'/>
      </div>

      <Card>
        <div className={styles.form}>

          <h2>Reset Password</h2>
          <form onSubmit={resetPassword}>
            <input type='password' 
                    placeholder='Password' 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                    <input type="password" 
                    placeholder="Confirm Password" 
                    name="passwordConfirm" 
                    required
                    value={cPassword}
                    onChange={(e) => setCPassword(e.target.value)}/>

                <button type='submit' className='--btn --btn-primary --btn-block'>
                    Reset Password
                </button>
          </form>

        </div>
      </Card>

    </section>
  )
}

export default SetNewPassword