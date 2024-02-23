import Category from '../models/Category.js';

const getCategories = async () => {
  try {
    const categories = await Category.findAll();
    return categories;
  } catch (error) {
    throw new Error('Unable to fetch categories');
  }
};

const getCategoryById = async categoryId => {
  try {
    const category = await Category.findByPk(categoryId);
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
    const newCategory = await Category.create({ name, description });
    return newCategory;
  } catch (error) {
    throw new Error('Unable to create category');
  }
};

const updateCategory = async (categoryId, categoryData) => {
  try {
    const updatedCategory = await Category.update(categoryData, {
      where: { id: categoryId },
      returning: true // To return the updated category
    });
    if (updatedCategory[0] === 0) {
      throw new Error('Category not found');
    }
    return updatedCategory[1][0]; // Return the updated category
  } catch (error) {
    throw new Error('Unable to update category');
  }
};

const deleteCategory = async categoryId => {
  try {
    const deletedRowCount = await Category.destroy({
      where: { id: categoryId }
    });
    if (deletedRowCount === 0) {
      throw new Error('Category not found');
    }
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
