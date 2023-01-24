import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/slices/authSlice';


export const ShowOnLogin = ({ children }) => {

    const isLoggedIn = useSelector(selectIsLoggedIn);
    // const user = useSelector(selectUser);
    // const jwt = useSelector(selectJWT);

    // console.log(jwt)

    if (isLoggedIn) return children

  return null
};

export const ShowOnLogout = ({ children }) => {

  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) return children

  return null
};