import axios from 'axios';
import React, {  useState } from 'react';
import { toast } from 'react-toastify';
import styles from './ViewProducts.module.scss';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Loader from '../../loader/Loader'
import Notiflix from 'notiflix';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../../redux/slices/adminSlice';

const ViewProducts = () => {

  const [ isLoading, ] = useState(false)


  const confirmDelete = async (id) => {
    Notiflix.Confirm.show(
      'Warning',
      `You're about to unactive this product`,
      'Unactive',
      'Cancel',
      function okCb() {
        deleteProduct(id)
        toast.success('The product is not active anymore')
      },
      function cancelCb() {
        toast.success('Changed your mind ? :)')
      },
      {
        width: '320px',
        borderRadius: '8px',
        titleColor: 'red',
        okButtonBackground: 'red',
        cssAnimationStyle: 'fade'
      },
    );
  }

  const deleteProduct = async (id) => {
    // We don't delete completely the product, as we still need it for the past orders. What we do here is turning the 'active' to false, then it doesn't appear on the shop
    const productUnactive = { 'active': 'false'}
    const res = await axios.patch(`http://localhost:8888/products/updateOnePatch/${id}`, productUnactive)
    .catch(function (e) {
      if(e.response) {
      }
    })
    console.logg(res)
  }


  const categories = useSelector(selectCategories);


  return (
    <>

    {isLoading && <Loader/>}

    <div className={styles.table}>

      <hr />

      { categories.map(cat => {
        if(cat.products.length > 0) {
          return (
            <div key={cat.id}>
              <h2>{cat.title}</h2>
              <table>
                <thead>
                <tr>
                  <th>Ref</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>TVA</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Active</th>
                  <th>Stock</th>
                </tr>
                </thead>
                {cat.products.map((prod) => {
                  const { id, ref, image, title, description, priceHT, active, stock, tva} = prod;
                  return (
                    <tbody key={id}>
                      <tr>
                        <td>
                          {ref}
                        </td>
                        <td>
                          <img src={image} alt={title} style={{width: '100px'}}/>
                        </td>
                        <td>
                          {title}
                        </td>
                        <td>
                          {tva.title}
                        </td>
                        <td>
                          {description}
                        </td>
                        <td>
                          {`€ ${priceHT}`}
                        </td>
                        <td>
                          {active ? 'true' : 'false'}
                        </td>
                        <td>
                          {stock}
                        </td>
                        <td className={styles.icons}>
                          <Link to={`/admin/addProduct/${id}`}>
                            <FaEdit size={20} color='#1f93ff'/>
                          </Link>
                          &nbsp;
                          <FaTrashAlt size={20} color='red' onClick={() => confirmDelete(id)}/>
                        </td>
                      </tr>
                    </tbody>
                  )
                })}
              </table>
              <br />
            </div>
          )
        } else {
          return (
            <div key={cat.id}>
              <h3>{cat.title}</h3>
              <p>This category doesn't have any product yet</p>
            </div>
          )
        }
      })
    }
    </div>
    </>
  )
}

export default ViewProducts
