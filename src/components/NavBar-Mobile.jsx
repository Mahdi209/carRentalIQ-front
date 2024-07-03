import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import { routes } from "../assets/routes";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import DarkMode from "./DarkMode";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";

const languageItems = [
  { name: "EN", id: "en" },
  { name: "AR", id: "ar" },
];

export const NavMobile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const companyID = "665dd36e320441f73c286794";

  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  const { t, i18n } = useTranslation();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogOut = () => {
    dispatch({ type: "auth/logout" });
    navigate("/login");
  };
  const { data: user, isLoading: userLoading } = useSelector(
    (state) => state.auth.user
  );

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(storedLanguage);
  }, [i18n]);

  return (
    <div
      ref={ref}
      className="relative lg:hidden  dark:bg-primary shadow-md py-3 z-50"
    >
      <div className="flex w-full justify-between pr-3 pt-3">
        <Hamburger
          className="self-end dark:text-white text-black "
          toggled={isOpen}
          size={20}
          toggle={setOpen}
        />

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
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="z-10 fixed left-0 right-0 top-[5rem] p-5 pt-5 bg-neutral-100 dark:bg-primary opacity-90 border-b border-b-gray-300 dark:border-b-white/20 shadow-4xl bg-opacity-90 dark:bg-opacity-90"
          >
            <ul className="grid gap-2">
              {routes.map((route, idx) => {
                const { Icon } = route;

                return (
                  <motion.li
                    key={route.title}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + idx / 10,
                    }}
                    className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-200 via-neutral-100 to-neutral-300 dark:from-primary dark:via-neutral-950 dark:to-neutral-700"
                  >
                    <Link
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between w-full p-5 rounded-xl bg-neutral-100 dark:bg-primary"
                      to={route.href}
                    >
                      <span className="flex gap-1 text-lg text-black dark:text-white">
                        {t(route.title)}
                      </span>
                      <Icon className="text-xl text-black dark:text-white" />
                    </Link>
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1 + routes.length / 10,
                }}
                className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-200 via-neutral-100 to-neutral-300 dark:bg-primary dark:from-primary dark:via-neutral-950 dark:to-neutral-700"
              >
                <div className=" dark:bg-primary p-2 flex justify-center">
                  {languageItems.map((language) => (
                    <button
                      key={language.id}
                      value={language.id}
                      className="focus:bg-yellow-400 rounded-xl mx-8 w-10 focus:text-black"
                      onClick={handleLanguageChange}
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              </motion.li>
              <motion.li
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1 + routes.length / 10,
                }}
                className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-200 via-neutral-100 to-neutral-300 dark:bg-primary dark:from-primary dark:via-neutral-950 dark:to-neutral-700"
              >
                <div className=" dark:bg-primary p-2 flex justify-center">
                  <DarkMode />
                </div>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
