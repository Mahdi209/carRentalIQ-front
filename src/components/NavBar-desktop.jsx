import React, { useEffect, useState } from "react";
import { FiHome, FiSearch } from "react-icons/fi";
import { MdBusiness, MdDirectionsCar } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";
import { PiChatCircleBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "flowbite-react";
import { Avatar } from "@chakra-ui/react";

const languageItems = [
  { name: "EN", id: "en" },
  { name: "AR", id: "ar" },
];

export const NavDesktop = () => {
  const { t, i18n } = useTranslation();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companyID = "665dd36e320441f73c286794";
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
    document.documentElement.dir = selectedLanguage === "ar" ? "rtl" : "ltr";
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(storedLanguage);
    document.documentElement.dir = storedLanguage === "ar" ? "rtl" : "ltr";
  }, [i18n]);

  const { data: user, isLoading: userLoading } = useSelector(
    (state) => state.auth.user
  );

  const handleLogOut = () => {
    dispatch({ type: "auth/logout" });
    navigate("/login");
  };
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <nav
      className="hidden z-50 lg:flex w-full bg-white dark:bg-gray-800 shadow-md  sticky top-0 "
      dir={document.documentElement.dir}
    >
      <div className="container mx-auto  py-5 flex items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl  font-bold text-gray-800 dark:text-white"
          >
            CarRentalIQ
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex md:items-center md:gap-8 text-xl">
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-300 transition-all"
            >
              <FiHome />
              {t("Home")}
            </Link>
          </li>
          <li>
            <Link
              to="/company"
              className="flex items-center gap-1 text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-300 transition-all"
            >
              <MdBusiness />
              {t("Companies")}
            </Link>
          </li>
          <li>
            <Link
              to="/cars"
              className="flex items-center gap-1 text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-300 transition-all"
            >
              <MdDirectionsCar />
              {t("Cars")}
            </Link>
          </li>
          <li>
            <Link
              to="/cars"
              className="flex items-center gap-1 text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-300 transition-all"
            >
              <PiChatCircleBold />
              {t("About")}
            </Link>
          </li>
        </ul>

        <div
          className={`flex items-center gap-4 w-56 ${
            document.documentElement.dir === "rtl" ? "flex-row-reverse" : ""
          }`}
        >
          <button
            onClick={toggleSearch}
            className="text-gray-800 dark:text-white"
          >
            <FiSearch className="text-3xl" />
          </button>
          <DarkMode />
          {user ? (
            <Dropdown
              label={<Avatar src={user.profile} alt={user.fullName} />}
              dismissOnClick={false}
              className="text-black"
            >
              <Dropdown.Item className="text-xl text-black">
                {user.fullName}
              </Dropdown.Item>
              <Dropdown.Divider />

              {user.role === companyID ? (
                <Dropdown.Item className="text-xl text-black">
                  <Link to="/Dashboard">{t("Dashboard")}</Link>
                </Dropdown.Item>
              ) : (
                <Dropdown.Item className="text-xl text-black">
                  {t("Profile")}
                </Dropdown.Item>
              )}
              <Dropdown.Divider />

              <Dropdown.Item className="text-xl text-black">
                <button onClick={handleLogOut}>{t("Logout")}</button>
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Link
              to="/login"
              className="bg-secondary p-2 rounded-lg px-10 w-96 font-bold hover:bg-yellow-300"
            >
              {t("Login")}
            </Link>
          )}

          <select
            className="rounded-xl text-black text-base p-2 duration-300 dark:bg-gray-800 dark:text-white"
            aria-label="Select Language"
            value={i18n.language}
            onChange={handleLanguageChange}
          >
            {languageItems.map((language) => (
              <option key={language.id} value={language.id}>
                {language.name}
              </option>
            ))}
          </select>
        </div>

        <AnimatePresence>
          {isSearchVisible && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-16 2xl:top-4 right-40 xl:right-60 mt-2 mr-4 z-10"
            >
              <input
                type="text"
                placeholder={t("Search...")}
                className="text-base px-4 h-10 w-[300px] xl:w-72 xl:text-xl border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
