import React, { useState } from "react";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import Card from "../card/Card";
import styles from "./CheckoutForm.module.scss";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useCreateOrderMutation,
  useCreateOrderProductMutation,
  useCreateOrderTypeAdressMutation,
} from "../../redux/api/orderApi";
import {
  selectBilling,
  selectShipping,
  selectCartItem,
  selectProducts,
} from "../../redux/slices/cartSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/authSlice";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const billingAd = useSelector(selectBilling);
  const shippingAd = useSelector(selectShipping);
  const cartItems = useSelector(selectCartItem);
  const products = useSelector(selectProducts);
  const user = useSelector(selectUser);

  const [createOrder, { isLoading: orderLoading }] = useCreateOrderMutation();
  const [createOrderProduct, { isLoading: orderPLoading }] =
    useCreateOrderProductMutation();
  const [createOrderAdressType, { isLoading: orderATLoading }] =
    useCreateOrderTypeAdressMutation();

  const saveOrder = async () => {
    const body = {
      totalHT: cartItems.totalHT,
      tax: parseFloat(cartItems.tax),
      totalTTC: parseFloat(cartItems.totalTTC),
      quantity: cartItems.quantity,
      user_id: user.id,
      order_states_id: 2,
    };
    await createOrder(body)
      .unwrap()
      .then((result) => {
        const id = result.data.id;
        saveOrderProduct(id);
        saveOrderTypeAdress(id);
      })
      .catch((err) => {
        console.log(err.data.message);
      });
  };
  const saveOrderProduct = async (orderId) => {
    const orderProductBody = [];
    console.log(products[0]);
    for (const prod of products) {
      const { title, ...rest } = prod;
      orderProductBody.push(rest);
    }
    for (const prod of orderProductBody) {
      prod.order_id = orderId;
      createOrderProduct(prod)
        .unwrap()
        .then()
        .catch((err) => {
          console.log(err.data.message);
        });
    }
  };
  const saveOrderTypeAdress = async (orderId) => {
    const OTA = [];
    const ship = {
      order_id: orderId,
      adress_id: shippingAd.id,
      adress_type_id: 1,
    };
    const bill = {
      order_id: orderId,
      adress_id: billingAd.id,
      adress_type_id: 2,
    };
    OTA.push(ship, bill);
    for (const i of OTA) {
      await createOrderAdressType(i)
        .unwrap()
        .then()
        .catch((err) => {
          console.log(err.data.message);
        });
    }
  };

  useEffect(() => {
    if (!stripe) return;
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) return;
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage(null);

    if (!stripe || !elements) return;

    setLoading(true);

    await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/checkout-success",
        },
        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setLoading(false);
            saveOrder();
            toast.success("Payment successful");
            navigate("/checkout-success");
          }
        }
      });
    setLoading(false);
  };

  return (
    <>
      {(orderLoading || orderPLoading || orderATLoading) && <Loader />}
      <section>
        <div className={`container ${styles.checkout}`}>
          <h2>Checkout</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <Card cardClass={styles.card}>
                <CheckoutSummary />
              </Card>
            </div>

            <div>
              <Card cardClass={`${styles.card} ${styles.pay}`}>
                <h3>Stripe checkout</h3>

                <PaymentElement id={styles["payment-element"]} />
                <button
                  disabled={loading || !stripe || !elements}
                  id="submit"
                  className={styles.button}
                >
                  <span id="button-text">
                    {loading ? (
                      <img
                        src="/images/loader.gif"
                        alt="Loading..."
                        styles={{ width: "20px" }}
                      />
                    ) : (
                      "Pay now"
                    )}
                  </span>
                </button>

                {message && <div id={styles["payment-message"]}>{message}</div>}
              </Card>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CheckoutForm;
