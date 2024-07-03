import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import CarCard from "../components/CarCard";
import ExperienceSection from "../components/ExperienceSection";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCarsDetails } from "../store/API/car";
import LoadingPage from "./LoadingPage";
import { getLocation } from "../store/API/auth";

export default function Home() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);

    dispatch(getCarsDetails());
    dispatch(getLocation());

    return () => clearTimeout(timer);
  }, [dispatch]);

  const {
    data: cars,
    SportData: sportCars,
    isLoading: carLoading,
  } = useSelector((state) => state.cars.carsCard);

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col justify-center items-center gap-12 pb-12">
        <HeroSection />

        {/* Popular Car Models */}
        <section className="w-full px-5 lg:px-52">
          <h2 className="text-2xl lg:text-4xl font-bold my-10 dark:text-white">
            {t("Popular Car Models")}
          </h2>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-10">
            {carLoading ? (
              <p className="text-center dark:text-white">Loading...</p>
            ) : (
              cars.slice(0, 4).map((car) => <CarCard key={car._id} car={car} />)
            )}
          </div>
        </section>

        {/* Popular Sport Car Models */}
        <section className="w-full px-5 lg:px-52">
          <h2 className="text-2xl lg:text-4xl font-bold my-10 dark:text-white">
            {t("Popular Sport Car Models")}
          </h2>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-10">
            {carLoading ? (
              <p className="text-center dark:text-white">Loading...</p>
            ) : (
              sportCars
                .slice(0, 4)
                .map((car) => <CarCard key={car._id} car={car} />)
            )}
          </div>
        </section>
      </div>
      <ExperienceSection />
    </div>
  );
}
