import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleCars } from "../store/API/car";
import LoadingPage from "./LoadingPage";
import { Datepicker, Rating } from "flowbite-react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { LuCircleDollarSign } from "react-icons/lu";
import { Divider, Skeleton, Stack } from "@chakra-ui/react";
import { CgBrowse } from "react-icons/cg";
import settings from "../assets/settings.png";
import engine from "../assets/car-engine.png";
import color from "../assets/art.png";
import seats from "../assets/car-seat.png";
import { MdOutlineCategory } from "react-icons/md";

export default function CarDetails() {
  const { id } = useParams();
  const [pickDate, setPickDate] = useState(new Date());
  const [dropDate, setDropDate] = useState(new Date());
  const [like, setLike] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleCars(id));
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: car, isLoading: carLoading } = useSelector(
    (state) => state.cars.singleCar
  );
  console.log(car);
  const handleBooking = () => {
    if (pickDate && dropDate) {
      console.log("Pick-up Date:", pickDate);
      console.log("Drop-off Date:", dropDate);
    } else {
      console.log("Please select both dates");
    }
  };

  const handleLike = () => {
    setLike(!like);
  };

  if (carLoading) {
    return <LoadingPage />;
  }

  if (!car || car.length === 0) {
    return <div className="text-center">No car details available.</div>;
  }

  return (
    <div className="p-4 rounded-md flex flex-col items-center gap-y-24 justify-center">
      <div className="lg:flex lg:flex-col items-center bg-slate-300 rounded-lg w-[75%] p-10 dark:bg-slate-500 mt-12">
        <div className="block lg:flex justify-around">
          <div className="flex flex-col lg:w-[50%] mb-10">
            {!car[0].image ? (
              <Stack>
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </Stack>
            ) : (
              <img
                src={car[0].image}
                alt={car[0].car.carName}
                className="rounded-2xl"
              />
            )}
            <div className="flex justify-between mt-4">
              <div className="block">
                <h2 className="text-xl font-semibold">
                  <span>{car[0].car.carCompany.name}</span>
                  <span> {car[0].car.carName}</span>
                </h2>
                <p>{car[0].year}</p>
              </div>
              <div className="flex items-center flex-col">
                <Rating className="text-orange-200">
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
                <div className="flex justify-center items-center text-xl">
                  <span>200 </span>
                  <div className="ml-2 cursor-pointer" onClick={handleLike}>
                    {like ? <FaHeart size={25} /> : <CiHeart size={25} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-800 h-[100%] lg:w-[29%] rounded-2xl flex flex-col items-center">
            <h2 className="text-white text-3xl font-bold mb-5 mt-10">
              Select a Date
            </h2>
            <div className="mt-4 flex flex-col items-center gap-y-5 mb-6 w-full px-12">
              <div className="w-full">
                <h3 className="text-white self-start">Pick up date</h3>
                <Datepicker
                  selected={pickDate}
                  onSelectedDateChanged={(date) => setPickDate(date)}
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <h3 className="text-white mt-4 self-start">Drop off date</h3>
                <Datepicker
                  selected={dropDate}
                  onSelectedDateChanged={(date) => setDropDate(date)}
                />
              </div>
              <div className="flex items-center w-full">
                <input
                  type="checkbox"
                  className="rounded-lg mr-3 self-center"
                  id="accept"
                  defaultChecked
                />
                <label className="text-white" htmlFor="accept">
                  Do you want a Driver
                </label>
              </div>
              <button
                className="text-black rounded-md py-2 px-4 mt-4 w-full bg-secondary"
                onClick={handleBooking}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="bg-slate-300 dark:bg-slate-500 rounded-lg w-[75%] h-20 flex items-center pl-4">
          <LuCircleDollarSign
            size={44}
            className="font-bold text-secondary mr-2"
          />
          <h1 className="text-3xl font-extrabold">Rental Pricing</h1>
        </div>
        <div className="flex flex-col items-center gap-y-10 w-[75%] px-5 mt-20 mb-20">
          <div className="flex w-full justify-between items-center text-3xl font-bold">
            <div>Per Day</div>
            <div>
              <span className="font-mono">{car[0].pricePerDay}</span>{" "}
              <span>IQD</span>
            </div>
          </div>
          <Divider />
          <div className="flex w-full justify-between items-center text-3xl font-bold">
            <div>Per Week</div>
            <div>
              <span className="font-mono">{car[0].pricePerWeek}</span>{" "}
              <span>IQD</span>
            </div>
          </div>
          <Divider />
        </div>
        <div className="bg-slate-300 dark:bg-slate-500 rounded-lg w-[75%] h-20 flex items-center pl-4">
          <CgBrowse size={44} className="font-bold text-secondary mr-2" />
          <h1 className="text-3xl font-extrabold">Vehicle Specifications</h1>
        </div>
        <div className="w-[75%] flex flex-wrap gap-36 justify-center mt-16 mb-36">
          <div className="bg-slate-900 w-[40%] h-44 rounded-xl flex justify-start pl-16 items-center">
            <img src={engine} className="h-32 w-32 mr-10" />
            <div className="flex">
              <span className="mr-2 text-3xl text-white font-bold">
                Engine:
              </span>
              <span className="text-xl bg-secondary text-black p-2 rounded-lg w-20 flex justify-center items-center font-bold">
                {car[0].car.engine}
              </span>
            </div>
          </div>
          <div className="bg-slate-900 w-[40%] h-44 rounded-xl flex justify-start pl-16 items-center">
            <img src={seats} className="h-32 w-32 mr-10" />
            <span className="mr-2 text-3xl font-bold text-white">Seats:</span>
            <span className="text-xl bg-secondary text-black p-2 rounded-lg w-20 flex justify-center items-center font-bold">
              {car[0].car.seats}
            </span>
          </div>
          <div className="bg-slate-900 w-[40%] h-44 rounded-xl flex justify-start pl-16 items-center">
            <img src={settings} className="h-32 w-32 mr-10" />
            <span className="mr-2 text-3xl font-bold text-white">Gear:</span>
            <span className="text-xl bg-secondary text-black p-2 rounded-lg w-36 flex justify-center items-center font-bold">
              {car[0].car.Gear}
            </span>
          </div>
          <div className="bg-slate-900 w-[40%] h-44 rounded-xl flex justify-start pl-16 items-center">
            <img src={color} className="h-32 w-32 mr-10" />
            <span className="mr-2 text-3xl font-bold text-white">Color:</span>
            <span className="text-xl bg-secondary text-black p-2 rounded-lg w-20 flex justify-center items-center font-bold">
              {car[0].color}
            </span>
          </div>
          <div className="bg-slate-900 w-auto pr-16 h-44 rounded-xl flex justify-start pl-16 items-center">
            <MdOutlineCategory className="text-secondary h-32 w-32 mr-10" />
            <span className="mr-2 text-3xl font-bold text-white">Types:</span>
            {car[0].car.carTypes.map((type) => (
              <span
                className="mr-2 text-xl bg-secondary text-black p-2 rounded-lg font-bold"
                key={type._id}
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
