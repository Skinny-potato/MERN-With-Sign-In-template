import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// --------------------------------------------
// 🔹 Define the User schema structure
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: { 
    type: String, 
    unique: true,
    required: true,
    lowercase: true, // ✅ Store as lowercase
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken:String, // Will be added to check if the user has a valdi refresh token 
  resetToken: String,
  resetTokenExpiry: Date 
});


// --------------------------------------------
// Pre-save Hook: Hash the password before saving
// --------------------------------------------
// This middleware runs before saving a user document.
// It only hashes the password if it's new or has been changed.
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return; 
  this.password = await bcrypt.hash(this.password, 10);
});

// --------------------------------------------
// This method is used during login to compare a plain text password
// with the hashed password stored in the database.
userSchema.methods.comparePassword = function (input) {
  return bcrypt.compare(input, this.password);
};


export const User = mongoose.model('User', userSchema);
