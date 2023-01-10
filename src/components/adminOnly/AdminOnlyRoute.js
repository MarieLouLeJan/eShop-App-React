import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIsAdmin } from '../../redux/slices/authSlice';


export const AdminOnlyRoute = ({ children }) => {

    const isAdmin = useSelector(selectIsAdmin)

    if( isAdmin  ) {
        return children
    }

  return (
    <section style={{height: '80vh'}}>
      <div className="container">
        <h2>
          Permission denied
        </h2>
        <p>
          This page can only be viewed by an admin
        </p>
        <br />
        <Link to='/'>
          <button className='--btn'>
            &larr; Back to home
          </button>
        </Link>
      </div>
    </section>
  )
}

export const AdminOnlyLink = ({ children }) => {

  const isAdmin = useSelector(selectIsAdmin)

  if( isAdmin ) {
      return children
  }

  return null
}

