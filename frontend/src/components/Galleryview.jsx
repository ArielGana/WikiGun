import React, { useEffect, useState } from "react";
import "../styles/Gallery.css"; // Asegúrate de tener este archivo de estilos

const Gallery = ({ weaponName }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isDesmanModalOpen, setIsDesmanModalOpen] = useState(false);
  const [Desman, setDesman] = useState(null);

  const openGalleryModal = () => setIsGalleryModalOpen(true);
  const closeGalleryModal = () => setIsGalleryModalOpen(false);

  const openDesmanModal = () => setIsDesmanModalOpen(true);
  const closeDesmanModal = () => setIsDesmanModalOpen(false);

  useEffect(() => {
    if (weaponName) {
      fetch(`https://wiki-gun.vercel.app/api/cloudinary/gun/${weaponName}`)
        .then((response) => response.json())
        .then((data) => {
          const filteredImages = data.filter(
            (url) => !url.includes("Desmantelamiento")
          );
          setImages(filteredImages);
        })
        .catch((error) => console.error("Error fetching images:", error));
    }
  }, [weaponName]);

  useEffect(() => {
    const fetchDesmanImages = async () => {
      try {
        const response = await fetch(
          `https://wiki-gun.vercel.app/api/cloudinary/carpet/${weaponName}`
        );
        const data = await response.json();
        setDesman(data[0]);
      } catch (error) {
        console.error("Error fetching Desmantelamiento images:", error);
      }
    };

    if (weaponName) {
      fetchDesmanImages();
    }
  }, [weaponName]);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const toggleVideoVisibility = () => {
    setIsVideoVisible((prev) => !prev);
  };

  if (images.length === 0) {
    return <div>Cargando imágenes...</div>;
  }

  return (
    <div className="gallery">
      <h1>{weaponName}</h1>
      <div className="main-image-container">
        <img
          src={images[currentIndex]}
          alt="Imagen principal"
          className="main-image"
          onClick={openGalleryModal}
        />
        {isGalleryModalOpen && (
          <div className="modal" onClick={closeGalleryModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={closeGalleryModal}>
                X
              </span>
              <img
                src={images[currentIndex]}
                alt="Imagen ampliada"
                className="expanded-image"
              />
            </div>
          </div>
        )}
      </div>
      <div className="thumbnail-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className="thumbnail"
            onClick={() => setCurrentIndex(index)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
      <div className="desmantelamiento">
        <h1>Desmantelamiento</h1>
        <div className="desmantelamiento-container">
          {Desman ? (
            <img
              src={Desman}
              alt="Desmantelamiento"
              className="desman-image"
              onClick={openDesmanModal}
            />
          ) : (
            <p>Cargando imagen de Desmantelamiento...</p>
          )}
          <a href={Desman} target="_blank" rel="noopener noreferrer">
            <img
              className="download"
              src="/images/descargar.png"
              alt="Descargar"
            />
          </a>
        </div>

        {isDesmanModalOpen && (
          <div className="modal" onClick={closeDesmanModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={closeDesmanModal}>
                X
              </span>
              <img
                src={Desman}
                alt="Desmantelamiento ampliado"
                className="expanded-image"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
