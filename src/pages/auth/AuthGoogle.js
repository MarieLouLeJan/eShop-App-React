import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { SET_ACTIVE_USER, SET_IS_ADMIN } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';


function AuthGoogle() {


    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        const handleLogIn = async () => {
        const res = await axios.get('http://localhost:8888/auth/me', {
            withCredentials: true,
        })
            .catch(function (e) {
                if(e.response) {
                    toast.error(e.response.data.message)
                    navigate('/login')
                }
            })
            if(res) {
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
        handleLogIn()
    }, [navigate, dispatch])


  return (
    <div>
      
    </div>
  )
}

export default AuthGoogle
