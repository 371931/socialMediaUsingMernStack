import Express from "express";
import { postLogin,postRegister,postLogout } from "../controllers/auth.js";

const router = Express.Router();

router.post("/register",postRegister);
router.post("/login",postLogin);
router.post("/logout",postLogout);

export default router;