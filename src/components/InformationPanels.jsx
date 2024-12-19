import { useState, useEffect } from "react";
import axios from "axios";

import { MdLocationPin } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { TbBorderRadius } from "react-icons/tb";

import { TiSocialInstagram } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialYoutube } from "react-icons/ti";
import { link } from "@nextui-org/theme";
import { set } from "date-fns";

const DisplayHowToUse = () => {
  return <></>;
};

export { DisplayHowToUse };

const DisplayVideo = () => {
  const [card1, setCard1] = useState(true);
  const [card2, setCard2] = useState(false);

  const showCard = (cardHeader) => {
    switch (cardHeader) {
      case "card1":
        const card1 = document.getElementById("text_card1");
        if (card1.classList.contains("hidden")) {
          card1.classList.remove("hidden");
          setCard1(true);
        } else {
          card1.classList.add("hidden");
          setCard1(false);
        }

        break;

      case "card2":
        const card2 = document.getElementById("text_card2");
        if (card2.classList.contains("hidden")) {
          card2.classList.remove("hidden");
          setCard2(true);
        } else {
          card2.classList.add("hidden");
          setCard2(false);
        }
    }
  };

  return (
    <div className='flex   w-full h-full justify-center items-center flex-col '>
      <div className='w-full h-full flex flex-col  relative '>
        <div className='flex w-full h-full absolute z-[10]  '>
          <video className='object-cover w-full h-full rounded-lg ' autoPlay loop muted>
            <source
              src='https://github.com/BPM94/CDNMD/raw/main/CTM/videoInformationW.webm'
              type='video/webm'
            />
          </video>
        </div>
        <div className='z-[60] lg:w-[60%] w-full flex flex-col justify-end h-full'>
          <div className='z-[30] w-full  flex select-none flex-col p-2 justify-end  '>
            <div
              style={{ borderRadius: card1 ? "8px 8px 0px 0px" : "8px 8px 8px 8px" }}
              className={` bg-red-600 w-full max-w-[400px] ${
                card1 ? "rounded-t-lg" : "rounded-lg"
              } flex justify-start items-center p-2 hover:cursor-pointer`}
              onClick={(e) => {
                e.preventDefault();
                showCard("card1");
              }}>
              <h1 className='text-white text-xl font-black  w-full '>
                How does our AI work?
              </h1>
              <img
                className='flex md:hidden drop-shadow-lg h-[40px] w-[40px]'
                src='https://github.com/BPM94/CDNMD/raw/main/CTM/punteroSmallWhite.png'
                alt='icono interactuar con el video mobile'
              />
              <img
                className='max-md:hidden drop-shadow-lg flex h-[40px] w-[40px]'
                src='https://github.com/BPM94/CDNMD/raw/main/CTM/punteroLargeWhite.png'
                alt='icono interactuar con el video Desktop'
              />
            </div>
            <div
              id='text_card1'
              className={`flex w-full  p-4 bg-[--color-background] rounded-b-lg md:rounded-r-lg`}>
              <p className='text-[--color-text]  font-bold rounded-b-lg md:rounded-r-lg w-full text-sm lg:text-base  text-justify '>
                This AI uses computer vision to analyze videos, identifying objects and
                people in real time. It can detect clothing, accessories, and suspicious
                behavior. This AI acts as a virtual security guard, protecting your
                establishments.
              </p>
            </div>
          </div>

          <div className='z-[30] w-full flex select-none flex-col p-2 justify-end  '>
            <div
              style={{ borderRadius: card2 ? "8px 8px 0px 0px" : "8px 8px 8px 8px" }}
              className={` bg-red-600 w-full max-w-[400px] ${
                card2 ? "rounded-t-lg" : "rounded-t-lg"
              } flex justify-start items-center p-2 hover:cursor-pointer`}
              onClick={(e) => {
                e.preventDefault();
                showCard("card2");
              }}>
              <h1 className='text-white text-xl font-black  w-full '>
                What services do we offer?
              </h1>
              <img
                className='flex md:hidden drop-shadow-lg h-[40px] w-[40px]'
                src='https://github.com/BPM94/CDNMD/raw/main/CTM/punteroLargeWhite.png'
                alt='icono interactuar con el video mobile'
              />
              <img
                className='max-md:hidden drop-shadow-lg flex h-[40px] w-[40px]'
                src='https://github.com/BPM94/CDNMD/raw/main/CTM/punteroSmallWhite.png'
                alt='icono interactuar con el video Desktop'
              />
            </div>
            <div
              id='text_card2'
              className='flex hidden bg-[--color-background] rounded-b-lg md:rounded-r-lg  p-4'>
              <p className='text-[--color-text] rounded-b-lg md:rounded-r-lg font-bold  w-full text-sm lg:text-base  text-justify '>
                Business Intelligence, Behavioral Learning, Home Security, Facial
                Recognition, Drone Surveillance, Network Security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DisplayVideo };

const missionVisionTable = [
  {
    id: "mission",
    title: "Our Mission",
    text: "To provide the most proficient AI security service  that is competitively priced, making it accessible to a wide range of customers. This allows our customers to get the security protection they need without breaking the bank and protecting their lives and loveones.",
  },
  {
    id: "vision",
    title: "Our Vision",
    text: "To become the number 1 software company providing sophisticated machine learning and Artificial Intelligent technologies which solves complex problems quickly and effectively over the competition, unmatched by any in Jamaica and the entire Caribbean.",
  },
];

export { missionVisionTable };

const DisplayAboutUs = () => {
  const [currentTable, setCurrentTable] = useState("mission");

  const handleMissionVission = (table) => {
    if (table === "mission") {
      setCurrentTable("mission");
    } else {
      setCurrentTable("vision");
    }
  };

  return (
    <div className='flex flex-col w-full lg:w-[60%] h-full overflow-y-scroll noScrollBar'>
      <div className='flex flex-col h-full w-full  '>
        <h3 className='text-[#ca0000] text-sm sm:text-lg font-bold '>
          A Solution That Saves Lives And Protects Businesses.
        </h3>
        <h1 className='text-2xl font-black mt-4'>Reliable, 24/7 Object Detection</h1>
        <p className=' text-md text-justify mt-4'>
          Our AI-powered visual Gun Detect Software leverages your existing security
          cameras to create a widely deployable early custom detection solution. In
          fractions of a second, our AI identifies threats and sends an alert for human
          verification; whether you use Crimsontide AI’s monitoring services or your own
          security operations center. Early detections of threats are critical, but only
          the first step to protecting people and businesses from criminals.
        </p>
      </div>

      <div
        id='tableMissionVision'
        className=' shadow-md shadow-[--color-text] h-full  flex flex-col   mt-4  lg:place-self-center '>
        <div className='flex justify-between '>
          <div
            className={` hover:cursor-pointer w-[50%]  p-4 ${
              currentTable === "mission" ? "bg-[--color-background]" : ""
            }  `}
            onClick={(e) => {
              e.preventDefault();
              handleMissionVission("mission");
            }}>
            <p
              className={`text-center font-black text-xl ${
                currentTable === "mission" ? "text-[#ca0000]" : ""
              }`}>
              Our Mission
            </p>
          </div>
          <div
            className={` hover:cursor-pointer w-[50%]  p-4  ${
              currentTable === "vision" ? "bg-[--color-background]" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleMissionVission("vision");
            }}>
            <p
              className={`text-center font-black text-xl ${
                currentTable === "vision" ? "text-[#ca0000]" : ""
              }`}>
              Our Vision
            </p>
          </div>
        </div>
        <div className='p-4 bg-[--color-background] '>
          <p className='text-justify text-sm sm:text-lg text-[--color-text]'>
            {currentTable === "mission"
              ? missionVisionTable[0].text
              : missionVisionTable[1].text}
          </p>
        </div>
      </div>
    </div>
  );
};

export { DisplayAboutUs };

const DisplayContactUs = () => {
  const [selectedOption, setSelectedOption] = useState("location");

  const handleShowContact = (option) => {
    switch (option) {
      case "location":
        setSelectedOption("location");
        break;
      case "email":
        setSelectedOption("email");
        break;
      case "phone":
        setSelectedOption("phone");
        break;
    }
  };

  return (
    <div className='w-full h-full flex flex-col '>
      <div className=' p-2 flex flex-col w-full h-full'>
        <div className='flex w-full md:w-[50%] '>
          <div
            className={`flex w-full p-2 hover:cursor-pointer justify-start transition-all duration-300   ${
              selectedOption === "location"
                ? "bg-[--color-background] text-[#ca0000] "
                : " "
            } rounded-t-lg flex-col items-center`}
            onClick={(e) => {
              e.preventDefault();
              handleShowContact("location");
            }}>
            <MdLocationPin className='text-3xl  ' />
            <h1 className='text-2xl  font-bold dropshadow-animate'>Location</h1>
          </div>
          <div
            className={`flex w-full p-2 hover:cursor-pointer justify-start transition-all duration-300   ${
              selectedOption === "email"
                ? "bg-[--color-background]  text-[#ca0000] "
                : " "
            } rounded-t-lg flex-col items-center`}
            onClick={(e) => {
              e.preventDefault();
              handleShowContact("email");
            }}>
            <MdEmail className='text-3xl  ' />
            <h1 className='text-2xl  font-bold '>Email </h1>
          </div>
          <div
            className={`flex w-full p-2 hover:cursor-pointer justify-start transition-all duration-300    ${
              selectedOption === "phone" ? "bg-[--color-background]  text-[#ca0000]" : " "
            } rounded-t-lg flex-col items-center`}
            onClick={(e) => {
              e.preventDefault();
              handleShowContact("phone");
            }}>
            <FaPhoneAlt className='text-3xl  ' />
            <h1 className='text-2xl  font-bold '>Phone</h1>
          </div>
        </div>

        <div className='flex flex-col  w-full h-full'>
          <div
            style={{ borderRadius: "0px 8px 8px 8px" }}
            className={`  w-full h-full bg-[--color-background] transition-all duration-300 ${
              selectedOption === "location" ? "visible" : "hidden"
            }  `}>
            <iframe
              style={{ borderRadius: "25px" }}
              className='w-full h-full p-4 '
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.4692930099764!2d-76.7702418!3d18.0034116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8edb3f0fbc7f3ae5%3A0x2acc2a8d454a658d!2s196%20Mountain%20View%20Ave%2C%20Kingston%2C%20Jamaica!5e0!3m2!1ses!2sde!4v1728506308431!5m2!1ses!2sde'></iframe>
          </div>
          <div
            style={{ borderRadius: "8px 8px 8px 8px" }}
            className={` transition-all duration-300 ${
              selectedOption === "email" ? " visible" : "hidden"
            } w-full bg-[--color-background] p-8  flex justify-center items-center`}>
            <h1 className='text-2xl md:text-5xl text-[--color-text]  font-bold'>
              info<span className='text-[#ca0000]'>@</span>crimsontide
              <span className='text-[#ca0000]'>.</span>ai
            </h1>
          </div>
          <div
            style={{ borderRadius: "8px 0px 8px 8px" }}
            className={` transition-all duration-300 ${
              selectedOption === "phone" ? " visible" : "hidden"
            } w-full bg-[--color-background] p-8  flex justify-center items-center`}>
            <h1 className=' text-2xl md:text-5xl font-bold text-[--color-text]'>
              <span className=' text-[#ca0000]'>+ </span>1{" "}
              <span className=' text-[#ca0000]'>(</span> 876{" "}
              <span className=' text-[#ca0000]'>)</span> 458 4187
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export { DisplayContactUs };

import MarqueePartners from "./MarqueePartners";

const DisplaySocialNetworks = () => {
  const socialNetworks = [
    {
      id: "instagram",
      icono: <TiSocialInstagram className='' />,
      link: "https://www.instagram.com/crimsontide.ai/",
    },
    {
      id: "linkedin",
      icono: <TiSocialLinkedin className='' />,
      link: "https://jm.linkedin.com/in/crimsontide-ai-powered-by-artificial-intelligence-0b692a326",
    },
    {
      id: "twitter",
      icono: <TiSocialTwitter className='' />,
      link: "https://x.com/crimsontideai",
    },
    {
      id: "youtube",
      icono: <TiSocialYoutube className='' />,
      link: "https://www.youtube.com/@CrimsonTideAI",
    },
  ];

  const partners = [
    {
      id: "p1",
      src: "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/metaLogo.webp",
    },
    {
      id: "p2",
      src: "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/playaLogo.png",
    },
    {
      id: "p3",
      src: "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/abakusLogo.webp",
    },
    {
      id: "p4",
      src: "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/generalfoodLogo.webp",
    },
    {
      id: "p5",
      src: "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/guardLogo.webp",
    },
    {
      id: "p6",
      src: "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/bahiaLogo.png",
    },
    {
      id: "p7",
      src: "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/hyattLogo.png",
    },
    {
      id: "p8",
      src: "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/liguaneaLogo.webp",
    },
    {
      id: "p9",
      src: "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/jewelLogo.webp",
    },
    {
      id: "p10",
      src: "https://github.com/BPM94/CDNMD/raw/main/CTM/partners/propsolLogo.webp",
    },
  ];

  return (
    <div className=' flex flex-col justify-center items-center w-full '>
      <div className='grid max-md:place-items-center grid-cols-2  max-w-[500px] place-items-center w-full gap-4  '>
        {socialNetworks.map((network) => (
          <a
            href={network.link}
            key={network.id}
            className=' w-[90%] p-8 h-[90%] flex justify-center items-center text-6xl lg:text-7xl  rounded-md bg-[--color-background] hover:bg-red-600  transition-all duration-300 hover:animate-pulse text-[--color-text] '
            target='_blank'>
            {network.icono}
          </a>
        ))}
      </div>
      <div className='flex flex-col bg[--color-text-shade] rounded-md justify-center items-center w-full mt-6 '>
        <MarqueePartners partners={partners} speed={2} />
      </div>
    </div>
  );
};
export { DisplaySocialNetworks };
