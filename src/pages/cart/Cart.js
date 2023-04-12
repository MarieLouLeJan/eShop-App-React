import React, { useEffect } from "react";
import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_CART_TOTAL,
  DECREASE_PRODUCT,
  DELETE_CART,
  DELETE_PRODUCT,
  INCREASE_PRODUCT,
  SAVE_URL,
  selectCartItem,
  selectProducts,
} from "../../redux/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import setTTC from "../../services/setTTCPrice";
import { FaTrashAlt } from "react-icons/fa";
import Card from "../../components/card/Card";
import { selectIsLoggedIn } from "../../redux/slices/authSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItem = useSelector(selectCartItem);
  const products = useSelector(selectProducts);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const url = window.location.href;

  const prods = [...products];

  const increaseCart = (id, priceHT) => {
    dispatch(
      INCREASE_PRODUCT({
        id,
        priceHT,
      })
    );
    dispatch(CALCULATE_CART_TOTAL());
  };

  const decreaseCart = (id, priceHT) => {
    dispatch(
      DECREASE_PRODUCT({
        id,
        priceHT,
      })
    );
    dispatch(CALCULATE_CART_TOTAL());
  };

  const deleteProduct = (id) => {
    dispatch(
      DELETE_PRODUCT({
        id,
      })
    );
    dispatch(CALCULATE_CART_TOTAL());
  };

  const clearCart = () => {
    dispatch(DELETE_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_CART_TOTAL());
    dispatch(SAVE_URL(""));
  }, [dispatch, url]);

  const checkout = () => {
    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/login");
    }
  };

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>

        {cartItem.quantity === 0 ? (
          <>
            <p>Your cart is empty</p>
            <br />
            <div>
              <Link to="/#product">&larr; Continue shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {prods.map((prod, index) => {
                  const { product_id, priceHT, quantity, title } = prod;
                  const priceTTC = setTTC(prod.priceHT, prod.TVA_value);
                  const totalTTC = (priceTTC * prod.quantity).toFixed(2);
                  return (
                    <tr key={index}>
                      <td>{title}</td>
                      <td>{priceTTC}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn"
                            onClick={() => decreaseCart(product_id, priceHT)}
                          >
                            -
                          </button>
                          <p>
                            <b>{quantity}</b>
                          </p>
                          <button
                            className="--btn"
                            onClick={() => increaseCart(product_id, priceHT)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{totalTTC}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={15}
                          color={"#257781"}
                          onClick={() => deleteProduct(product_id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className={styles.summary}>
              <button className="--btn --btn-danger" onClick={clearCart}>
                Clear cart
              </button>
              <div className={styles.checkout}>
                <Link to="/#products">&larr; Continue shopping</Link>
              </div>
              <br />
              <Card cardClass={styles.card}>
                <p>{`Cart item(s): ${cartItem.quantity}`}</p>
                <div className={styles.text}>
                  <h4>Subtotal:</h4>
                  <h3>{`$${cartItem.totalTTC}`}</h3>
                </div>
                <p>Shopping calculated at checkout </p>
                <button
                  className="--btn --btn-primary --btn-block"
                  onClick={checkout}
                >
                  Checkout
                </button>
              </Card>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
