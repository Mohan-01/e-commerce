import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import sendMail from './sendMail.js';

const generateToken = (userId, role) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  return token;
};

const login = async (username, password) => {
  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new Error('Invalid username');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }

    const token = generateToken(user.id, user.role);
    return { message: 'Login successful', token };
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};

const signup = async (username, password, email, role = 'customer') => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      role
    });
    return { message: 'Signup successful', newUser };
  } catch (error) {
    throw new Error('Signup failed: ' + error.message);
  }
};

const updatePassword = async (user, password, newPassword, confirmPassword) => {
  try {
    // Retrieve user record from the database

    if (!user) {
      throw new Error(
        'You are must be logged in to perfrom this action. If you still need to change your password please use forget-password.'
      );
    }

    const userInstance = await User.findByPk(user.userId);

    const checkPassword = await bcrypt.compare(password, userInstance.password);

    if (!checkPassword) {
      throw new Error('Invalid current password');
    }

    if (newPassword !== confirmPassword) {
      throw new Error('New password and confirm password do not match');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password field in the user record
    userInstance.password = hashedPassword;

    // Save the updated user record back to the database
    await userInstance.save();

    return 'Password updated successfully';
  } catch (error) {
    throw new Error(error.message || 'Unable to update password');
  }
};

// Send password reset instructions to the user's email
const resetPassword = async (email, host) => {
  try {
    // Generate password reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Set expiry timestamp for the reset token (e.g., 10 minutes from now)
    const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // Update user record in the database with reset token and expiry timestamp
    await User.update({ resetToken, resetTokenExpiry }, { where: { email } });

    const resetURL = `http://${host}/reset-password/${resetToken}`;
    await sendMail({
      to: email,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetURL}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
    });

    return `Password reset instructions sent successfully or copy and paste this link in new tab http://${host}/auth/forget-password/${resetToken}`;
  } catch (error) {
    throw new Error(
      error.message || 'Unable to send password reset instructions'
    );
  }
};

// Reset the password to the provided newPassword for the user with the provided email
const forgetPassword = async (token, newPassword, confirmPassword) => {
  try {
    const user = await User.findOne({ resetToken: token });
    if (!user) {
      throw new Error('Invalid token');
    }
    if (newPassword !== confirmPassword) {
      throw new Error('New password and confirm password do not match');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user record in the database with new password and clear reset token fields
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    return 'Password reset successfully';
  } catch (error) {
    throw new Error('Unable to reset password');
  }
};

export default {
  login,
  signup,
  updatePassword,
  resetPassword,
  forgetPassword
};
