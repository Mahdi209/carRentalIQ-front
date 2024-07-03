import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { FaRegSave } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FileInput, TabItem } from "flowbite-react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "flowbite-react";
import { updateUser } from "../store/API/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingPage from "../pages/LoadingPage";
import MapWithMarker from "./MapComponent";

export default function Information() {
  const { t } = useTranslation();
  const { data: user, isLoading: userLoading } = useSelector(
    (state) => state.auth.user
  );
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: user.fullName,
    username: user.username,
    phone: user.phone,
    profile: user.profile,
  });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleSave = async () => {
    try {
      await dispatch(updateUser(userInfo)).then(() => {
        if (!userLoading) {
          toast.success(t("Update Successful"));
          setIsOpen(false);
        } else {
          toast.warn(t("Update Failed"));
          setIsOpen(false);
        }
      });
    } catch (error) {
      toast.error(t("An error occurred"));
      console.error(error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

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

  return (
    <section className="w-full flex flex-col items-center pb-36">
      {userLoading ? (
        <div className="flex justify-center items-center">
          <LoadingPage />
        </div>
      ) : (
        <div className="w-full flex">
          <Tabs
            aria-label="Tabs with underline"
            style="underline"
            className="w-full self-center flex justify-center mt-5 "
          >
            <TabItem title="information">
              <div className=" mr-[13%] mt-16 relative left-[85%] ">
                {isOpen ? (
                  <div className="flex gap-2">
                    <IoCloseCircleOutline
                      className="text-3xl dark:text-secondary text-yellow-400"
                      onClick={handleClose}
                    />
                    <FaRegSave
                      className="text-3xl dark:text-secondary text-yellow-400"
                      onClick={handleSave}
                    />
                  </div>
                ) : (
                  <FaEdit
                    className="text-3xl dark:text-secondary text-yellow-400"
                    onClick={handleOpen}
                  />
                )}
              </div>

              <div className="flex w-full flex-col lg:flex-row justify-evenly items-center">
                <div className="w-[90%] lg:w-[30%]">
                  <div className="bg-slate-300 dark:bg-slate-500 w-[100%] h-44 flex flex-col justify-evenly rounded-xl mt-20  p-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-3xl font-serif font-bold">
                        {t("Phone Number")}
                      </h2>
                    </div>
                    {isOpen ? (
                      <input
                        type="telephone"
                        placeholder={t("phone")}
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      />
                    ) : (
                      <p className="font-bold text-2xl text-white bg-slate-700 rounded-lg p-5">
                        {user.phone}
                      </p>
                    )}
                  </div>
                  <div className="bg-slate-300 dark:bg-slate-500 w-[100%] h-44 flex flex-col justify-evenly rounded-xl mt-20  p-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-3xl font-serif font-bold">
                        {t("Full Name")}
                      </h2>
                    </div>
                    {isOpen ? (
                      <input
                        type="text"
                        placeholder={t("Full Name")}
                        name="fullName"
                        value={userInfo.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      />
                    ) : (
                      <p className="text-2xl text-white bg-slate-700 rounded-lg p-5 font-bold">
                        {user.fullName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-slate-300 dark:bg-slate-500 w-[90%] lg:w-[30%] h-auto flex flex-col justify-evenly rounded-xl mt-20 p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-serif font-bold">
                      {t("Profile")}
                    </h2>
                  </div>
                  {isOpen ? (
                    <FileInput
                      id="profile"
                      name="profile"
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg text-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                  ) : (
                    <img
                      src={user.profile}
                      alt={user.fullName}
                      className="rounded-2xl w-60 self-center"
                    />
                  )}
                </div>
              </div>

              <div
                className="w-full flex flex-col lg:flex-row justify-center  
               items-center gap-12"
              >
                <div className="flex w-full items-center lg:w-[74%] flex-col lg:flex-row gap-x-12">
                  <div className="bg-slate-300 dark:bg-slate-500 w-[90%] lg:w[34%] h-48 flex flex-col justify-evenly rounded-xl mt-20  p-6 ">
                    <div className="flex justify-between items-center">
                      <h2 className="text-4xl font-serif font-bold">
                        {t("Username")}
                      </h2>
                    </div>
                    {isOpen ? (
                      <input
                        type="text"
                        placeholder={t("username")}
                        name="username"
                        value={userInfo.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      />
                    ) : (
                      <p className="text-2xl text-white bg-slate-700 rounded-lg p-5 font-bold">
                        {user.username}
                      </p>
                    )}
                  </div>

                  <div className="bg-slate-300 dark:bg-slate-500 w-[90%] lg:w[34%] h-48 flex flex-col justify-evenly rounded-xl mt-20  p-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-4xl font-serif font-bold">
                        {t("Password")}
                      </h2>
                    </div>
                    <p className="text-2xl text-white bg-slate-700 rounded-lg p-5 font-bold">
                      *************
                    </p>
                  </div>
                </div>
              </div>
            </TabItem>

            <TabItem title="Location">
              <div className="w-full flex justify-center ">
                <div className="w-[70%] ">
                  <MapWithMarker />
                </div>
              </div>
            </TabItem>
          </Tabs>
          <ToastContainer />
        </div>
      )}
    </section>
  );
}
