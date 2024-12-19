import { useEffect } from "react";
import particlesJS from "particles.js";

const ParticlesComponent = () => {
  useEffect(() => {
    // Asegúrate de que `window.particlesJS` esté disponible solo en el cliente
    if (typeof window !== "undefined" && window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: 5,
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
        },
      });
    }
  }, []); // Asegurar que solo se ejecute una vez cuando el componente se monta

  return (
    <div
      id='particles-js'
      style={{ width: "100%", height: "100vh", position: "absolute", zIndex: 10 }}></div>
  );
};

export default ParticlesComponent;
