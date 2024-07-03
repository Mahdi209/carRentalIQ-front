import { Link } from "react-router-dom";
import cadillac from "../assets/cadillac.png";
import line from "../assets/line.png";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t, i18n } = useTranslation(); // Get i18n instance
  const isRTL = i18n.language === "ar"; // Determine if RTL

  return (
    <section
      className={`relative w-[80%] bg-primary mt-12 rounded-3xl flex justify-center h-[55vh] bg-cover bg-center bg-no-repeat ${
        isRTL ? "flex-row-reverse" : ""
      }`}
      style={{ backgroundImage: `url(${line})` }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0  " />
      <div
        className={`relative container h-full flex mx-10 ${
          isRTL ? "flex-row" : "flex-col-reverse xl:flex-row"
        } items-center justify-center px-4 md:px-6 text-right md:text-${
          isRTL ? "right" : "left"
        } text-white`}
      >
        {" "}
        <div className="md:w-[70%]">
          <h1 className="text-2xl font-home font-bold tracking-tighter sm:text-2xl md:text-2xl lg:text-5xl xl:text-7xl stroke-2">
            {t("Effortless Car Rentals at Your Fingertips")}
          </h1>
          <p className="max-w-[600px] mt-4 text-lg md:text-xl font-bold shadow-lg">
            {t(
              "Discover the ultimate convenience of car rentals with our seamless online booking and flexible options."
            )}
          </p>

          <Link
            className="inline-flex mt-10 h-14 items-center justify-center rounded-md bg-secondary px-8 text-base lg:text-2xl font-bold text-gray-900 shadow transition-colors hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            {t("Explore")}
          </Link>
        </div>
        <div className="hidden lg:flex md:w-1/2 md:justify-center">
          <img
            src={cadillac}
            alt="Car Image"
            width={900}
            height={700}
            className="max-w-[900px] max-h-[700px]  object-contain"
          />
        </div>
      </div>
    </section>
  );
}
