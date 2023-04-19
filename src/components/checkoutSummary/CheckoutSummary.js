import React from "react";
import styles from "./CheckoutSummary.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartItem, selectProducts } from "../../redux/slices/cartSlice";
import setTTC from "../../services/setTTCPrice";
import Card from "../card/Card";

const CheckoutSummary = () => {
  const cartItem = useSelector(selectCartItem);
  const products = useSelector(selectProducts);

  return (
    <div>
      <h3>Cart summary</h3>
      <div>
        {(products.length !== 0 || cartItem.quantity !== 0) && (
          <div className={styles.summary}>
            <p>{`Cart item(s): ${cartItem.quantity}`}</p>

            <div className={styles.text}>
              <h4>Subtotal</h4>
              <h3>€ {cartItem.totalTTC}</h3>
            </div>

            {products.map((prod) => {
              const { product_id, TVA_value, priceHT, quantity, title } = prod;
              const priceTTC = setTTC(priceHT, TVA_value);
              return (
                <Card cardClass={styles.card} key={product_id}>
                  <h4>Product: {title}</h4>
                  <p>Quantity: {quantity}</p>
                  <p>Unit price: € {priceTTC}</p>
                  <p>Total price: € {(priceTTC * quantity).toFixed(2)}</p>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
