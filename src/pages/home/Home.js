import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Product from '../../components/product/Product'
import { SAVE_URL } from '../../redux/slices/cartSlice'
import Slider from '../../components/slider/Slider'


const Home = () => {
  
  const dispatch = useDispatch()
  useEffect(() => {dispatch(SAVE_URL(""))}, [dispatch]);

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
      <Slider/>

      <div id='product-section'>
        <Product />
      </div>

    </div>
  )
}

export default Home
