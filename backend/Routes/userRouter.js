import express from "express";

import {
  UpdateUser,
  DeleteUser,
  GetOneUser,
  GetAllUsers,
  getUserProfile,
  getAppointments,
} from "../Controller/userController.js";
import { authentication, restrictTo } from "../Controller/authVerify.js";

const router = express.Router();

router.get("/", authentication, restrictTo(["admin"]), GetAllUsers);
router.get("/:id", authentication, restrictTo(["patient"]), GetOneUser);
router.delete("/:id", authentication, restrictTo(["patient"]), DeleteUser);
router.put("/:id", authentication, restrictTo(["patient"]), UpdateUser);

router.get(
  "/profile/me",
  authentication,
  restrictTo(["patient"]),
  getUserProfile
);
router.get(
  "/appointments/my-appointments",
  authentication,
  restrictTo(["patient"]),
  getAppointments
);

export default router;
