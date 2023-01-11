import axios from 'axios'
import { useEffect, useState } from 'react'
import { STORE_CATEGORIES } from '../redux/slices/shopSlice'

const useFetchCollection = (collectionName) => {

    const [ data, setData ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)


    const getCollection = async ({collectionName}) => {
        setIsLoading(true)

        const res = await axios.get(`${process.env.REACT_APP_API_ROOT_URL}/${collectionName}/getAllShop`)

        .catch(function (e) {
          if(e.response) {
            setIsLoading(false)
            console.log(e.response.data.message)
          }
        })
        setIsLoading(false)
        const data = res.data.data
        console.log(data)
        setData(data)
    }

    useEffect(() => {
        getCollection()
    }, []);

    return { data, isLoading }
}

export default useFetchCollection
