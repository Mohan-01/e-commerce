import Product from '../models/Product.js';
import pool from '../config/db.js';

const createProductService = async (
  category_id,
  title,
  price,
  description,
  availability,
  image
) => {
  try {
    const newProduct = await Product.createProduct(
      category_id,
      title,
      price,
      description,
      availability,
      image
    );
    return newProduct;
  } catch (error) {
    console.log(error.message);
    throw new Error('Unable to create product');
  }
};

const getProductByIdService = async productId => {
  try {
    const product = await Product.getProductById(productId);
    return product;
  } catch (error) {
    throw new Error('Unable to fetch product');
  }
};

const getAllProductsService = async () => {
  try {
    const products = await Product.getAllProducts();
    return products;
  } catch (error) {
    throw new Error('Unable to fetch products');
  }
};

const updateProductService = async (productId, updatedFields) => {
  try {
    const values = [];
    let setClause = '';
    let placeHolderIndex = 1;
    Object.entries(updatedFields).forEach(([key, value], index) => {
      if (value) {
        setClause += `${key} = $${placeHolderIndex}, `;
        values.push(value);
        placeHolderIndex++;
      }
    });

    // Remove the trailing comma and space
    setClause = setClause.slice(0, -2);

    // Construct the SQL query
    const query = {
      text: `UPDATE products SET ${setClause} WHERE id = $${placeHolderIndex} RETURNING *`,
      values: [...values, productId]
    };

    // Execute the query
    const updatedProduct = await pool.query(query);
    return updatedProduct.rows[0];
  } catch (error) {
    console.log(error.message);
    throw new Error('Unable to update product');
  }
};

const deleteProductService = async productId => {
  try {
    await Product.deleteProduct(productId);
    return true;
  } catch (error) {
    throw new Error('Unable to delete product');
  }
};

export default {
  createProductService,
  getProductByIdService,
  getAllProductsService,
  updateProductService,
  deleteProductService
};
