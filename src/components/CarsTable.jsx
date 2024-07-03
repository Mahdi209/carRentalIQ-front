import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddCarDetailsForm from "./AddCarDetailsForm";
import { getMyCompanyCars } from "../store/API/car";
import CarRow from "./carRow";

export default function CarsTable() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyCompanyCars());
  }, [dispatch]);

  const { isLoading: carLoading, data: car } = useSelector(
    (state) => state.cars.myCompanyCar
  );

  return (
    <div className="w-full h-full p-4 text-dark dark:text-white text-xl pt-12">
      <div className="overflow-x-auto">
        <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <Table.Head className="text-lg bg-gray-100 dark:bg-gray-800">
            <Table.HeadCell className="dark:text-white">
              Car Name
            </Table.HeadCell>
            <Table.HeadCell className="dark:text-white">Type</Table.HeadCell>
            <Table.HeadCell className="dark:text-white">Status</Table.HeadCell>
            <Table.HeadCell className="dark:text-white">
              Price Per Day
            </Table.HeadCell>
            <Table.HeadCell className="dark:text-white">
              Price Per Week
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y dark:divide-gray-700">
            {carLoading ? (
              <Table.Row className="bg-white dark:bg-gray-800">
                <Table.Cell colSpan="6" className="text-center dark:text-white">
                  Loading...
                </Table.Cell>
              </Table.Row>
            ) : (
              car.map((car) => <CarRow key={car.id} car={car} />)
            )}
          </Table.Body>
        </Table>
      </div>
      <AddCarDetailsForm />
    </div>
  );
}
