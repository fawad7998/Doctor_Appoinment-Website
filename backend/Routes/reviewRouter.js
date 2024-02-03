import express from "express";
import {
  getAllRevie,
  createNewReview,
} from "./../Controller/reviewController.js";
import { authentication, restrictTo } from "./../Controller/authVerify.js";

const router = express.Router({ mergeParams: true });

//get all reviews
router
  .route("/")
  .get(getAllRevie)
  .post(authentication, restrictTo(["patient"]), createNewReview);
// router.get("/");
// router.post("/");

router.route("/:id").get().put().delete();
// router.get('/:id');
// router.put('/:id');
// router.delete('/:id');

export default router;
