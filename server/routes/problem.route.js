import express from 'express';
import { createProblem, listProblems, loadProblem, python } from '../controllers/problem.controller.js';


const router = express.Router();

router.post('/create', createProblem);
router.get('/load/:id', loadProblem);
router.get('/list', listProblems);
router.post('/python', python);

export default router;