import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { SET_ACTIVE_USER, SET_IS_ADMIN } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slices/cartSlice";

function AuthGoogle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const previousURL = useSelector(selectPreviousURL);

  useEffect(() => {
    const redirectUser = () => {
      if (previousURL.includes("cart")) navigate("/cart");
      else navigate("/");
    };
    const handleLogIn = async () => {
      const res = await axios
        .get(`${process.env.REACT_APP_API_ROOT_URL}/auth/me`, {
          withCredentials: true,
        })
        .catch(function (e) {
          if (e.response) {
            toast.error(e.response.data.message);
            navigate("/login");
          }
        });
      if (res) {
        dispatch(
          SET_ACTIVE_USER({
            isLoggedIn: true,
            user: res.data.user,
            JWT: res.data.token,
          })
        );
        if (res.data.user.roles.id === 2) {
          dispatch(
            SET_IS_ADMIN({
              isAdmin: true,
            })
          );
        }

        toast.success(`You're logged in`);
        redirectUser();
      }
    };
    handleLogIn();
  }, [navigate, dispatch, previousURL]);

  return <div></div>;
}

export default AuthGoogle;
