import { User } from '../models/userModel.js';
import { generateToken } from '../utils/tokenGeneration.js';
import { sendEmail } from '../services/email.service.js';
import crypto from 'crypto';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    res.status(201).json({ token, username: user.name });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.json({ token, username: user.name });
  } catch {
    res.status(500).json({ message: 'Login failed' });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetLink = `http://localhost:5000/api/auth/reset-password/${token}`;
    await sendEmail(email, 'Password Reset', `<p>Reset here: <a href="${resetLink}">${resetLink}</a></p>`);

    res.json({ message: 'Reset email sent' });
    // res.json({ message: 'Reset email sent', resetLink });
  } catch {
    res.status(500).json({ message: 'Reset email failed' });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Token expired or invalid' });

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch {
    res.status(500).json({ message: 'Reset failed' });
  }
};
