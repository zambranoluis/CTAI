"use client";

const theme = "dark";

import { Image } from "@nextui-org/react";

import { FaUserCircle, FaHome } from "react-icons/fa";
import { IoStorefront } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { RiUserForbidFill } from "react-icons/ri";
import { HiInformationCircle } from "react-icons/hi";
import { FaShopLock } from "react-icons/fa6";
import { TbFaceId } from "react-icons/tb";
import { FaUsersSlash } from "react-icons/fa6";
import { FaCashRegister } from "react-icons/fa6";
import { PiShieldWarningFill } from "react-icons/pi";
import { BsConeStriped } from "react-icons/bs";

const fieldsConfigNewAccount = [
  { id: 0, name: "userName", label: "Username", type: "text", placeholder: "Username" },
  {
    id: 1,
    name: "givenName",
    label: "First Name",
    type: "text",
    placeholder: "First Name",
  },
  {
    id: 2,
    name: "familyName",
    label: "Last Name",
    type: "text",
    placeholder: "Last Name",
  },
  { id: 3, name: "email", label: "Email", type: "email", placeholder: "Email" },
  {
    id: 4,
    name: "password1",
    label: "Password",
    type: "password",
    placeholder: "Password",
  },
  {
    id: 5,
    name: "password2",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm the Password",
  },
  { id: 6, name: "address", label: "Address", type: "text", placeholder: "Address" },
  { id: 7, name: "phone", label: "Phone", type: "number", placeholder: "Phone" },
  {
    id: 8,
    name: "birthDate",
    label: "Birth Date",
    type: "date",
    placeholder: "Birth Date",
  },
];

const establishmentFieldsConfig = [
  { id: "name", label: "Name", name: "name", placeholder: "Establishment Name" },
  {
    id: "address",
    label: "Address",
    name: "address",
    placeholder: "Establishment Address",
  },
  { id: "phone", label: "Phone", name: "phone", placeholder: "15555551234" },
  {
    id: "phonesNotify",
    name: "phonesNotify",
    label: "Notification Phones",
    type: "text",
    placeholder: "Add phone numbers",
  },
];

// Definir la configuración de los campos del formulario después de confirmar que `profileData` está disponible
const profileFieldsConfig = [
  {
    id: 0,
    label: "First Name",
    name: "givenName",
    type: "text",
  },
  {
    id: 1,
    label: "Last Name",
    name: "familyName",
    type: "text",
  },
  {
    id: 2,
    label: "Address",
    name: "address",
    type: "text",
  },
  {
    id: 3,
    label: "Phone",
    name: "phone",
    type: "number",
  },
  {
    id: 4,
    label: "Birth Date",
    name: "birthDate",
    type: "date",
  },
  {
    id: 5,
    label: "Email",
    name: "email",
    type: "text",
  },
];

const asideFieldsConfig = [
  {
    id: 0,
    icon: <FaHome size={25} />,
    label: `Home`,
    section: "home",
  },
  {
    id: 1,
    icon: <FaUserCircle size={25} />,
    label: `Profile`,
    section: "profile",
  },
  {
    id: 2,
    icon: <IoStorefront size={25} />,
    label: `Establishments`,
    section: "establishment",
  },
  {
    id: 3,
    icon: <IoIosPeople size={25} />,
    label: `People Flow`,
    section: "people-flow",
  },
  {
    id: 4,
    icon: <PiShieldWarningFill size={25} />,
    label: "Shoplifting",
    section: "shoplifting",
  },
  {
    id: 5,
    icon: <BsConeStriped size={25} />,
    label: `Restricted Area`,
    section: "restricted-area",
  },
  {
    id: 6,
    icon: <TbFaceId size={25} />,
    label: `Recognition`,
    section: "face-recognition",
  },
  // {
  //   id: 7,
  //   link: "https://github.com/BPM94/CDNMD/raw/main/CTM/cashierAlert.svg",
  //   label: `Cashier Alerts`,
  //   section: "cashier-alerts",
  // },
  {
    id: 9,
    icon: <HiInformationCircle size={25} />,
    label: `Information`,
    section: "information",
  },
  {
    id: 10,
    link: "",
    icon: (
      <svg
        version='1.0'
        xmlns='http://www.w3.org/2000/svg'
        width='437.000000pt'
        height='387.000000pt'
        viewBox='0 0 437.000000 387.000000'
        preserveAspectRatio='xMidYMid meet'>
        <g
          transform='translate(0.000000,387.000000) scale(0.100000,-0.100000)'
          fill='#000000'
          stroke='none'>
          <path
            d='M2595 3556 c-185 -37 -325 -130 -425 -282 -74 -113 -95 -192 -95
   -354 1 -120 4 -142 27 -202 75 -197 223 -341 413 -401 58 -18 92 -22 200 -21
   114 0 138 4 197 26 207 78 360 245 413 448 24 92 16 280 -15 368 -31 88 -105
   197 -179 264 -67 60 -192 128 -271 146 -80 19 -191 22 -265 8z'
          />
          <path
            d='M1277 3512 c-36 -22 -517 -872 -517 -914 0 -15 11 -40 24 -55 l24
   -28 512 0 512 0 25 29 c18 21 24 38 21 60 -2 17 -114 226 -248 465 -274 485
   -278 490 -353 443z m118 -265 c6 -23 -29 -350 -41 -380 -7 -20 -47 -22 -62 -4
   -14 16 -55 361 -47 388 6 16 16 19 75 19 64 0 70 -2 75 -23z m-22 -485 c28
   -24 23 -86 -9 -111 -35 -28 -69 -26 -99 4 -72 71 31 174 108 107z'
          />
          <path
            d='M732 2240 c-14 -23 -17 -426 -3 -449 7 -11 43 -13 172 -12 90 1 170
   -3 177 -7 9 -6 12 -30 10 -82 l-3 -73 -156 2 c-86 1 -167 -1 -181 -4 -28 -7
   -37 -29 -68 -160 -63 -268 -70 -313 -70 -395 1 -47 1 -138 1 -202 l-1 -118
   -75 0 -75 0 0 -95 0 -95 1750 0 1750 0 0 95 0 95 -90 0 -90 0 0 340 c0 384 -7
   443 -65 568 -83 177 -234 308 -460 398 -44 17 -109 46 -145 63 -200 95 -487
   105 -697 25 -37 -14 -110 -41 -162 -60 -176 -64 -286 -127 -383 -220 -71 -67
   -147 -168 -155 -204 l-5 -29 -145 -3 c-101 -2 -148 1 -154 9 -6 6 -9 42 -7 80
   l3 68 174 2 c131 1 176 5 182 15 5 7 9 108 9 223 -1 159 -4 214 -14 228 -12
   16 -49 17 -512 17 -487 0 -499 0 -512 -20z m878 -217 l0 -73 -365 0 -365 0 0
   73 0 72 365 0 365 0 0 -72z'
          />
        </g>
      </svg>
    ),
  },
];

export {
  fieldsConfigNewAccount,
  establishmentFieldsConfig,
  profileFieldsConfig,
  asideFieldsConfig,
};
