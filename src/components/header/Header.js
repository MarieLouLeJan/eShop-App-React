import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_ACTIVE_USER, REMOVE_IS_ADMIN, selectIsLoggedIn, selectUser } from '../../redux/slices/authSlice';
import { ShowOnLogin, ShowOnLogout } from '../hidden/Hidden';
import { AdminOnlyLink } from '../adminOnly/AdminOnlyRoute';
import { selectCartItem } from '../../redux/slices/cartSlice';



const logo = (        
  <div className={styles.logo}>
    <Link to='/'>
      <h2>e<span>Shop</span>.</h2>
    </Link>
  </div>
);




const Header = () => {

  const [ displayName, setDisplayName ] = useState('')
  const [ showMenu, setShowMenu ] = useState(false);
  const [ scrollPage, setScrollPage ] = useState(false)

  const dispatch = useDispatch();

  const cartItem = useSelector(selectCartItem)
  const cartQuantity = cartItem.quantity

  const cart = (
    <span className={styles.cart}>
      <Link to='/cart'>
        <AiOutlineShoppingCart size={18}/>
        <p>{cartQuantity}</p>
      </Link>
    </span>
  );

  const fixNavBar = () => {
    if(window.scrollY > 40) setScrollPage(true)
    else setScrollPage(false)
  }
  window.addEventListener('scroll', fixNavBar)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  };

  const hideMenu = () => {
    setShowMenu(false)
  };

  const logoutUser = () => {
    dispatch(REMOVE_ACTIVE_USER({
      isLoggedIn: false,
      user: null,
      JWT: null,
    }))
    dispatch(REMOVE_IS_ADMIN({
      isAdmin: false
    }))
    setDisplayName('')
    toast.success(`You're now logged out`);
  }

  const user = useSelector(selectUser);
  const isActive = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if(user) {
      setDisplayName(user.firstname)
    }
  }, [user]);

  const activeLink = (() => isActive ? `${styles.active}` : '')

  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>

      <div className={styles.header}>
        { logo }

        <nav className={showMenu ? `${styles['show-nav']}` : `${styles['hide-nav']}`}>
          <div 
            className={showMenu 
              ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}` 
              : `${styles['nav-wrapper']}`
            }
            onClick={hideMenu}></div>
            
            <ul onClick={hideMenu}>
              <li className={styles['logo-mobile']}>{logo} <FaTimes size={22} color='#fff' onClick={hideMenu}/></li>

              <li>
                <AdminOnlyLink>
                  <Link to='/admin/home'>
                    <button className='--btn --btn-primary' >Admin</button>
                  </Link>
                </AdminOnlyLink>
              </li>

              <li>
                <NavLink to='/' className={activeLink}>Home</NavLink>
              </li>

              <li>
                <NavLink to='/contact-us' className={activeLink}>Contact Us</NavLink>
              </li>
            </ul>

            <div className={styles['header-right']} onClick={hideMenu}>
              <span className={styles.links}>

                <ShowOnLogout>
                  <NavLink 
                  to='/login' 
                  className={activeLink}>
                    Login
                  </NavLink>
                  <NavLink 
                  to='/register' 
                  className={activeLink}>
                    Register
                  </NavLink>
                </ShowOnLogout>

                <ShowOnLogin>
                  <a href="#home" style={{color: '#257781'}}>
                    <AiOutlineUser size={16}/>
                    Hi {displayName}
                  </a>
                  <NavLink 
                  to='/dasboard' 
                  className={activeLink}>
                    Dashboard
                  </NavLink>

                  <NavLink 
                  to='/' 
                  className={activeLink}
                  onClick={logoutUser}>
                    Logout
                  </NavLink>
                </ShowOnLogin>


              </span>
              {cart}
            </div>

        </nav>
        
        <div className={styles['menu-icon']}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}/>
        </div>

      </div>

    </header>
  )
}

export default Header
