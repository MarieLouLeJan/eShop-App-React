import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Footer } from './components';
import { Home, Login, Register, Reset, Admin } from './pages';
import SetNewPassword from "./pages/auth/SetNewPassword";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthGoogle from "./pages/auth/AuthGoogle";
import {AdminOnlyRoute} from "./components/adminOnly/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";

function App() {

  return (
    <>
      <BrowserRouter>

        <ToastContainer/>

        <Header/>

        <Routes>

          <Route path='/' element={<Home/>}/>

          <Route path='/login' element={<Login/>}/>

          <Route path='/register' element={<Register/>}/>

          <Route path='/reset' element={<Reset/>}/>

          <Route path="/reset-password/:token" element={<SetNewPassword/>}/>

          <Route path="/authGoogle" element={<AuthGoogle/>}/>

          <Route path='/admin/*' element={<AdminOnlyRoute> <Admin/> </AdminOnlyRoute>}></Route>

          <Route path="/product-details/:param" element={<ProductDetails/>}/>

        </Routes>

        <Footer/>

      </BrowserRouter>
    </>
  );
}

export default App;