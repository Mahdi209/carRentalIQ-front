import React, { useState } from "react";
import background from "../assets/LoginBG.jpg";
import "tailwindcss/tailwind.css";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/API/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isLoginLoading = useSelector((state) => state.auth.isLoading);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [passwordShow, setPasswordShow] = useState(false);

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handlePasswordShow = () => {
    setPasswordShow(!passwordShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(userInfo)).unwrap();
      toast.success("Login successful!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorMessage(t("An error occurred. Please try again."));
      } else {
        setErrorMessage(t("your email or password is incorrect"));
        toast.error("your email or password is incorrect", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  return (
    <>
      <div
        className="flex min-h-screen items-center justify-center bg-cover px-4"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="relative max-w-md w-full p-8 space-y-6 bg-white rounded-lg shadow-lg  backdrop-filter backdrop-blur dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 ">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 dark:text-white">
              {t("Log In")}
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder={t("Email")}
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <input
                type={passwordShow ? "text" : "password"}
                placeholder={t("Password")}
                name="password"
                value={userInfo.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <input
                id="show"
                name="show"
                value={passwordShow}
                type="checkbox"
                className="rounded-lg mr-2"
                onClick={handlePasswordShow}
              />
              <label htmlFor="show">Show Password</label>
            </div>
            <button
              type="submit"
              disabled={isLoginLoading}
              className="w-full px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-700 rounded-md focus:outline-none focus:ring focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoginLoading ? t("Loading...") : t("Login")}
            </button>
          </form>
          <div className="text-center text-sm text-gray-500">
            {t("or")}{" "}
            <Link
              to="/signUp"
              className="font-semibold text-blue-500 hover:underline dark:text-blue-400"
            >
              {t("Sign Up")}
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
