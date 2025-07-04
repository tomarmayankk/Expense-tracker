import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getSmartSuggestions } from '../controllers/suggestions.controller.js';

const router = express.Router();

router.get('/', protectRoute, getSmartSuggestions);

export default router;
