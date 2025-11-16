import express from 'express';
import {
    publicTest,
    profile,    
    updateProfile
} from '../controllers/afterLogin.controller.js';
import { authMiddleware as auth } from "../middlewares/Auth/auth.js"


const router = express.Router();

router.get("/public-test",  publicTest);

// Protected routes
router.get("/simpleProfile", auth,  profile);
router.post("/update", auth, updateProfile);

export default router;
