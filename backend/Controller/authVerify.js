import jwt from "jsonwebtoken";
import User from "./../models/UserSchema.js";
import Doctor from "./../models/DoctorSchema.js";

export const authentication = async (req, res, next) => {
  // get token from header
  const authToken = req.headers.authorization;
  // check tokrn is exist
  if (!authToken || !authToken.startsWith("Bearer"))
    res.status(401).json({
      success: false,
      message: "No Authentication Token provided",
    });

  try {
    const token = authToken.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.status(401).json({
        message: "Token is Expired",
      });

    return res.status(401).json({
      status: false,
      message: "Invalid Token or JWT Secret Key is wrong.",
    });
  }
};

export const restrictTo = (roles) => async (req, res, next) => {
  const userId = req.userId;
  let user;

  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);

  if (patient) user = patient;
  if (doctor) user = doctor;

  if (!roles.includes(user.role))
    return res.status(401).json({
      status: false,
      message: "User is not Authorised",
    });
  next();
};
