import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NotFound.module.scss'

const NotFound = () => {
  return (
    <div className={styles['not-found']}>
        <div>
            <h2>404</h2>
            <p>Ouppppsssss, page not found, sorry ...</p>
            <button className='--btn --btn-primary'>
                <Link to='/'>
                    &larr; Back to Home
                </Link>
            </button>
        </div>
    </div>
  )
}

export default NotFound
