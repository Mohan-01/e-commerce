import pool from '../config/db.js';

const createProduct = async (
  category_id,
  title,
  price,
  description,
  availability,
  image
) => {
  try {
    const query = {
      text: 'INSERT INTO products (category_id, title, price, description, availability, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      values: [category_id, title, price, description, availability, image]
    };
    const { rows } = await pool.query(query);
    return rows[0];
  } catch (error) {
    console.log(error.message);
    throw new Error('Unable to create product');
  }
};

const getProductById = async productId => {
  try {
    const query = {
      text: 'SELECT * FROM products WHERE id = $1',
      values: [productId]
    };
    const { rows } = await pool.query(query);
    return rows[0];
  } catch (error) {
    throw new Error('Unable to fetch product');
  }
};

const getAllProducts = async () => {
  try {
    const query = {
      text: 'SELECT * FROM products'
    };
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error('Unable to fetch products');
  }
};

const updateProduct = async (productId, updatedFields) => {
  try {
    const values = [];
    let setClause = '';
    let placeHolderIndex = 1;

    Object.entries(updatedFields).forEach(([key, value], index) => {
      if (value !== undefined) {
        setClause += `${key} = $${placeHolderIndex}, `;
        values.push(value);
        placeHolderIndex++;
      }
    });

    // Remove the trailing comma and space
    setClause = setClause.slice(0, -2);

    // Add productId to values array
    values.push(productId);

    // Construct the SQL query
    const query = {
      text: `UPDATE products SET ${setClause} WHERE id = $${placeHolderIndex}`,
      values: values
    };

    // Execute the query
    const { rowCount } = await pool.query(query);

    if (rowCount === 0) {
      throw new Error('Product not found');
    }

    // Fetch and return the updated product
    const updatedProduct = await getProductById(productId);
    return updatedProduct;
  } catch (error) {
    throw new Error('Unable to update product');
  }
};

const deleteProduct = async productId => {
  try {
    // Check if the product with the given ID exists
    const query = {
      text: 'SELECT id FROM products WHERE id = $1',
      values: [productId]
    };
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      throw new Error('Product not found');
    }

    // If the product exists, delete it
    const deleteQuery = {
      text: 'DELETE FROM products WHERE id = $1',
      values: [productId]
    };
    const { rowCount } = await pool.query(deleteQuery);
    return rowCount > 0;
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
