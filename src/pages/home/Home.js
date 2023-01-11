import { useDispatch } from 'react-redux';
import { STORE_CATEGORIES } from '../../redux/slices/shopSlice';
import Product from '../../components/product/Product'
import { useGetCategoriesQuery } from '../../redux/api/shopApi';

// import Slider from '../../components/slider/Slider'


const Home = () => {

  const dispatch = useDispatch();

  const {
    data,
    isSuccess,
    isError,
    error
  } = useGetCategoriesQuery();

  if (isSuccess) {
    dispatch(
      STORE_CATEGORIES({
        categories: data.data
      })
    )
  } else if (isError) {
    console.log(error)
  }

  
  return (
    <div>
      {/* <Slider/> */}
      <Product/>
    </div>
  )
}

export default Home
