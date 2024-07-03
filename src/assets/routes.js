import { FiHome } from "react-icons/fi";
import { MdBusiness, MdDirectionsCar } from "react-icons/md";

import { PiChatCircleBold } from "react-icons/pi";

export const routes = [
  {
    title: "Home",
    href: "/",
    Icon: FiHome,
  },
  {
    title: "Companies",
    href: "company",
    Icon: MdBusiness,
  },
  {
    title: "Cars",
    href: "cars",
    Icon: MdDirectionsCar,
  },
  {
    title: "About",
    href: "#",
    Icon: PiChatCircleBold,
  },
];
