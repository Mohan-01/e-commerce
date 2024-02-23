import productService from '../services/productService.js';

const createProduct = async (req, res) => {
  try {
    const { category_id, title, price, description, availability, image } =
      req.body;
    const newProduct = await productService.createProduct(
      category_id,
      title,
      price,
      description,
      availability,
      image
    );
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create product' });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch product' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({
      items: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch products' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await productService.updateProduct(
      productId,
      req.body
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deleted = await productService.deleteProduct(productId);
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
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct
};
