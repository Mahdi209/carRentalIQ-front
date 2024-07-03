import { useTranslation } from "react-i18next";
import experience from "../assets/experience";

export default function ExperienceSection() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center flex-col gap-y-16 bg-slate-700 text-white dark:bg-slate-200 dark:text-black rounded-2xl w-[90%] xl:w-[60%] h-auto px-16 py-16 my-16">
      <h2 className="text-3xl w-96 flex text-center font-bold">
        {t("Feel the best experience with our luxury car")}
      </h2>
      <div className="flex flex-col xl:flex-row gap-x-12 gap-y-12">
        {experience.map((exp) => (
          <div
            key={exp.id}
            className="w-80 text-center flex flex-col items-center text-base"
          >
            <div className="flex flex-col items-center">
              {exp.icon && <exp.icon className="text-6xl font-bold mb-5" />}
              <p className="text-xl font-bold">{t(exp.title)}</p>
            </div>
            <p>{t(exp.description)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
