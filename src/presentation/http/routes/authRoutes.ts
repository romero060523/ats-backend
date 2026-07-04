import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { validate } from "../middlewares/validate";
import { registrarSchema, loginSchema } from "../validators/authValidators";
import * as authController from "../controllers/AuthController";

const router = Router();

router.post("/registro", validate(registrarSchema), authController.registro);
router.post("/login", validate(loginSchema), authController.login);
router.get("/me", authenticate, authController.me);

export default router;
