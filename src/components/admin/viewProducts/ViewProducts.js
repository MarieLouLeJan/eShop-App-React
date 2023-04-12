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

  const confirmUnactive = async (id) => {
    Notiflix.Confirm.show(
      "Warning",
      `You're about to unactive this product, it won't be on the store anymore`,
      "Unactive",
      "Cancel",
      function okCb() {
        unactive(id);
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

  const confirmActive = async (id) => {
    Notiflix.Confirm.show(
      "Warning",
      `You're about to active this product, it will appear on the store`,
      "Active",
      "Cancel",
      function okCb() {
        active(id);
      },
      function cancelCb() {
        toast.success("Changed your mind ? :)");
      },
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "red",
        okButtonBackground: "green",
        cssAnimationStyle: "fade",
      }
    );
  };

  const unactive = async (id) => {
    // We don't want to delete completely the product, as we still need it for the past orders. What we do here is turning the 'active' to false, then it doesn't appear on the shop
    const myBody = { body: { active: "false" }, id };

    await updateProduct(myBody)
      .unwrap()
      .then((result) => {
        toast.success(`${result.data.title} is now unactive !`);
      })
      .catch((err) => {
        console.log(err.data.message);
        toast.error("Sorry something went wrong");
      });
  };

  const active = async (id) => {
    const myBody = { body: { active: "true" }, id };

    await updateProduct(myBody)
      .unwrap()
      .then((result) => {
        toast.success(`${result.data.title} is now unactive !`);
      })
      .catch((err) => {
        console.log(err.data.message);
        toast.error("Sorry something went wrong");
      });
  };

  useEffect(() => {
    if (isCatSuccess) {
      // catData.data.map(cat => cat.products.sort((a, b) => b.active - a.active))
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
                      ref,
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
                          <td>{ref}</td>
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
                                onClick={() => confirmUnactive(id)}
                              />
                            ) : (
                              <TbTrashOff
                                size={20}
                                color="green"
                                onClick={() => confirmActive(id)}
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
