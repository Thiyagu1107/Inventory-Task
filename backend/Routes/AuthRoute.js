import express from "express";
import {
  forgetPasswordController,
  loginController,
  registerController,
  registerOTPController,
  resetPasswordController,
} from "../Controllers/AuthController.js";
import { isAdmin, requireSignIn } from "../Middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/registerotp", registerOTPController);
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgetpassword", forgetPasswordController);
router.post("/resetPassword", resetPasswordController);

//protected User route auth
router.get("/userdashboard", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admindashboard", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
