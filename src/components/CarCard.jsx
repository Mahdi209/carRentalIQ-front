import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CarCard({ car }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/Car-Details/${car._id}`);
  };

  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg cursor-pointer bg-primary ">
      <div className="text-white bg-primary rounded-t-xl">
        {isLoading && (
          <div className="animate-pulse">
            <div className="bg-gray-300 h-48 w-full"></div>
          </div>
        )}

        <img
          onClick={handleNavigate}
          src={car.image}
          alt={`${car.car.carCompany.name} ${car.car.carName}`}
          className={`w-full h-48 ${
            isLoading ? "hidden" : "block"
          } rounded-lg hover:scale-105 transition-all duration-500`}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div>

      <div className="px-6 py-4 text-white">
        <div className="font-bold text-xl mb-2 ">
          <span className="mr-2">{car.car.carCompany.name}</span>
          {car.car.carName}
        </div>
        <p className=" text-base  text-white">{car.company.fullName}</p>
      </div>
      <div className="bg-primary rounded-b-xl px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl">
            {car.pricePerDay}
            <span className="ml-2">IQD</span>
          </div>
          <button
            onClick={handleNavigate}
            className="bg-secondary dark:text-black rounded-md px-4 font-bold h-10 hover:bg-amber-100 hover:scale-105 transition-all duration-500"
          >
            {t("Rent Now")}
          </button>
        </div>
      </div>
    </div>
  );
}
