import Review from "./../models/ReviewSchema.js";
import User from "./../models/UserSchema.js";
import Doctor from "./../models/DoctorSchema.js";

// Get All Review
export const getAllRevie = async (req, res) => {
  try {
    const review = await Review.find();

    if (!review)
      return res.status(404).json({
        status: false,
        message: "No Reviews found",
      });

    res.status(404).json({
      status: true,
      message: "Successfull",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

// Create Review
export const createNewReview = async (req, res) => {
  // Validate user is logged in or not

  if (!req.body.doctor) req.body.doctor = req.params.doctorId;
  if (!req.body.user) req.body.user = req.userId;

  const newReview = new Review(req.body);

  try {
    const saveReview = await newReview.save();

    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: saveReview._id },
    });
    res.status(201).json({
      status: true,
      message: "Review submited",
      data: saveReview,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};
