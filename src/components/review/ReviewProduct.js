import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import { toast } from "react-toastify";
import {
  useCreateProductReviewMutation,
  useGetOneProductShopQuery,
} from "../../redux/api/shopApi";
import { selectUser } from "../../redux/slices/authSlice";
import Card from "../card/Card";
import Loader from "../loader/Loader";
import styles from "./ReviewProduct.module.scss";

const ReviewProduct = () => {
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const { param } = useParams();

  const [product, setProduct] = useState({});
  const [rate, setRate] = useState(null);
  const [review, setReview] = useState("");

  const { data, error, isLoading } = useGetOneProductShopQuery(parseInt(param));

  useEffect(() => {
    if (data) setProduct(data.data);
    if (error) toast.error("Sorry, something went wrong");
  }, [data, error]);

  const [addReview, { isLoading: addIsLoading }] =
    useCreateProductReviewMutation();

  const SubmitReview = async (e) => {
    e.preventDefault();

    if (review.length < 10) {
      toast.error("Your review must contain at least 10 characters");
      return;
    }

    const body = {
      product_id: product.id,
      user_id: user.id,
      note: rate,
      content: review,
    };
    await addReview(body)
      .unwrap()
      .then((result) => {
        toast.success(`Thanks for your review !`);
        navigate(`/product-details/${param}`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.data.message);
      });
  };

  return (
    <div>
      {(isLoading || addIsLoading) && <Loader />}

      <div className={`container ${styles.review}`}>
        <h2>Let a review</h2>

        <Card cardClass={styles.card}>
          <div className={styles["img-div"]}>
            <p>
              <b>{product.title}</b>
            </p>
            <img
              src={product.image}
              alt={product.title}
              className={styles.img}
            />
          </div>

          <form onSubmit={(e) => SubmitReview(e)}>
            <label>Rating:</label>
            <StarsRating
              value={rate}
              allowHalf={false}
              onChange={(value) => {
                setRate(value);
              }}
            />

            <label>Rating:</label>
            <textarea
              value={review}
              id=""
              cols="30"
              rows="10"
              required
              onChange={(e) => setReview(e.target.value)}
            ></textarea>

            <button type="submit" className="--btn --btn-primary">
              Send your review
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ReviewProduct;
