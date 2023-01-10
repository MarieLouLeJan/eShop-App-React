import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './AddProduct.module.scss';
import Card from '../../card/Card';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { selectCategories, selectTva, selectProducts } from '../../../redux/slices/adminSlice';

const initialState = {
  ref: '',
  title: '',
  description: '',
  image: '',
  priceHT: 0,
  stock: 0,
  category_id: 0,
  tva_id: 0
}

const AddProduct = () => {

  const { id } = useParams()

  const navigate = useNavigate()

  const products =  (useSelector(selectProducts, shallowEqual))
  const productEdit = products.find(prod => prod.id === parseInt(id))

  const detectForm = (id, f1, f2) => {
    if(id === 'ADD') {
      return f1;
    }
    return f2
  }

  const [ product, setProduct ] = useState(() => {
    const newState = detectForm(id,
      {...initialState},
      productEdit
      )
      return newState
  })

  const TVA = useSelector(selectTva)
  const categories = useSelector(selectCategories)

  const handleInputChange = (e) => {
    const { name, type, value } = e.target;

    setProduct({ ...product, [ name ]: value })

    setProduct(product => {
      const BProduct = { ...product }
      if(type === 'number') {
          BProduct[name] = Number(value)
      } else if (name.includes('_id')){
        BProduct[name] = Number(value)
      } else {
        BProduct[name] = value
      }
      return BProduct
    })
  }

  const createProduct = async (product) => {
    const res = await axios.post('http://localhost:8888/products/createOne', product)
    .catch(function (e) {
      if(e.response.data.message) toast.error(e.response.data.message)})
    if(res) {
      toast.success(`${res.data.newProduct.title} has been created !`)
      navigate('/admin/allProducts')
    }
  }

  const addProduct = (e) => {
    e.preventDefault()
    createProduct(product)
  }

  const updateProduct = async () => {
    const { id, created_at, categories, product_reviews, tva, ...productToEdit } = product 
    const res = await axios.put(`http://localhost:8888/products/updateOnePut/${id}`, productToEdit)
    .catch(function (e) {
      if(e.response.data.message) toast.error(e.response.data.message)})
    if(res) {
      toast.success(`${res.data.product.title} has been created !`)
      navigate('/admin/allProducts')
    }
  }

  const editProduct = (e) => {
    e.preventDefault();
    updateProduct()
  } 


  return (
    <div className={styles.product}>

      <h2>{detectForm(id, 'Add new product', 'Edit Product')}</h2>

      <Card cardClass={styles.card}>
        <form action="" onSubmit={detectForm(id, addProduct, editProduct)}>

        <label>Product Reference :</label>
        <input 
            type="text" 
            placeholder='123ABC0000'
            required
            name='ref'
            value={product.ref}
            onChange={(e) => handleInputChange(e)}/>

          <label>Product title :</label>
          <input 
            type="text" 
            placeholder='oPhone X'
            required
            name='title'
            value={product.title}
            onChange={(e) => handleInputChange(e)}/>

          <label>Product image :</label>
          <input 
            type="url" 
            placeholder='Product url image'
            required
            name='image'
            value={product.image}
            onChange={(e) => handleInputChange(e)}/>

          <label>Product price :</label>
          <input 
            type="number" 
            placeholder='Product price HT'
            required
            name='priceHT'
            value={product.priceHT}
            onChange={(e) => handleInputChange(e)}/>

          <label>Product stock :</label>
          <input 
            type="number" 
            placeholder='Product stock'
            required
            name='stock'
            value={product.stock}
            onChange={(e) => handleInputChange(e)}/>

          
          <label htmlFor="tva_select">Product TVA :</label>
          <select 
            name='tva_id'
            id='tva_select'
            required
            onChange={(e) => handleInputChange(e)}>
              <option autoFocus> 
                -- choose TVA --
              </option>
              { TVA.map(t => {
                const { title, id } = t
                return <option key={id} value={ id }>{ title }</option>
              }) }
          </select>

          <label htmlFor="cat_select">Product category :</label>
          <select 
            name='category_id'
            id='cat_id'
            onChange={(e) => handleInputChange(e)}>
              <option value="" autoFocus > -- choose category --</option>

              { categories.map(cat => {
                const { id, title } = cat
                return <option key={id} value={id}>{ title }</option>
              }) }
          </select>

          <label>Product description :</label>
          <textarea 
            name='description' 
            placeholder='Product description'
            required
            cols='30'
            rows='10'
            value={product.description}
            onChange={(e) => handleInputChange(e)}/>


          <button className='--btn --btn-primary'>{detectForm(id, 'Create product', 'Edit Product')}</button>
            
        </form>
      </Card>
      
    </div>
  )
}

export default AddProduct
