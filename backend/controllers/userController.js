import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Helper function to create JWT tokens
const createToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User doesn't exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken({ id: user._id });
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address, shippingAddress } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      shippingAddress,
    });

    const user = await newUser.save();
    const token = createToken({ id: user._id });

    res.status(201).json({ success: true, token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Encode the email in the token payload
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Route to update user profile
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, address, shippingAddress } = req.body;

    const user = await userModel.findByIdAndUpdate(
      id,
      { name, phone, address, shippingAddress },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.json({ success: true, message: "User updated successfully.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Route to get user details
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin, updateUser, getUser };
