import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaCarAlt, FaInfoCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Box,
  Flex,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MdDashboard } from "react-icons/md";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const isRTL = i18n.language === "ar";
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [i18n.language]);

  const isActiveRoute = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    dispatch({ type: "auth/logout" });
    navigate("/login");
  };

  const navLinks = [
    {
      to: "MyDashboard",
      icon: <TbLayoutDashboardFilled />,
      label: t("Dashboard"),
    },
    { to: "Information", icon: <FaInfoCircle />, label: t("Information") },
    { to: "MyCars", icon: <FaCarAlt />, label: t("Cars") },
  ];

  const NavLink = ({ to, icon, label, isActive }) => (
    <Link
      to={to}
      className={`text-3xl text-white flex space-x-4 items-center w-full h-16 rounded-lg cursor-pointer pl-3 
        ${
          isActive
            ? "bg-yellow-400 text-black"
            : "text-gray-400 transition-all duration-500 hover:text-black hover:bg-yellow-400"
        }`}
    >
      {icon}
      {label}
    </Link>
  );

  const displayNav = useBreakpointValue({ base: "none", md: "block" });

  return (
    <Flex
      className="h-[92.4vh] flex"
      direction="column"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      bg=""
    >
      <Box p={10} className="w-10">
        <IconButton
          aria-label="MyDashboard"
          icon={<MdDashboard className="text-3xl" />}
          onClick={onOpen}
          width={36}
        />
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="xs"
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        <div className="bg-gray-800">
          <DrawerOverlay className="bg-gray-800">
            <DrawerContent>
              <DrawerCloseButton className="text-white" />
              <DrawerHeader className="bg-gray-800 text-white">
                {t("Menu")}
              </DrawerHeader>

              <DrawerBody className="bg-gray-800 text-white">
                <Flex
                  direction="column"
                  mt={10}
                  spaceY={11}
                  fontBold
                  className="text-white"
                >
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      icon={link.icon}
                      label={link.label}
                      isActive={isActiveRoute(`/${link.to}`)}
                    />
                  ))}
                  <Box
                    className={`text-3xl text-white flex space-x-4 items-center  transition-all duration-500 hover:text-black w-full h-16 rounded-lg cursor-pointer pl-3 hover:bg-yellow-400`}
                    onClick={handleLogout}
                  >
                    <IoLogOut className="h-6 w-6" />
                    <span>{t("Logout")}</span>
                  </Box>
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </div>
      </Drawer>

      {location.pathname === "/Dashboard" ? (
        <Box className="flex-1 flex items-center justify-center text-2xl text-gray-500">
          {t("Welcome to your ") + t("dashboard!") + user.data.fullName}
        </Box>
      ) : (
        <Outlet />
      )}
    </Flex>
  );
}
