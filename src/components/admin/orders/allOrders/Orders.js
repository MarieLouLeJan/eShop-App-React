import { useEffect, useState } from "react";
import styles from "./Orders.module.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAllOrdersAdminQuery } from "../../../../redux/api/orderApi";
import Loader from "../../../loader/Loader";
import setDate from "../../../../services/dateFormat";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const { data, error, isLoading } = useGetAllOrdersAdminQuery();

  useEffect(() => {
    if (data) {
      const datas = [...data.data];
      datas.sort((a, b) => {
        return a.order_states_id - b.order_states_id;
      });
      setOrders(datas);
    } else if (error) {
      console.log(error.data.message);
      toast.error("Sorry, something went wrong");
    }
  }, [data, error]);

  const handleClick = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <>
      <div className={` ${styles.order}`}>
        <h2>Orders history</h2>

        <p>
          <b>{orders.length}</b> orders
        </p>
        <br />
        <p>
          Click on the order to see the <b>details</b>
        </p>
        <br />

        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {orders.length === 0 ? (
              <p>No order found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Reference</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const { id, created_at, totalTTC, order_states, quantity } =
                      order;
                    return (
                      <tr key={id} onClick={() => handleClick(id)}>
                        <td>{setDate(created_at, "MM/dd/yyyy")}</td>
                        <td>{id}</td>
                        <td>{quantity}</td>
                        <td>€{totalTTC.toFixed(2)}</td>
                        <td>
                          <p
                            className={
                              order_states.title !== "Delivered"
                                ? `${styles.pending}`
                                : `${styles.delivered}`
                            }
                          >
                            {order_states.title}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default Orders;
