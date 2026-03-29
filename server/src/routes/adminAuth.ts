import express from 'express';
import { signUpAdmin, signInAdmin, logoutAdmin } from '../controllers/adminAuth';

const router = express.Router();

router.post('/signup', signUpAdmin);
router.post('/signin', signInAdmin);
router.post('/logout', logoutAdmin);

export default router;