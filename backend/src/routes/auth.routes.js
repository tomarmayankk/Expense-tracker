import express from 'express';
import { checkAuth, signin, signout, signup } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', signout)

router.get('/check', protectRoute, checkAuth)

export default router;