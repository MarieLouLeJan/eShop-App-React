import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOneProductShopQuery,
  useGetReviewByProductQuery,
} from "../../../redux/api/shopApi";
import Loader from "../../loader/Loader";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../../redux/slices/cartSlice";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { param } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [tva, setTva] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rate, setRate] = useState(null);

  const { data: reviewData } = useGetReviewByProductQuery(parseInt(param));

  const { data, isLoading, isError } = useGetOneProductShopQuery(
    parseInt(param)
  );

  const priceTTC = (HT, TVA) => {
    HT = parseFloat(HT);
    let totalTTC = HT * TVA + HT;
    return totalTTC.toFixed(2);
  };

  useEffect(() => {
    if (data) {
      setProduct({
        ...data.data,
        priceTTC: priceTTC(data.data.priceHT, data.data.tva.value),
      });
      setTva(data.data.tva.title);
    } else if (isError) toast.error("Product not found");
    if (reviewData) {
      setReviews(reviewData.data);
      let rates = 0;
      for (const rev of reviewData.data) rates += rev.note;
      setRate(rates / reviewData.data.length);
    }
  }, [data, isError, reviewData]);

  const changeQuantity = (action) => {
    let q = quantity;
    if (action === "-" && q > 0) {
      q -= 1;
    } else if (action === "+") {
      q += 1;
    }
    setQuantity(q);
  };

  const addToCart = () => {
    dispatch(
      ADD_TO_CART({
        myProduct: {
          id: product.id,
          priceHT: product.priceHT,
          TVA_title: product.tva.title,
          TVA_value: product.tva.value,
          title: product.title,
        },
        quantity,
      })
    );
  };

  return (
    <>
      {isLoading && <Loader />}

      <section>
        <div className={`container ${styles.product}`}>
          <h2>Details</h2>
          <div>
            <Link to="/#products">&larr; Back to shop</Link>
          </div>

          {product === null ? (
            <p>Something went wrong</p>
          ) : (
            <>
              <div className={styles.details}>
                <div className={styles.img}>
                  <img src={product.image} alt={product.title} />
                </div>
                <div className={styles.content}>
                  <h3>{product.title}</h3>
                  <p className={styles.price}>€{product.priceTTC}</p>
                  <p>{product.description}</p>
                  {rate !== null && <StarsRating value={rate} />}
                  <p>
                    <b>TVA</b> {tva}
                  </p>
                  {product.stock === 0 ? (
                    <p>This product is not available</p>
                  ) : (
                    <div>
                      <div className={styles.count}>
                        <button
                          className="--btn"
                          onClick={() => changeQuantity("-")}
                        >
                          -
                        </button>
                        <p>
                          <b>{quantity}</b>
                        </p>
                        <button
                          className="--btn"
                          onClick={() => changeQuantity("+")}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="--btn --btn-primary"
                        onClick={addToCart}
                      >
                        Add to cart
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <Card cardClass={styles.card}>
            <h3>Reviews</h3>
            <div>
              {reviews.length === 0 ? (
                <p>No reviews for this product yet.</p>
              ) : (
                <>
                  {reviews.map((review, index) => {
                    const { content, note, user } = review;
                    return (
                      <div key={index} className={styles.review}>
                        <StarsRating value={note} />
                        <p>{content}</p>
                        <br />
                        <span>
                          <b>By: </b> {user.firstname}
                        </span>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
