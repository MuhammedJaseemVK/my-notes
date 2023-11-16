import express from 'express';
import { signupController, loginController, requireSignin } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);

export default router;