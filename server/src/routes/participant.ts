import { Router } from 'express';
import { registerParticipant } from '../controllers/participant';
import { upload, uploadImage } from '../utils/uploadImage';

const router = Router();

router.post('/register', upload.single('paymentSS'), uploadImage, registerParticipant);

export default router;
