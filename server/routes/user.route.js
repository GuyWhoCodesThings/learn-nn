import express from 'express';
import { load, loadUserCode, saveUserCode, signup } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/sign-up', verifyToken, signup);
router.post('/save', verifyToken, saveUserCode);
router.get('/load', verifyToken, load);
router.get('/code', verifyToken, loadUserCode);

export default router;