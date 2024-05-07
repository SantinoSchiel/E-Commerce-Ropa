import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProductForm.module.css'; // Estilos modulares
const URL_API = import.meta.env.VITE_URL_API;

const Form = () => {
  // Estados para los campos del formulario
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [gender, setGender] = useState('');
  const [category, setCategory] = useState('');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [currentColor, setCurrentColor] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const admin = JSON.parse(localStorage.getItem('admin'));

  // Opciones de categorías según el género seleccionado
  const categoryOptions = {
    hombre: ['Zapatilla', 'Remera', 'Buzo', 'Pantalón'],
    mujer: ['Zapatilla', 'Remera', 'Buzo', 'Pantalón', 'Falda', 'Vestido'],
  };

  // Talles según género y categoría
  const sizeOptions = {
    hombre: {
      Zapatilla: ['39', '40', '41', '42', '43', '44', '45'],
      Remera: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
      Buzo: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
      Pantalón: ['28', '30', '32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54', '56', '58'],
    },
    mujer: {
      Zapatilla: ['35', '36', '37', '38', '39', '40'],
      Remera: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
      Buzo: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
      Pantalón: ['28', '30', '32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54', '56', '58'],
      Falda: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
      Vestido: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
    },
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Adjuntar datos del producto al FormData
      formData.append('name', name);
      formData.append('price', price);
      formData.append('gender', gender);
      formData.append('category', category);
      selectedSizes.forEach((size) => {
        formData.append('size', size);
      });
      selectedColors.forEach((color) => {
        formData.append('color', color);
      });
      formData.append('description', description);
      formData.append('adminId', admin.id);

      // Adjuntar imágenes al FormData
      images.forEach((image) => {
        formData.append('images', image);
      });

      const formDataObject = Object.fromEntries(formData.entries());
      console.log(formDataObject);

      const response = await axios.post(`${URL_API}/product`, formData);
      setIsSubmitted(true);
      console.log(response.data); // Manejar respuesta del servidor

      // Recargar la página después de 3 segundos
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejar cambio en imágenes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // Manejar cambio en género
  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;
    setGender(selectedGender);
    setCategory('');
    setSelectedSizes([]);
  };

  // Manejar cambio en categoría
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setSelectedSizes([]);
  };

  // Manejar selección de talles
  const handleSizeToggle = (size) => {
    setSelectedSizes((prevSizes) => {
      if (prevSizes.includes(size)) {
        return prevSizes.filter((prevSize) => prevSize !== size);
      } else {
        return [...prevSizes, size];
      }
    });
  };

  // Manejador para agregar el color ingresado al array de colores
  const handleColorKeyDown = (e) => {
    if (e.key === 'Enter' && currentColor.trim() !== '') {
      e.preventDefault();
      setSelectedColors((prevColors) => [...prevColors, currentColor.trim()]);
      setCurrentColor('');
    }
  };

  // Manejar eliminación de color
  const handleColorDelete = (color) => {
    setSelectedColors((prevColors) => prevColors.filter((c) => c !== color));
  };

  const handleNameChange = (e) => {
    const capitalizedInput = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setName(capitalizedInput);
  };

  const capitalizeFirstLetter = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  const handleColorChange = (e) => {
    setCurrentColor(capitalizeFirstLetter(e.target.value));
  };

  const handleDescriptionChange = (e) => {
    setDescription(capitalizeFirstLetter(e.target.value));
  };

  useEffect(() => {
    console.log(selectedSizes, 'selectedSizes');
    console.log(selectedColors, 'selectedColors');
  }, [selectedSizes, selectedColors]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.flexContainer}>
        <div className={styles.div1}>
          <label>
            Nombre:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <label>
            Precio:
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
          <label>
            <select value={gender} onChange={handleGenderChange} className={styles.select}>
              <option value="">Género</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
            </select>
            <select value={category} onChange={handleCategoryChange} className={styles.select}>
              <option value="">Categoría</option>
              {gender && categoryOptions[gender].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            Talles:
            <div className={styles.sizeButtons}>
              {sizeOptions[gender] && sizeOptions[gender][category] && sizeOptions[gender][category].map((sizeOption) => (
                <button
                  key={sizeOption}
                  type="button"
                  className={selectedSizes.includes(sizeOption) ? styles.selectedSize : styles.sizeButton}
                  onClick={() => handleSizeToggle(sizeOption)}
                >
                  {sizeOption}
                </button>
              ))}
            </div>
          </label>
        </div>
        <div className={styles.div2}>
          <label>
            Colores:
            <input
              type="text"
              value={currentColor}
              onChange={handleColorChange}
              onKeyDown={handleColorKeyDown}
            />
            <div className={styles.seleccionedColorButtons}>
              {selectedColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={styles.colorButton}
                  onClick={() => handleColorDelete(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </label>
          <label className={styles.labelDescription}>
            Descripción:
            <textarea value={description} onChange={handleDescriptionChange} />
          </label>
          <label>
            Imágenes:
            <input type="file" multiple onChange={handleImageChange} className={styles.fileInput} />
          </label>
        </div>
      </div>
      {isSubmitting ? (
        <svg viewBox="25 25 50 50" className={styles.spinner}>
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      ) : isSubmitted ? (
        <div className={styles.successMessage}>
          ¡El formulario se ha enviado correctamente!
        </div>
      ) : (
        <button type="submit">Publicar</button>
      )}

    </form>
  );
};

export default Form;