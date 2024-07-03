import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaCarRear } from "react-icons/fa6";
import { getCompanyDetails } from "../store/API/auth";
import Map from "../components/Map";
import { getCarsByCompanyDetails } from "../store/API/car";
import CarCard from "../components/CarCard";
import Comment from "../components/Comment";

export default function CompanyDetails() {
  const { id } = useParams();
  const [like, setLike] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(getCompanyDetails(id));
    dispatch(getCarsByCompanyDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: company, isLoading: companyLoading } = useSelector(
    (state) => state.auth.companyDetails
  );

  const { isLoading: carLoading, data: cars } = useSelector(
    (state) => state.auth.carCardForCompanyDetails
  );

  const handleLike = () => {
    setLike(!like);
  };

  if (companyLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="p-4 rounded-md flex flex-col items-center gap-y-24 justify-center">
      <div className="dark:bg-slate-400 bg-slate-200 rounded-2xl w-[75%]">
        <div className="flex items-center justify-between pr-20">
          <div className="flex items-center">
            <img
              src={company.user?.profile}
              alt={company.user?.username}
              className="w-96 p-12"
            />
            <div className="flex flex-col text-black font-bold text-2xl gap-y-4">
              <span className="flex gap-x-5">
                <span>Company Name:</span>
                {company.user?.fullName}
              </span>
              <span className="flex gap-x-9">
                <span>Phone number:</span>
                {company.user?.phone}
              </span>
              <span className="flex gap-x-3">
                <span>Location:</span>
                <span>{company.user?.city?.name}</span>
              </span>
            </div>
          </div>
          <div className="flex items-center flex-col">
            <div className="flex justify-center items-center text-xl">
              <span>200 </span>
              <div className="ml-2 cursor-pointer" onClick={handleLike}>
                {like ? <FaHeart size={25} /> : <CiHeart size={25} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dark:bg-slate-400 bg-slate-200 rounded-2xl w-[75%] z-0">
        {companyLoading ? (
          <h3>Loading...</h3>
        ) : (
          <Map location={company.location} />
        )}
      </div>

      <div className="bg-slate-300 dark:bg-slate-500 rounded-lg w-[75%] h-20 flex items-center pl-4">
        <FaCarRear size={44} className="font-bold text-secondary mr-2" />
        <h1 className="text-3xl font-extrabold">cars</h1>
      </div>
      <div className="flex gap-10">
        {carLoading ? (
          <h3>Loading...</h3>
        ) : (
          cars.map((car) => <CarCard key={car._id} car={car} />)
        )}
      </div>
      <div className="w-[90%]">
        <Comment id={id} />
      </div>
    </div>
  );
}
