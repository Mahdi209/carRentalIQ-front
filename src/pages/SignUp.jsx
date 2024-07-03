import { useEffect, useState } from "react";
import background from "../assets/LoginBG.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCity, getPhone, register, role } from "../store/API/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FileInput, Label, Spinner, Select } from "flowbite-react";

export default function SignUp() {
  const dispatch = useDispatch();
  const roleList = useSelector((state) => state.auth.role);
  const { data: phoneCode, isLoading: phoneLoading } = useSelector(
    (state) => state.auth.phone
  );
  const { data: city, isLoading: cityLoading } = useSelector(
    (state) => state.auth.city
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(city);
  useEffect(() => {
    dispatch(role());
    dispatch(getPhone());
    dispatch(getCity());
  }, [dispatch]);

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneCode: "",
    phone: "",
    password: "",
    role: "",
    city: "",
    profile: null,
  });

  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile") {
      setUserInfo({
        ...userInfo,
        [name]: files[0],
      });
    } else {
      setUserInfo({
        ...userInfo,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const fullPhoneNumber = `${userInfo.phoneCode}${userInfo.phone}`;

    try {
      await dispatch(
        register({ ...userInfo, phone: fullPhoneNumber })
      ).unwrap();
      toast.success("Login successful!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.error || t("Unauthorized"));
      } else {
        setErrorMessage(t("An error occurred. Please try again."));
      }
      toast.error("🦄 your email or password is incorrect", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-4 "
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg backdrop-filter backdrop-blur-sm bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-75">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {t("Sign Up")}
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder={t("Full Name")}
              name="fullName"
              value={userInfo.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder={t("Username")}
              name="username"
              value={userInfo.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
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
          <div className="flex space-x-2">
            <Select
              id="phoneCode"
              name="phoneCode"
              value={userInfo.phoneCode}
              onChange={handleChange}
              required
              className="w-32"
            >
              <option value="" disabled>
                {phoneLoading ? "Loading..." : "Select Code"}
              </option>
              {phoneCode?.map((code) => (
                <option key={code._id} value={code.dial_code}>
                  <span>{code.name}</span> {code.dial_code}
                </option>
              ))}
            </Select>
            <input
              type="text"
              placeholder={t("Phone Number")}
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              required
              className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder={t("Password")}
              name="password"
              value={userInfo.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <select
              name="city"
              value={userInfo.city}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="" disabled>
                {t("Select City")}
              </option>
              {cityLoading ? (
                <option value="" disabled>
                  Loading...
                </option>
              ) : (
                city.map((city) => (
                  <option
                    key={city._id}
                    value={city._id}
                    className="hover:bg-blue-100 dark:hover:bg-blue-900"
                  >
                    {city.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <div>
            <select
              name="role"
              value={userInfo.role}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="" disabled>
                {t("Select Role")}
              </option>
              {roleList.isLoading ? (
                <option value="" disabled>
                  Loading...
                </option>
              ) : (
                roleList.data.map((role) => (
                  <option
                    key={role._id}
                    value={role._id}
                    className="hover:bg-blue-100 dark:hover:bg-blue-900"
                  >
                    {role.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="flex flex-col gap-4">
            <Label
              htmlFor="profile"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Profile Picture
            </Label>
            <FileInput
              id="profile"
              name="profile"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg text-gray-700 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          <div className="flex justify-center ">
            <button
              type="submit"
              className="w-full px-4 py-2 h-14 text-lg  text-white font-semibold bg-blue-500 hover:bg-blue-700 rounded-md focus:outline-none focus:ring focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner aria-label="Spinner button example" size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
        <div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Already have an account?</span>
            <Link
              to="/login"
              className="font-semibold text-blue-500 hover:underline dark:text-blue-400"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
