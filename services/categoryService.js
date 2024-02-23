import Category from '../models/Category.js';
import pool from '../config/db.js';

const getCategories = async () => {
  try {
    const categories = await Category.getAll();
    return categories;
  } catch (error) {
    throw new Error('Unable to fetch categories');
  }
};

const getCategoryById = async id => {
  try {
    const category = await Category.getById(id);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  } catch (error) {
    throw new Error('Unable to fetch category');
  }
};

const createCategory = async (name, description) => {
  try {
    const newCategory = await Category.create(name, description);
    return newCategory;
  } catch (error) {
    throw new Error('Unable to create category');
  }
};

const updateCategory = async (id, category) => {
  try {
    const values = [];
    let setClause = '';
    let placeHolderIndex = 1;

    Object.entries(category).forEach(([key, value], index) => {
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
      text: `UPDATE categories SET ${setClause} WHERE id = $${placeHolderIndex} RETURNING *`,
      values: [...values, id]
    };

    // Execute the query
    const updatedCategory = await pool.query(query);

    if (!updatedCategory) {
      throw new Error('Category not found');
    }
    return updatedCategory.rows[0];
  } catch (error) {
    // console.log(error.message);
    throw new Error('Unable to update category');
  }
};

const deleteCategory = async id => {
  try {
    // Check if the category with the given ID exists
    const query = {
      text: 'SELECT id FROM categories WHERE id = $1',
      values: [id]
    };
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      throw new Error('Category not found');
    }

    // If the category exists, delete it
    const deleteQuery = {
      text: 'DELETE FROM categories WHERE id = $1',
      values: [id]
    };
    await pool.query(deleteQuery);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
