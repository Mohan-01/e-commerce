import Product from '../models/Product.js';

const createProduct = async (
  category_id,
  title,
  price,
  description,
  availability,
  image
) => {
  try {
    const newProduct = await Product.create({
      category_id,
      title,
      price,
      description,
      availability,
      image
    });
    return newProduct;
  } catch (error) {
    throw new Error('Unable to create product');
  }
};

const getProductById = async productId => {
  try {
    const product = await Product.findByPk(productId);
    return product;
  } catch (error) {
    throw new Error('Unable to fetch product');
  }
};

const getAllProducts = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    throw new Error('Unable to fetch products');
  }
};

const updateProduct = async (productId, updatedFields) => {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    await product.update(updatedFields);
    return product;
  } catch (error) {
    throw new Error('Unable to update product');
  }
};

const deleteProduct = async productId => {
  try {
    const deletedCount = await Product.destroy({
      where: {
        id: productId
      }
    });
    return deletedCount > 0;
  } catch (error) {
    throw new Error('Unable to delete product');
  }
};

export default {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct
};
