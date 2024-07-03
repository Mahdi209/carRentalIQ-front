import { Footer } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function MyFooter() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const years = new Date().getFullYear();
  return (
    <Footer container className="rounded-none bg-gray-800">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright by="CarRentalIQ" className="text-xl" />
          <Footer.LinkGroup className="text-xl">
            <Footer.Link
              className="hover:text-secondary"
              onClick={() => navigate("/")}
            >
              {t("Home")}
            </Footer.Link>
            <Footer.Link
              className="hover:text-secondary"
              onClick={() => navigate("/company")}
            >
              {t("Companies")}
            </Footer.Link>
            <Footer.Link
              className="hover:text-secondary"
              onClick={() => navigate("/cars")}
            >
              {t("Cars")}
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          className="text-base"
          by={t("Travel Smart, Travel Safe with Iraq Rental Car")}
          year={years}
        />
      </div>
    </Footer>
  );
}
