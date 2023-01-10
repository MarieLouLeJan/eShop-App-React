import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.scss';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle } from 'react-icons/ai';
import Card from '../../components/card/Card';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SET_ACTIVE_USER, SET_IS_ADMIN } from '../../redux/slices/authSlice';

const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A8888%2Fauth%2Fgoogle&client_id=563664428847-bvae1h3ccoke4a4qp32kb0il3i8228ch.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email`

const Login = () => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  const [ showPassword, setShowPassword ] = useState(false);

  const dispatch = useDispatch()

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  };


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("coucou")

    setIsLoading(true)

    const user = { email, password };

    console.log("coucou")

    const res = await axios.post('http://localhost:8888/users/login', user)
    .catch(function (e) {
      if(e.response) {
        setIsLoading(false)
        toast.error(e.response.data.message)
      }
    })

    console.log(res.data)
    console.log("coucou")

    if(res) {
      console.log(res.data.user)
      setIsLoading(false)
      dispatch(SET_ACTIVE_USER({
        isLoggedIn: true,
        user: res.data.user,
        JWT: res.data.token
      }))
      if(res.data.user.roles.id === 2) {
        dispatch(SET_IS_ADMIN({
          isAdmin: true
        }))
      }
    
      toast.success(`You're now connected`)
      navigate('/')
    }
  } 

  return (

    <>

      {isLoading && <Loader/>}

      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src="/images/login.png" alt="LoginImg" width='400px'/>
        </div>

        <Card>
          <div className={styles.form}>

            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input 
                type='text' 
                placeholder='Email' 
                required
                onChange={(e) => setEmail(e.target.value)}/>
                <div className={styles.password}>
                <input 
                type={showPassword? ('text') : ('password')} 
                placeholder='password'
                required
                onChange={(e) => setPassword(e.target.value)}/>
                <span className={styles.icon} onClick={handleTogglePassword}>
                  { showPassword? <AiOutlineEyeInvisible size={20}/> : <AiOutlineEye size={20}/> }
                </span> 
                </div>
                <button type='submit' className='--btn --btn-primary --btn-block' >Login</button>
            </form>

            <br />
            <button className='--btn --btn-danger --btn-block' >
              <a href={googleURL}>
                <AiOutlineGoogle color='#fff'/>Login with Google
              </a>
            </button>

            <div className={styles.register}>
                <Link to='/register'>Don't have an account ? Register</Link>
            </div>
            <div className={styles.register}>
                <Link to='/reset'>Forgot your password ? Reset password</Link>
            </div>
          </div>
        </Card>
      </section>
    </>
  )
}

export default Login
