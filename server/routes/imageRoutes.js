// routes/imageRoutes.js
import express from 'express';
import { generateImage } from '../controllers/imageController.js';

const router = express.Router();

router.post('/generate-image', generateImage);

export default router;