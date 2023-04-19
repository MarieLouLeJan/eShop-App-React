import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCreatePaymentMutation } from "../../redux/api/checkoutApi";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import { selectCartItem, selectShipping } from "../../redux/slices/cartSlice";
import { selectUser } from "../../redux/slices/authSlice";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const shippingAd = useSelector(selectShipping);
  const cartItems = useSelector(selectCartItem);
  const user = useSelector(selectUser);

  const [message, setMessage] = useState("Initializing checkout...");
  const [clientSecret, setClientSecret] = useState("");

  const [createPayment] = useCreatePaymentMutation();

  useEffect(() => {
    const {
      number,
      number_complement,
      street,
      postal_code,
      country,
      complement,
      city,
    } = shippingAd;

    const shipping = {
      line1: `${number} ${number_complement} ${street}`,
      line2: `${complement}`,
      city: `${city}`,
      country: `${country}`,
      postal_code: `${postal_code}`,
    };

    const paymentHandler = async () => {
      const body = {
        user,
        shipping,
        totalAmount: cartItems.totalTTC,
        description: `mLou eShop paiement; email: ${process.env.REACT_APP_ADMIN_USER}, Amount: ${cartItems.totalTTC}`,
      };
      await createPayment(body)
        .unwrap()
        .then((result) => {
          setClientSecret(result.clientSecret);
        })
        .catch((err) => {
          console.log(err);
          setMessage("Failed to initialize checkout");
          toast.error("Sorry, something went wrong");
        });
    };
    paymentHandler();
  }, [cartItems.totalTTC, user, shippingAd, createPayment]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>

      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
