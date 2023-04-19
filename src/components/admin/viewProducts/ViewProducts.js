import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./ViewProducts.module.scss";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { TbTrash, TbTrashOff } from "react-icons/tb";
import Loader from "../../loader/Loader";
import Notiflix from "notiflix";
import {
  useGetCategoriesAdminQuery,
  useUpdateProductPatchMutation,
} from "../../../redux/api/shopApi";

const ViewProducts = () => {
  const [categories, setCategories] = useState([]);

  const {
    data: catData,
    isSuccess: isCatSuccess,
    isError: isCatError,
    error: catError,
    isLoading: isCatLoading,
  } = useGetCategoriesAdminQuery();

  const [updateProduct, { isProdLoading }] = useUpdateProductPatchMutation();

  const confirmToggleProduct = async (id, catId) => {
    Notiflix.Confirm.show(
      "Warning",
      "You're about to change the status of this product",
      "Ok",
      "Cancel",
      function okCb() {
        toggleActive(id, catId);
      },
      function cancelCb() {
        toast.success("Changed your mind ? :)");
      },
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "red",
        okButtonBackground: "red",
        cssAnimationStyle: "fade",
      }
    );
  };

  const toggleActive = async (id, catId) => {
    // We don't want to delete completely the product, as we still need it for the past orders. What we do here is turning the 'active' to false, then it doesn't appear on the shop
    let myBody;
    let category = categories.find((cat) => cat.id === catId);
    let product = category.products.find((prod) => prod.id === id);
    product.active
      ? (myBody = { body: { active: "false" }, id })
      : (myBody = { body: { active: "true" }, id });
    await updateProduct(myBody)
      .unwrap()
      .then((result) => {
        product.active
          ? toast.success(`${result.data.title} is now unactive !`)
          : toast.success(`${result.data.title} is now active !`);
      })
      .catch((err) => {
        console.log(err.data.message);
        toast.error("Sorry something went wrong");
      });
  };

  useEffect(() => {
    if (isCatSuccess) {
      setCategories(catData.data);
    } else if (isCatError) {
      console.log(catError.data.message);
    }
  }, [catData, catError, isCatError, isCatSuccess]);

  return (
    <>
      {(isCatLoading || isProdLoading) && <Loader />}

      <div className={styles.table}>
        <hr />

        {categories.map((cat) => {
          if (cat.products.length > 0) {
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
                    const {
                      id,
                      reference,
                      image,
                      title,
                      description,
                      priceHT,
                      active,
                      stock,
                      tva,
                    } = prod;
                    return (
                      <tbody key={id}>
                        <tr>
                          <td>{reference}</td>
                          <td>
                            <img
                              src={image}
                              alt={title}
                              style={{ width: "100px" }}
                            />
                          </td>
                          <td>{title}</td>
                          <td>{tva.title}</td>
                          <td>{description}</td>
                          <td>${priceHT}</td>
                          <td>{active ? "true" : "false"}</td>
                          <td>{stock}</td>
                          <td className={styles.icons}>
                            <Link to={`/admin/addProduct/${id}`}>
                              <FaEdit size={20} color="#1f93ff" />
                            </Link>
                            &nbsp;
                            {active ? (
                              <TbTrash
                                size={20}
                                color="red"
                                onClick={() => confirmToggleProduct(id, cat.id)}
                              />
                            ) : (
                              <TbTrashOff
                                size={20}
                                color="green"
                                onClick={() => confirmToggleProduct(id, cat.id)}
                              />
                            )}
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
                <br />
              </div>
            );
          } else {
            return (
              <div key={cat.id}>
                <h3>{cat.title}</h3>
                <p>This category doesn't have any product yet</p>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default ViewProducts;
