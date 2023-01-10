import React, { useState } from 'react';
import styles from './auth.module.scss';
import Card from '../../components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';
import axios from 'axios';


const Register = () => {

  const [ firstname, setFirstname ] = useState('');
  const [ lastname, setLastname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ cPassword, setCPassword ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    if(password !== cPassword) {
      setIsLoading(false)
      toast.error(`Passwords don't match`);
      return
    }
    const newUser = { firstname, lastname, email, password, role_id: 1};

    setIsLoading(false)

    const res = await axios.post('http://localhost:8888/users/createOne', newUser)
    .catch(function (e) { 
      if(e.response.data.message) toast.error(e.response.data.message)})
    if(res) {
      toast.success('Your account had been created')
      navigate('/login')
    }
  }

  return (
    <>

      {isLoading && <Loader/>}

      <section className={`container ${styles.auth}`}>

        <Card>
          <div className={styles.form}>

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  placeholder="Firstname" 
                  required
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}/>
                <input 
                  type="text" 
                  placeholder="Lastname" 
                  required
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}/>
                <input type='text' 
                  placeholder='Email' 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
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
                <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>

            
            </form>

            <br />

            <div className={styles.register}>
                <Link to='/login'>Already have an account ? Login</Link>
            </div>
          </div>
        </Card>

        <div className={styles.img}>
          <img src="/images/register.png" alt="LoginImg" width='400px'/>
        </div>

      </section>
    </>
  )
}

export default Register
