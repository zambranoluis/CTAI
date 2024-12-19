import { useEffect, useRef } from "react";

const Marquee = ({ partners, speed = 1 }) => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    let scrollAmount = 0;

    // Define el paso del desplazamiento en función de la velocidad
    const scrollStep = speed; // Cuanto mayor sea, más rápido se moverá
    const scrollInterval = 16; // Intervalo entre cada paso, ajustable para más suavidad (60fps ~ 16ms)

    const scroll = () => {
      // Comprobamos si hemos llegado al final del contenido
      if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
        marquee.scrollLeft = 0; // Reinicia el scroll para crear el efecto de desplazamiento infinito
      } else {
        marquee.scrollLeft += scrollStep; // Incrementa el valor del scroll según la velocidad
      }
    };

    // Ejecutamos el intervalo para hacer el scroll
    const interval = setInterval(scroll, scrollInterval);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [speed]);

  return (
    <div
      ref={marqueeRef}
      className=" w-full h-full flex items-center  overflow-x-scroll noScrollBar   gap-12
      "
      style={{ whiteSpace: "nowrap" }} // Asegura que el contenido esté en línea y no se ajuste
    >
      {partners.concat(partners).map((partner, index) => (
        <img
        key={index}
        src={partner.src}
        alt="partnerLogo"
        className="hover:scale-125   w-[140px] inline-block drop-shadow-[0_0_1px_var(--color-background)]"
        />
      ))}
    </div>
  );
};

export default Marquee;