import { useEffect } from 'react'
import Product from '../../components/product/Product'
// import Slider from '../../components/slider/Slider'


const Home = () => {
  
  useEffect(() => {
    const url = window.location.href

    const executeScroll = () => {
  
      const elem = document.getElementById('product-section');
      if (url.includes('#products')) {
        elem.scrollIntoView({
        behavior: 'smooth',
      })
      } 
    }
    executeScroll()
  }, [])


  return (
    <div>
      {/* <Slider/> */}

      <div id='product-section'>
        <Product />
      </div>

    </div>
  )
}

export default Home
