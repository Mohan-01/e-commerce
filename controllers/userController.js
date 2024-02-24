import User from '../models/User.js';

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedFields = req.body;
    let fields = 0;
    Object.entries(updatedFields).forEach(([key, value]) => {
      if (key === 'password') {
        message = 'You should not be using this route to change your password.';
        delete updatedFields[key];
      } else fields++;
    });
    if (fields === 0) {
      return res
        .status(404)
        .json({ error: 'There is nothing specified to update' });
    }
    const [rowsEffected, updatedRecords] = await User.update(updatedFields, {
      where: { id: userId },
      returning: true
    });

    if (rowsEffected === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      updatedUser: updatedRecords[0].dataValues
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    if (req.user.id !== userId && req.user.role !== 'admin') {
      throw new Error(
        'Only admin/owner of the account, can delete the account'
      );
    }
    const rowsEffected = await User.destroy({ where: { id: userId } });
    if (rowsEffected === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

export default {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
