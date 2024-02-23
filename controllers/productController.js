import productService from '../services/productService.js';

const createProductController = async (req, res) => {
  try {
    const { category_id, title, price, description, availability, image } =
      req.body;
    const newProduct = await productService.createProductService(
      category_id,
      title,
      price,
      description,
      availability,
      image
    );
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Unable to create product' });
  }
};

const getProductByIdController = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductByIdService(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch product' });
  }
};

const getAllProductsController = async (req, res) => {
  try {
    const products = await productService.getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch products' });
  }
};

const updateProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    const { category_id, title, price, description, availability, image } =
      req.body;
    const updatedProduct = await productService.updateProductService(
      productId,
      { category_id, title, price, description, availability, image }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Unable to update product' });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    const deleted = await productService.deleteProductService(productId);
    if (deleted) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete product' });
  }
};

export default {
  createProductController,
  getProductByIdController,
  getAllProductsController,
  updateProductController,
  deleteProductController
};
