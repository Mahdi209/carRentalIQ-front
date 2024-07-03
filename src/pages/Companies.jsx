import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa6";
import CompanyCard from "../components/CompanyCard";
import { getCity, getCompany } from "../store/API/auth";
import LoadingPage from "./LoadingPage";
import { useTranslation } from "react-i18next";

export default function Companies() {
  const dispatch = useDispatch();
  const [selectedCityId, setSelectedCityId] = useState("");

  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(getCompany());
    dispatch(getCity());
  }, [dispatch]);

  const { data: city, isLoading: cityLoading } = useSelector(
    (state) => state.auth.city
  );
  const { data: companyCard, isLoading: loading } = useSelector(
    (state) => state.auth.companyCard
  );

  const handleCityChange = (e) => {
    setSelectedCityId(e.target.value);
  };

  return (
    <div className="pb-12 overflow-y-auto h-[78vh]">
      <div className="ml-16 lg:ml-36 mr-16 mt-12 lg:mr-24 mb-12 text-black">
        <select
          value={selectedCityId}
          onChange={handleCityChange}
          className="border p-1 rounded-lg dark:bg-slate-200 text-black h-12 pl-3"
        >
          <option value="">{t("All")}</option>
          {city &&
            city.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className="mx-16 lg:mx-36 flex flex-col gap-y-10">
        {loading ? (
          <LoadingPage />
        ) : (
          companyCard
            .filter(
              (company) =>
                !selectedCityId || company.city._id === selectedCityId
            )
            .map((company) => (
              <CompanyCard key={company._id} company={company} />
            ))
        )}
      </div>
    </div>
  );
}
