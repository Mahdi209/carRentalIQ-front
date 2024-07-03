import "./App.css";
import { NavMobile } from "./components/NavBar-Mobile";
import { NavDesktop } from "./components/NavBar-desktop";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Companies from "./pages/Companies";
import Cars from "./pages/Cars";
import Dashboard from "./pages/Dashboard";
import MyDashboard from "./components/MyDashboard";
import CarsTable from "./components/CarsTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkForToken } from "./store/API/auth";
import { Routes, Route, useLocation } from "react-router-dom";
import CarsForms from "./components/CarsForms";
import CarDetails from "./pages/CarDetails";
import Information from "./components/Information";
import CompanyDetails from "./pages/CompanyDetails";
import MyFooter from "./components/Footer";

const isLogIn = (location) => {
  const hideFooterPaths = [
    "/Dashboard",
    "/Dashboard/MyDashboard",
    "/Dashboard/Information",
    "/Dashboard/MyCars",
  ];
  const hideFooter = hideFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Companies />} />
        <Route path="/Car-Details/:id" element={<CarDetails />} />
        <Route path="/Company-Details/:id" element={<CompanyDetails />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/newCar" element={<CarsForms />} />
        <Route path="/Dashboard" element={<Dashboard />}>
          <Route path="MyDashboard" element={<MyDashboard />} />
          <Route path="Information" element={<Information />} />
          <Route path="MyCars" element={<CarsTable />} />
        </Route>
      </Routes>
      {!hideFooter && <MyFooter />}
    </>
  );
};

const isLogOut = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Car-Details/:id" element={<CarDetails />} />
      <Route path="/company" element={<Companies />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
};

function App() {
  const decodedToken = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = checkForToken(token);
      dispatch({ type: "auth/getUser", payload: user });
    }
  }, [dispatch]);

  return (
    <div>
      <NavMobile />
      <NavDesktop />
      {decodedToken.data === null ? isLogOut() : isLogIn(location)}
    </div>
  );
}

export default App;
