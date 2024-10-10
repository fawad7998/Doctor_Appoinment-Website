import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Create JWT token
const genreateToken = (user) => {
  return jwt.sign({ id: user._id, type: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

// Signup Controller
export const signup = async (req, res) => {
  try {
    const { name, email, password, role, photo, gender } = req.body;

    let user = null;
    if (role === 'patient') user = await User.findOne({ email });
    else if (role === 'doctor') user = await Doctor.findOne({ email });

    // Check user is exist
    if (user)
      return res.status(400).json({
        message: 'User already exist',
      });

    //   hash password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === 'patient')
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });

    if (role === 'doctor')
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });

    await user.save();
    res.status(200).json({
      success: true,
      message: 'user successfully created.',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      // err: error.massage,
      message: 'Internal server error. Try again',
    });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { email } = req.body;
  try {
    let user = null;

    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) user = patient;
    if (doctor) user = doctor;

    // check user is exist or Not
    if (!user)
      return res.status(400).json({
        success: false,
        message: 'user not found.',
      });
    // Validate compare Password

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch)
      return res.status(400).json({
        status: false,
        message: 'Invalid credentials.',
      });

    // Get JWT token
    const token = genreateToken(user);
    const { password, role, appointments, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: 'successfully login.',
      token,
      role,
      data: {
        ...rest,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Server Error : ${error}`,
    });
  }
};
