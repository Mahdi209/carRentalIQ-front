import React, { useState, useEffect } from "react";
import ls from "../assets/ls.jpg";
import { FaChevronDown } from "react-icons/fa";
import CarCard from "../components/CarCard";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { getCarType, getCarsDetails } from "../store/API/car";
import LoadingPage from "./LoadingPage";
import { getCity } from "../store/API/auth";
import { Button, List, Modal } from "flowbite-react";

export default function Cars() {
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { t } = useTranslation();
  const [filter, setFilter] = useState({
    city: "",
    price: "",
    carTypes: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const { data: city, isLoading: cityLoading } = useSelector(
    (state) => state.auth.city
  );
  const { data: carType, isLoading: carTypeLoading } = useSelector(
    (state) => state.cars.carType
  );

  // const [sortBy, setSortBy] = useState({ field: "price", order: "asc" });

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);
    dispatch(getCarsDetails());
    dispatch(getCity());
    dispatch(getCarType());
    return () => clearTimeout(timer);
  }, [dispatch]);

  const { data: cars, isLoading: carLoading } = useSelector(
    (state) => state.cars.carsCard
  );

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingPage />
      </div>
    );
  }

  const filteredCars = cars.filter((car) => {
    const cityMatch = !filter.city || car.company.city === filter.city;
    const typeMatch =
      !filter.carTypes ||
      car.car.carTypes.some((ct) => ct._id === filter.carTypes);

    let priceMatch = true;
    if (filter.price === "lowToHigh") {
      priceMatch = car.pricePerDay >= 50;
    } else if (filter.price === "highToLow") {
      priceMatch = car.pricePerDay < 50;
    }

    return cityMatch && typeMatch && priceMatch;
  });

  return (
    <div className="h-auto pb-12 flex flex-col items-center">
      <section
        className="relative w-[80%] bg-primary mt-12 rounded-3xl flex justify-center h-[55vh] bg-cover bg-right lg:bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ls})` }}
      >
        <div className="md:w-[70%] flex justify-center items-center z-40">
          <h1 className=" z-30 absolute text-2xl lg:text-5xl w-[60%] text-center font-bold font-home text-white">
            {t("Experience the Freedom of the Open Road with Iraq Rental Car")}
          </h1>
        </div>
        <section className="absolute w-full h-full opacity-30 transition-all duration-700 dark:opacity-60 bg-black rounded-3xl flex justify-center bg-cover ">
          <div className="absolute inset-0  " />
          <div className="relative container h-full flex flex-col-reverse xl:flex-row items-center justify-center px-4 md:px-6 text-center md:text-left text-white"></div>
        </section>
      </section>
      <div className="ml-16 self-start lg:ml-56 lg:mr-24 mr-16 mt-12 mb-12 text-black ">
        <button
          className="bg-secondary dark:text-black  text-black font-bold text-xl rounded-2xl w-36 h-16 flex justify-center items-center "
          onClick={() => setOpenModal(true)}
        >
          {t("Filter")}{" "}
        </button>

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>{t("Find Your Perfect Ride")}</Modal.Header>
          <Modal.Body>
            <div className="flex flex-col space-y-4">
              <label>{t("City")}:</label>
              <select
                value={filter.city}
                onChange={(e) => setFilter({ ...filter, city: e.target.value })}
                className="border p-1 rounded-lg dark:bg-slate-200 text-black h-12 pl-3 "
              >
                <option value="">{t("All")}</option>
                {city &&
                  city.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>

              <label>{t("Car Type")}:</label>
              <select
                value={filter.carTypes}
                onChange={(e) =>
                  setFilter({ ...filter, carTypes: e.target.value })
                }
                className="border p-1 rounded-lg dark:bg-slate-200 text-black h-12 pl-3 "
              >
                <option value="">{t("All")}</option>

                {carTypeLoading ? (
                  <option>Loading....</option>
                ) : (
                  carType.map((car) => (
                    <option key={car._id} value={car._id}>
                      {car.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="bg-secondary text-black"
              onClick={() => setOpenModal(false)}
            >
              {t("Close")}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-24 justify-center px-5 lg:px-52">
        {carLoading ? (
          <LoadingPage />
        ) : (
          filteredCars.map((car) => <CarCard key={car._id} car={car} />)
        )}
      </div>
    </div>
  );
}
