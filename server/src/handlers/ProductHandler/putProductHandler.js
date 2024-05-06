const putProduct = require("../../controllers/Product/putProduct");
const fs = require("fs");

// Función para guardar la imagen en el servidor
function saveImage(file) {
  const newPath = `./uploads/${file.originalname}`;
  fs.renameSync(file.path, newPath);
  return newPath; // Devuelve la ruta del archivo en lugar del objeto req.file
}

const putProductHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // Si hay una imagen cargada en la solicitud, guardarla y obtener su ruta
    const imagePath = req.file ? saveImage(req.file) : null;

    // Datos del producto a actualizar
    const newData = req.body;

    // Si hay una nueva imagen, agregar la ruta de la imagen a los datos del producto
    if (imagePath) {
      newData.image = imagePath;
    }

    // Llamar a la función para actualizar el producto
    const updateProduct = await putProduct(id, newData);

    // Responder con el producto actualizado
    return res.status(200).json(updateProduct);
  } catch (error) {
    // Manejar cualquier error
    return res.status(500).json({ error: error.message });
  }
};

module.exports = putProductHandler;