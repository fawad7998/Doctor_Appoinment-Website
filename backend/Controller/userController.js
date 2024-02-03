import User from "./../models/UserSchema.js";
import Booking from "./../models/BookingSchema.js";
import Doctor from "./../models/DoctorSchema.js";

// Update user
export const UpdateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateuser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!updateuser)
      return res.status(404).json({
        message: "User not found with that ID.",
        status: false,
      });
    else
      res.status(201).json({
        status: "success",
        message: "Update successfully",
        data: updateuser,
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to update.",
    });
  }
};
// Delete user
export const DeleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteuser = await User.findByIdAndDelete(id);

    if (!deleteuser)
      return res.status(404).json({
        status: false,
        message: `User not found with that ID.`,
      });
    else
      res.status(204).json({
        status: "success",
        message: "Deleted successfully",
        data: null,
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to Deleted.",
    });
  }
};
// Get all users
export const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users || users.length === 0)
      return res.status(404).json({
        status: "failed",
        message: "No Users found",
      });
    else
      res.status(200).json({
        status: "succes",
        message: "Getting all users was successful!",
        count: users.length,
        data: users,
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      message: "The request could not be processed",
    });
  }
};

// Get one User
export const GetOneUser = async (req, res) => {
  const id = req.params.id;
  try {
    const getUser = await User.findById(id).select("-password");

    if (!getUser)
      return res.status(404).json({
        status: false,
        message: `User not found with that ID.`,
      });
    else
      res.status(200).json({
        status: "success",
        message: "Get user successfully",
        data: getUser,
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to get user.",
    });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);

    if (!user)
      return res.status(404).json({
        status: false,
        message: "User not found ",
      });

    const { password, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: "successfully get profile info",
      data: { ...rest },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Somethin want wrong Couldn't find profile",
    });
  }
};

export const getAppointments = async (req, res) => {
  try {
    // 1. Retrive appointments from booking for spacific user
    const bookings = await Booking.find({ user: req.userId });
    // 2. Extract doctor ids from appointments bookings
    const doctorIds = bookings.map((el) => el.doctor.id);
    // 3. Retrive doctor using doctor ids
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );

    res.status(200).json({
      status: "true",
      message: "Successfully retrieved the appointment list",
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Somethin want wrong Couldn't find profile",
    });
  }
};
