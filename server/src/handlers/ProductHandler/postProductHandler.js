const postProducts = require("../../controllers/Product/postProduct");
const cloudinary = require("cloudinary").v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const postProductsHandler = async (req, res) => {
  try {
    // Verificar si se han enviado archivos
    if (!req.files || req.files.length === 0) {
      throw new Error("No se han enviado archivos");
    }
    
    // Subir cada imagen a Cloudinary y obtener sus URLs
    const images = [];
    for (const file of req.files) {
      const imageCloud = await cloudinary.uploader.upload(file.path);
      images.push(imageCloud.url);
    }
    
    // Convertir el campo 'size' en un arreglo
    const size = Array.isArray(req.body.size) ? req.body.size : [req.body.size];
    console.log(size, 'size');

    // Combinar las URLs de las imágenes con los datos del producto
    const data = { ...req.body, images, size };

    // Llamar a la función postProducts con los datos del producto
    const newProduct = await postProducts(data);

    // Enviar la respuesta con el nuevo producto creado
    return res.status(201).json(newProduct);

  } catch (error) {
    // Manejar errores
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postProductsHandler;