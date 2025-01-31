import React, { useState } from "react";
import "../styles/Form.css";

const FirearmForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    accuracy: 50,
    design: 50,
    durability: 50,
    recoil: 50,
    capacity: "",
    calibre: "",
    cadencia: "",
    peso: "",
    longitud: "",
    tipo_accion: "",
    img: "",
    historydata: "",
    video: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({ ...prevData, img: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, sube un archivo válido de imagen (png, jpg, jpeg).");
    }
  };
  const isYouTubeURL = (url) => {
    const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return regex.test(url);
  };

  const handleVideoChange = (e) => {
    const { value } = e.target;
    if (value && !isYouTubeURL(value)) {
      alert("Por favor, introduce un enlace válido de YouTube.");
      return;
    }
    setFormData((prevData) => ({ ...prevData, video: value }));
  };
  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    if (isNaN(value) || value <= 0) {
      alert(`${name} debe ser un número positivo.`);
      return;
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const peso = parseFloat(formData.peso);
    const longitud = parseFloat(formData.longitud);
    console.log("Submitted Data:", formData);

    e.preventDefault();

    if (!formData.img) {
      alert("Por favor, sube una imagen.");
      return;
    }

    if (!isYouTubeURL(formData.video)) {
      alert("El enlace del video no es válido.");
      return;
    }

    if (isNaN(peso) || peso <= 0) {
      alert("El peso debe ser un número positivo mayor a 0 y en gramos.");
      return;
    }

    if (isNaN(longitud) || longitud <= 0) {
      alert(
        "La longitud debe ser un número positivo mayor a 0 y en centímetros."
      );
      return;
    }

    console.log("Datos enviados:", formData);
    // Aquí puedes añadir la lógica para enviar los datos al backend
  };

  return (
    <form onSubmit={handleSubmit} className="firearm-form">
      <h2>Formulario de Registro de Armas</h2>

      <div className="form-group">
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <label>
          Historia:
          <textarea
            name="historydata"
            value={formData.historydata}
            onChange={handleChange}
          ></textarea>
        </label>
      </div>

      <div className="form-group">
        <label>
          Tipo de Acción:
          <select
            name="tipo_accion"
            value={formData.tipo_accion}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un tipo</option>
            <option value="automatica">Automática</option>
            <option value="semiautomatica">Semiautomática</option>
            <option value="accion-simple">Acción Simple</option>
            <option value="accion-doble">Acción Doble</option>
          </select>
        </label>
        <label>
          Capacidad:
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Calibre:
          <input
            type="text"
            name="calibre"
            value={formData.calibre}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Peso (gramos):
          <input
            type="number"
            name="peso"
            value={formData.peso}
            onChange={handleChange}
            step="0.001"
            min="0.001" // Para evitar valores no válidos como 0 o negativos
            required
          />
        </label>
        <label>
          Longitud (cm):
          <input
            type="number"
            name="longitud"
            value={formData.longitud}
            onChange={handleChange}
            step="0.001"
            min="0.001"
            required
          />
        </label>
      </div>

      <div className="range-group">
        {["accuracy", "design", "durability", "recoil"].map((field) => {
          const tooltips = {
            accuracy: "La precisión del dispositivo.",
            design: "El diseño estético y funcional.",
            durability: "La durabilidad en condiciones extremas.",
            recoil: "El nivel de retroceso percibido.",
          };

          return (
            <div key={field} className="range-item">
              <label>
                <div className="info-container">
                  <img
                    className="infoicon"
                    src="./images/info.png"
                    alt="Info"
                    title={tooltips[field]} // Texto accesible con atributo title
                  />
                  <span className="tooltip-text">{tooltips[field]}</span>{" "}
                  {/* Tooltip personalizado */}
                </div>
                {field.charAt(0).toUpperCase() + field.slice(1)}:
                <input
                  type="range"
                  name={field}
                  min="0"
                  max="100"
                  value={formData[field]}
                  onChange={handleChange}
                />
                <span>{formData[field]}%</span>
              </label>
            </div>
          );
        })}
      </div>

      <div className="form-group"></div>

      <div className="form-group">
        <label>
          Imagen:
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageUpload}
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Video URL:
          <input
            type="text"
            name="video"
            value={formData.video}
            onChange={handleVideoChange}
            required
          />
        </label>
      </div>

      <button type="submit">Guardar</button>
    </form>
  );
};

export default FirearmForm;
