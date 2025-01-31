import React, { useState } from "react";
import "../styles/Video.css";

const Video = ({ video }) => {
  const [isVideoVisible, setIsVideoVisible] = useState(false); // Estado para la visibilidad del video

  // Función para extraer el ID del video desde la URL
  const extractVideoId = (url) => {
    if (!url) return null; // Verifica si la URL no es válida
    const regex =
      /(?:\?v=|\/embed\/|\.be\/|\/v\/|\/watch\?v=)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(video);

  // Validar que el ID del video exista
  if (!videoId) {
    return <div>No se encontró un video válido.</div>;
  }

  // Función para alternar visibilidad del video
  const toggleVideoVisibility = () => {
    setIsVideoVisible((prev) => !prev);
  };

  return (
    <div className={`bannervid ${isVideoVisible ? "expanded" : ""}`}>
      <div className="vid">
        <button onClick={toggleVideoVisibility} className="view-more-button">
          {isVideoVisible ? "Ver Menos" : "Ver más"}
        </button>
        {/* Sección del iframe o enlace alternativo */}
        {isVideoVisible && (
          <div className="video-container">
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default Video;
