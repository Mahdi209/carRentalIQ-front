import React, { useState } from "react";
import { FaEdit, FaRegSave } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Table, Spinner, Toast } from "flowbite-react";
import { useDispatch } from "react-redux";
import { getCarsDetails, getMyCompanyCars, updateCars } from "../store/API/car";
import { ToastContainer, toast } from "react-toastify";

export default function CarRow({ car }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [carData, setCarData] = useState({
    pricePerDay: car.pricePerDay,
    pricePerWeek: car.pricePerWeek,
    status: car.status,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hover, setHover] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await dispatch(updateCars({ id: car._id, carData }));
    } catch (error) {
      toast.error(`Error creating car: ${error.message}`);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      dispatch(getMyCompanyCars());
      dispatch(getCarsDetails());
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const returnStatus = (status) => (status ? "Available" : "Rented");
  return (
    <>
      <Table.Row
        key={car.id}
        className="bg-white dark:border-gray-700 dark:bg-gray-800 text-xl cursor-pointer "
      >
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white relative">
          <span className="mr-2 font-bold">{car.car.carCompany.name}</span>
          <span className="font-bold">{car.car.carName}</span>
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {car.car.carTypes.map((type) => (
            <span
              className="bg-secondary mr-1 rounded-lg p-1 text-black"
              key={type._id}
            >
              {type.name}
            </span>
          ))}
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {isOpen ? (
            <select
              name="status"
              className="text-black"
              value={carData.status}
              onChange={handleChange}
            >
              <option value="true">Available</option>
              <option value="false">Rented</option>
            </select>
          ) : (
            returnStatus(car.status)
          )}
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {isOpen ? (
            <input
              type="text"
              name="pricePerDay"
              value={carData.pricePerDay}
              onChange={handleChange}
              className="text-black"
            />
          ) : (
            car.pricePerDay
          )}
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {isOpen ? (
            <input
              type="text"
              name="pricePerWeek"
              value={carData.pricePerWeek}
              onChange={handleChange}
              className="text-black"
            />
          ) : (
            car.pricePerWeek
          )}
        </Table.Cell>
        <Table.Cell className="w-36 flex justify-center items-center">
          {isLoading ? (
            <Spinner />
          ) : isOpen ? (
            <div className="flex">
              <FaRegSave
                onClick={handleSave}
                className="text-secondary text-xl mr-5 hover:text-yellow-500"
              />
              <IoCloseCircleOutline
                onClick={handleClose}
                className="text-secondary text-xl hover:text-red-500"
              />
            </div>
          ) : (
            <FaEdit
              onClick={handleOpen}
              className="text-secondary text-xl hover:text-yellow-500"
            />
          )}
        </Table.Cell>
      </Table.Row>
      <ToastContainer />
    </>
  );
}
