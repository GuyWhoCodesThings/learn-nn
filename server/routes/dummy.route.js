import express from 'express';
import { dumb } from '../controllers/dummy.controller.js';


const router = express.Router();

router.get('/dumb', dumb);

export default router;