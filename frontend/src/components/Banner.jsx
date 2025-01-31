import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/banner.css";

const Banner = () => {
  const [images, setImages] = useState([]);

  // Función para obtener imágenes de la API
  const fetchImages = async () => {
    try {
      const response = await axios.get(
        "https://wiki-gun.vercel.app/api/cloudinary/images"
      );
      setImages(response.data);
    } catch (error) {
      console.error("Error al obtener imágenes", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="banner">
      {images.length > 0 ? (
        <div className="banner-images">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Banner ${index}`} />
          ))}
        </div>
      ) : (
        <p>Cargando imágenes...</p>
      )}
    </div>
  );
};

export default Banner;
