import React, { useEffect, useState } from "react";
import {
  Button,
  Label,
  Select,
  TextInput,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Spinner,
} from "flowbite-react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  createCarDetailsCar,
  getCarCompany,
  getCarType,
  getCars,
  getCarsByCompany,
  getMyCompanyCars,
} from "../store/API/car";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCarDetailsForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user } = useSelector((state) => state.auth.user);
  const {
    isLoading: isCreatingCar,
    isSuccess: isCarCreated,
    error: createCarError,
  } = useSelector((state) => state.cars.createCarDetails);

  const carCompany = useSelector((state) => state.cars.carCompany);
  const { data: carCompanyData, isLoading: carCompanyIsLoading } = useSelector(
    (state) => state.cars.carsByCompany
  );

  const [isOpen, setIsOpen] = useState(false);
  const [carData, setCarData] = useState({
    carCompany: "",
    carName: "",
    color: "",
    year: "",
    pricePerDay: "",
    pricePerWeek: "",
    company: user.id,
    image: null,
  });

  useEffect(() => {
    dispatch(getCarCompany());
    dispatch(getCarType());
    dispatch(getCars());
  }, [dispatch]);

  useEffect(() => {
    if (carData.carCompany) {
      dispatch(getCarsByCompany(carData.carCompany));
    }
  }, [carData.carCompany, dispatch]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setCarData({ ...carData, image: file });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/jpg, image/png",
  });

  const handleNavigate = () => {
    navigate("/newCar");
  };

  const handleSubmit = () => {
    if (
      carData.carCompany &&
      carData.carName &&
      carData.color &&
      carData.year &&
      carData.pricePerDay &&
      carData.pricePerWeek &&
      carData.image
    ) {
      dispatch(createCarDetailsCar(carData)).then(() => {
        if (isCarCreated) {
          toast.success("Car created successfully.");
          setIsOpen(false);
        } else if (createCarError) {
          toast.error(`Error creating car: ${createCarError.message}`);
        }
      });
    } else {
      toast.warn("Please fill in all required fields.");
    }
    dispatch(getMyCompanyCars());
  };

  return (
    <div className="w-full flex justify-center items-center my-16 text-black">
      <Button
        className="dark:bg-slate-500 dark:text-white bg-slate-600 text-white font-extrabold text-xl w-56 h-16 flex justify-center items-center "
        onClick={() => setIsOpen(true)}
      >
        Add New Car
      </Button>

      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>Add New Car</ModalHeader>
        <ModalBody>
          <form className="space-y-6">
            {/* Car Company */}
            <div>
              <Label htmlFor="carCompany" value="Car Company" />
              <Select
                id="carCompany"
                value={carData.carCompany}
                onChange={(e) =>
                  setCarData({ ...carData, carCompany: e.target.value })
                }
                required
              >
                {carCompany.isLoading ? (
                  <option value={"Loading"}>Loading...</option>
                ) : (
                  carCompany.data.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))
                )}
              </Select>
            </div>

            {/* Car Name */}
            <div>
              <Label htmlFor="carName" value="Car Name" />
              <Select
                id="carName"
                value={carData.carName}
                onChange={(e) =>
                  setCarData({ ...carData, carName: e.target.value })
                }
                required
              >
                {carCompanyIsLoading ? (
                  <option value="" disabled>
                    <Spinner size="sm" className="mr-2" />
                    Loading...
                  </option>
                ) : (
                  <>
                    <option value="" disabled>
                      select
                    </option>
                    {carCompanyData.map((car) => (
                      <option key={car._id} value={car._id}>
                        {car.carName}
                      </option>
                    ))}
                  </>
                )}
              </Select>
              <Button
                onClick={handleNavigate}
                className="mt-2 dark:bg-secondary dark:text-black font-bold bg-slate-600 text-white"
              >
                Add New Car
              </Button>
            </div>

            {/* Color */}
            <div>
              <Label htmlFor="color" value="Color" />
              <TextInput
                id="color"
                placeholder="Enter car color"
                value={carData.color}
                onChange={(e) =>
                  setCarData({ ...carData, color: e.target.value })
                }
                required
              />
            </div>

            {/* Year */}
            <div>
              <Label htmlFor="year" value="Year" />
              <TextInput
                id="year"
                type="number"
                min={1900}
                max={new Date().getFullYear()}
                placeholder="Enter car model"
                value={carData.year}
                onChange={(e) =>
                  setCarData({ ...carData, year: e.target.value })
                }
                required
              />
            </div>

            {/* Price per Day */}
            <div>
              <Label htmlFor="pricePerDay" value="Price per Day (IQD)" />
              <TextInput
                id="pricePerDay"
                type="number"
                placeholder="Enter car price per day"
                min={0}
                value={carData.pricePerDay}
                onChange={(e) =>
                  setCarData({ ...carData, pricePerDay: e.target.value })
                }
                required
              />
            </div>

            {/* Price per Week */}
            <div>
              <Label htmlFor="pricePerWeek" value="Price per Week (IQD)" />
              <TextInput
                id="pricePerWeek"
                type="number"
                placeholder="Enter car price per week"
                min={0}
                value={carData.pricePerWeek}
                onChange={(e) =>
                  setCarData({ ...carData, pricePerWeek: e.target.value })
                }
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="image" value="Image" />
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-300 rounded p-4 text-center"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
              {carData.image && (
                <img
                  src={URL.createObjectURL(carData.image)}
                  alt="Car"
                  className="mt-4"
                />
              )}
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            className="bg-secondary text-black"
            onClick={handleSubmit}
            disabled={isCreatingCar}
          >
            {isCreatingCar ? <Spinner size="sm" className="mr-2" /> : "Save"}
          </Button>
          <Button className="bg-slate-900" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <ToastContainer />
    </div>
  );
}
