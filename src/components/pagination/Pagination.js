import styles from './Pagination.module.scss'

const Pagination = ({ currentPage, setCurrentPage, productsPerPage, totalProducts}) => {

  const pageNumbers = []

  const totalPages =  totalProducts / productsPerPage
  
  // Paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Go to the next page
  const paginateNext = () => {
    setCurrentPage(currentPage +1)
  }

  // Go to the previous page
  const paginatePrev = () => {
    setCurrentPage(currentPage -1)
  }

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <ul className={pageNumbers.length === 0 ? `${styles.hidden}` : `${styles.pagination}`}>
      
      <li onClick={paginatePrev} className={currentPage === 1 ? `${styles.hidden}`: null}>Prev</li>

      {pageNumbers.map(p => {
        if(p >= currentPage - 1 && p <= currentPage + 1){
          return (
            <li key={p} 
                onClick={() => paginate(p)}
                className={currentPage === p ? `${styles.active}` : null}
                >{p}</li>)
          }
          return null
      })}

      <li onClick={paginateNext} className={currentPage === pageNumbers.length + 1 ? `${styles.hidden}` : null}>Next</li>

      <p>
        <b className={styles.page}>{`Page ${currentPage}`}</b>
        <span>{` of `}</span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>

    </ul>
  )
}

export default Pagination
