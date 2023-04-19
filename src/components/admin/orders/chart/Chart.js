import { useEffect, useState } from "react";
import styles from "./Chart.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import Card from "../../../card/Card";
import {
  useGetAllOrdersAdminQuery,
  useGetAllOrderStatesQuery,
} from "../../../../redux/api/orderApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
};

const Chart = () => {
  const [labels, setLabels] = useState([]);
  const [ordersCount, setOrdersCount] = useState([]);

  const { data: OSData } = useGetAllOrderStatesQuery();

  const { data: ordersData } = useGetAllOrdersAdminQuery();

  useEffect(() => {
    if (OSData && ordersData) {
      const datas = [...OSData.data];
      datas.sort((a, b) => a.id - b.id);
      let labs = [];
      datas.forEach((status) => labs.push(status.title));
      setLabels(labs);
      let statusOrderArray = [];
      ordersData.data.forEach((order) =>
        statusOrderArray.push(order.order_states.title)
      );
      setOrdersCount(statusOrderArray);
    }
  }, [OSData, ordersData]);

  const getCount = (arr, value) => arr.filter((n) => n === value).length;

  const [q1, q2, q3, q4, q5] = labels;

  let placed = getCount(ordersCount, q1);
  let processing = getCount(ordersCount, q2);
  let shipped = getCount(ordersCount, q3);
  let delivered = getCount(ordersCount, q4);
  let cancelled = getCount(ordersCount, q5);

  const data = {
    labels,
    datasets: [
      {
        label: "Order count",
        data: [placed, processing, shipped, delivered, cancelled],
        backgroundColor: "rgba(209, 157, 252, 0.5)",
      },
    ],
  };

  return (
    <div className={styles.charts}>
      <Card cardClass={styles.card}>
        <Bar options={options} data={data} />
      </Card>
    </div>
  );
};

export default Chart;
