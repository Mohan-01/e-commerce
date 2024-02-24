import authService from '../services/authService.js';

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { message, token } = await authService.login(username, password);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
    res.cookie('jwt', token, cookieOptions);
    res.json({ message, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const { message, newUser } = await authService.signup(
      username,
      password,
      email
    );
    res.status(201).json({ message, newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('jwt');
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const passwordUpdate = async (req, res) => {
  try {
    const { password, confirmPassword, newPassword } = req.body;
    console.log({ body: req.body });
    const user = req.user;
    await authService.updatePassword(
      user,
      password,
      newPassword,
      confirmPassword
    );
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

const passwordReset = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.headers);
    const message = await authService.resetPassword(email, req.headers.host);
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const { newPassword, confirmPassword } = req.body;
    await authService.forgetPassword(token, newPassword, confirmPassword);
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export default {
  login,
  signup,
  logout,
  passwordUpdate,
  passwordReset,
  forgetPassword
};
