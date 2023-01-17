import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.scss';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle } from 'react-icons/ai';
import Card from '../../components/card/Card';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { useDispatch } from 'react-redux';
import { SET_ACTIVE_USER, SET_IS_ADMIN } from '../../redux/slices/authSlice';
import { useLoginMutation } from '../../redux/api/authApi';

const googleURL = process.env.REACT_APP_GOOGLE_URL

const Login = () => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ showPassword, setShowPassword ] = useState(false);

  const [ loginUser, { isLoading } ] = useLoginMutation()

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(email && password) {
      await loginUser({email, password})
    }

    await loginUser({email, password}).unwrap()
    .then((result) => {
      dispatch(
        SET_ACTIVE_USER({
          isLoggedIn: true,
          user: result.user,
          JWT: result.token
        })
      )
      if(result.user.roles.id === 2) {
        SET_IS_ADMIN({
          isAdmin: true
        })
      }
      toast.success(`You're logged in`)
      navigate('/')
      console.log(result)
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
