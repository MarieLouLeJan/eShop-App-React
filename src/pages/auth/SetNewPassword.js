import React, { useState } from 'react';
import styles from './auth.module.scss';
import Card from '../../components/card/Card';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSetNewPasswordMutation } from '../../redux/api/authApi';
import Loader from '../../components/loader/Loader';

const SetNewPassword = () => {

  const [ password, setPassword ] = useState('');
  const [ cPassword, setCPassword ] = useState('');

  const params = useParams()
  const token = params.token;

  const [ reset, { isLoading } ] = useSetNewPasswordMutation(token)

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== cPassword) {
      toast.error(`Passwords don't match`);
      return
    }
    await reset()

    await reset().unwrap()
    .then((result) => {
      toast.success(`You're password had been updated, you can sign in !`)
      navigate('/login')
    })
    .catch((err) => {
      toast.error('Something went wrong, please try again later')
    })
  }


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
    </>
  )
}

export default SetNewPassword
