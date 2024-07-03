import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CompanyCard({ company }) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/Company-Details/${company._id}`);
  };

  const { t } = useTranslation();

  return (
    <div
      onClick={handleNavigate}
      className="bg-slate-900 border-white border-opacity-50 border-2 rounded-lg p-10 flex gap-y-5 flex-col md:flex-row justify-center items-center md:pr-16"
    >
      <img
        src={company.profile}
        alt={company.username}
        className="w-auto h-28 rounded-2xl mr-5 "
      />
      <div className="flex-grow flex flex-col md:block items-center">
        <h2 className="text-white text-2xl font-bold  md:text-start text-center">
          {company.fullName}
        </h2>
        <p className="text-gray-400 text-xl">{company.city.name}</p>
        <div className="flex mt-1">
          <div class="flex items-center">
            <svg
              class="w-4 h-4 text-yellow-300 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </div>
        </div>
      </div>
      <button className="bg-secondary text-black py-2 px-4 rounded-lg w-28 h-12 text-xl font-bold ">
        {t("View")}
      </button>
    </div>
  );
}
