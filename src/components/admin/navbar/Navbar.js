import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import styles from "./Navbar.module.scss";
import { selectUser } from "../../../redux/slices/authSlice";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const user = useSelector(selectUser);
  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{user.firstname}</h4>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/allProducts" className={activeLink}>
              All products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/addProduct/ADD" className={activeLink}>
              Add products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
