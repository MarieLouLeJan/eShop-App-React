import { useEffect, useState } from 'react';
import styles from './auth.module.scss';
import Card from '../../components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useResetPasswordMutation } from '../../redux/api/authApi';
import Loader from '../../components/loader/Loader';
import { useDispatch } from 'react-redux';
import { SAVE_URL } from '../../redux/slices/cartSlice';


const Reset = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {dispatch(SAVE_URL(""))}, [dispatch]);

  const [ email, setEmail ] = useState('');
  const [ reset, { isLoading }] = useResetPasswordMutation()


  const handleSubmit = async (e) => {
    e.preventDefault();

    await reset({ email }).unwrap()
    .then((result) => {
      toast.success(`An email had been sent`)
      navigate('/')
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
