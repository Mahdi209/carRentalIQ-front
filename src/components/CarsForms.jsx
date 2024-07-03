import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  VStack,
  useToast,
  Tag,
  TagLabel,
  TagCloseButton,
  Spinner,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { createNewCar, getCarCompany, getCarType } from "../store/API/car";
import { useNavigate } from "react-router-dom";

export default function CarsForms() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { isLoading: isLoadingCompany, data: carCompanyData } = useSelector(
    (state) => state.cars.carCompany
  );
  const { isLoading: isLoadingType, data: carTypeData } = useSelector(
    (state) => state.cars.carType
  );
  const {
    isLoading: isCreatingCar,
    isSuccess: isCarCreated,
    error: createCarError,
  } = useSelector((state) => state.cars.createCar);

  const [carData, setCarData] = useState({
    carName: "",
    company: "",
    seats: "",
    engine: "",
    carTypes: [],
    Gear: "",
  });
  const [selectedCarTypeId, setSelectedCarTypeId] = useState("");
  const toast = useToast();

  useEffect(() => {
    dispatch(getCarCompany());
    dispatch(getCarType());
  }, [dispatch]);
  const handleAddCarType = () => {
    const selectedCarType = carTypeData.find(
      (type) => type._id === selectedCarTypeId
    );

    if (
      selectedCarType &&
      !carData.carTypes.some((ct) => ct.id === selectedCarTypeId)
    ) {
      setCarData({
        ...carData,
        carTypes: [
          ...carData.carTypes,
          { id: selectedCarTypeId, name: selectedCarType.name },
        ],
      });
      setSelectedCarTypeId("");
    } else {
      toast({
        title: "Invalid Car Type",
        description: "Please select a valid car type or avoid duplicates.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (isCarCreated) {
      toast({
        title: "Success",
        description: "Car created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setCarData({
        carName: "",
        company: "",
        seats: "",
        engine: "",
        carTypes: [],
        Gear: "",
      });
      dispatch({ type: "cars/resetCreateCarState" });
    }
  }, [isCarCreated, toast, dispatch]);

  useEffect(() => {
    if (createCarError) {
      toast({
        title: "Error",
        description: createCarError,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [createCarError, toast]);

  const handleRemoveCarType = (carTypeIdToRemove) => {
    setCarData({
      ...carData,
      carTypes: carData.carTypes.filter(
        (carType) => carType.id !== carTypeIdToRemove
      ),
    });
  };

  const handleSubmit = () => {
    const carTypeIds = carData.carTypes.map((ct) => ct.id);
    const newCar = { ...carData, carTypes: carTypeIds };
    dispatch(createNewCar(newCar));
    setTimeout(() => navigate("/Dashboard/MyCars"), 2000);
  };

  return (
    <div className="w-[100%] flex justify-center mt-16 h-[71vh]">
      <VStack width="60%" spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Car Company</FormLabel>
          <Select
            placeholder={isLoadingCompany ? "Loading..." : "Select Company"}
            value={carData.company}
            onChange={(e) =>
              setCarData({ ...carData, company: e.target.value })
            }
            isDisabled={isLoadingCompany}
          >
            {isLoadingCompany ? (
              <option value="" disabled>
                <Spinner size="sm" /> Loading...
              </option>
            ) : (
              carCompanyData &&
              carCompanyData.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))
            )}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Car Name</FormLabel>
          <Input
            placeholder="Enter car name"
            value={carData.carName}
            onChange={(e) =>
              setCarData({ ...carData, carName: e.target.value })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Engine</FormLabel>
          <Input
            placeholder="Enter car Engine example v4 or v6 engine"
            value={carData.engine}
            onChange={(e) => setCarData({ ...carData, engine: e.target.value })}
          />
        </FormControl>

        {/* Gear */}
        <FormControl>
          <FormLabel>Gear</FormLabel>
          <Select
            placeholder="Select Gear Type"
            value={carData.Gear}
            onChange={(e) => setCarData({ ...carData, Gear: e.target.value })}
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Seats</FormLabel>
          <NumberInput min={1} max={10}>
            <NumberInputField
              value={carData.seats}
              placeholder="Enter car seats example 5 or 7 engine"
              onChange={(e) =>
                setCarData({ ...carData, seats: parseInt(e.target.value) })
              }
            />
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Car Type</FormLabel>
          <Select
            placeholder={isLoadingType ? "Loading..." : "Select Type"}
            value={selectedCarTypeId} // Bind to selectedCarTypeId (ID)
            onChange={(e) => setSelectedCarTypeId(e.target.value)}
            isDisabled={isLoadingType}
          >
            {isLoadingType ? (
              <option value="" disabled>
                <Spinner size="sm" /> Loading...
              </option>
            ) : (
              carTypeData.map((type) => (
                <option key={type.id} value={type._id}>
                  {type.name}
                </option>
              ))
            )}
          </Select>
          <Button mt={2} onClick={handleAddCarType}>
            Add Car Type
          </Button>
        </FormControl>

        {/* Display Selected Car Types as Tags */}
        <Box mt={2}>
          {carData.carTypes.map((carType) => (
            <Tag
              key={carType.id}
              size="md"
              borderRadius="full"
              variant="solid"
              colorScheme="blue"
              m={1}
            >
              <TagLabel>{carType.name}</TagLabel>
              <TagCloseButton onClick={() => handleRemoveCarType(carType.id)} />
            </Tag>
          ))}
        </Box>

        <Button colorScheme="teal" onClick={handleSubmit}>
          Submit
        </Button>
      </VStack>
    </div>
  );
}
