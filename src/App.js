import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Login, Register, Reset, Admin } from "./pages";
import SetNewPassword from "./pages/auth/SetNewPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import AuthGoogle from "./pages/auth/AuthGoogle";
import { AdminOnlyRoute } from "./components/adminOnly/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import CheckoutDetails from "./pages/checkout/checkoutDetails/CheckoutDetails";
import AddAdress from "./components/adresses/AddAdress";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderHistory from "./pages/dashboard/orderHistory/OrderHistory";
import OrderDetails from "./pages/dashboard/orderDetails/OrderDetails";
import ReviewProduct from "./components/review/ReviewProduct";
import ContactUs from "./pages/contact/ContactUs";
import NotFound from "./pages/notFound/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />

        <Header />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/reset" element={<Reset />} />

          <Route path="/reset-password/:token" element={<SetNewPassword />} />

          {/* <Route path="/authGoogle" element={<AuthGoogle />} /> */}

          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                {" "}
                <Admin />{" "}
              </AdminOnlyRoute>
            }
          />

          <Route path="/product-details/:param" element={<ProductDetails />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout-details" element={<CheckoutDetails />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/checkout-success" element={<CheckoutSuccess />} />

          <Route path="/addAdress" element={<AddAdress />} />

          <Route path="/order-history" element={<OrderHistory />} />

          <Route path="/order-details/:param" element={<OrderDetails />} />

          <Route path="/review-product/:param" element={<ReviewProduct />} />

          <Route path="/contact-us" element={<ContactUs />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
