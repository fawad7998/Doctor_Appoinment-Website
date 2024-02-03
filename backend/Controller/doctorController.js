import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

// Update Doctor
export const UpdateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const up_doctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!up_doctor)
      return res.status(404).json({
        message: "Doctor not found with that ID.",
        status: false,
      });
    else
      res.status(201).json({
        status: "success",
        message: "Update successfully",
        data: up_doctor,
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to update.",
    });
  }
};
// Delete Doctor
export const DeleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const del_doctor = await Doctor.findByIdAndDelete(id);

    if (!del_doctor)
      return res.status(404).json({
        status: false,
        message: `Doctor not found with that ID.`,
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
// Get all Doctor
export const GetAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;

    if (query)
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { speciality: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    else doctors = await Doctor.find().select("-password");

    if (!doctors || doctors.length === 0)
      return res.status(404).json({
        status: false,
        message: "No doctor found",
      });
    else
      res.status(200).json({
        status: "succes",
        message: "Getting all doctor was successful!",
        count: doctors.length,
        data: doctors,
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      message: "The request could not be processed",
    });
  }
};

// Get one Doctor
export const GetOneDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const getDoctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");

    if (!getDoctor)
      return res.status(404).json({
        status: false,
        message: `Doctor not found with that ID.`,
      });
    else
      res.status(200).json({
        status: "success",
        message: "Get user successfully",
        data: getDoctor,
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to get user.",
    });
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;
  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor)
      return res.status(404).json({
        status: false,
        message: "Doctor not found ",
      });

    const { password, ...rest } = doctor._doc;
    const appointments = await Booking.find({ doctor: doctorId });
    res.status(200).json({
      status: true,
      message: "successfully get profile info",
      data: { ...rest, appointments },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: "Somethin want wrong Couldn't find profile",
    });
  }
};
