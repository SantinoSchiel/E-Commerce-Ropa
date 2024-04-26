const URL_API = import.meta.env.VITE_URL_API;
import React, { useState } from 'react';
import axios from 'axios';
import styles from './ProductForm.module.css'; // Estilos modulares

const Form = () => {
  // Estados para los campos del formulario
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState([]);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  // Manejar envío del formulario
const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Enviar imágenes y datos del producto al servidor
      const formData = new FormData();
  
      // Adjuntar datos del producto al FormData
      formData.append('name', name);
      formData.append('price', price);
      formData.append('size', size); // Convertir a array y luego a cadena
      formData.append('color', color); // Convertir a array y luego a cadena
      formData.append('description', description);
      formData.append('adminId', '37cec869-e2db-4e2e-85d6-76dcdd034b7b'); // Reemplaza con el ID del admin correspondiente
  
      // Adjuntar imágenes al FormData
      images.forEach((image) => {
        formData.append('images', image);
      });
  
      // Hacer POST del producto con datos y imágenes
      console.log(formData, 'formData');
      const response = await axios.post(`${URL_API}/product`, formData);
      
      console.log(response.data); // Manejar respuesta del servidor
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  // Manejar cambio en imágenes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Precio:
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <label>
        Tamaño:
        <input type="text" value={size} onChange={(e) => setSize(e.target.value)} />
      </label>
      <label>
        Color:
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
      </label>
      <label>
        Descripción:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Imágenes:
        <input type="file" multiple onChange={handleImageChange} />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Form;