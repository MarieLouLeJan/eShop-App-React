import { useEffect, useRef } from 'react'
import Product from '../../components/product/Product'
import Slider from '../../components/slider/Slider'


const Home = () => {
  
  const url = window.location.href

  const myRef = useRef(null)
  const executeScroll = () => {

    const elem = document.getElementById('product-section');
    if (url.includes('#products')) {
      elem.scrollIntoView({
      behavior: 'smooth',
    })
    } 
  }

  useEffect(() => {
    executeScroll()
  }, [])



  return (
    <div>
      <Slider/>
      <div id='product-section'>
        <Product />
      </div>

    </div>
  )
}

export default Home
