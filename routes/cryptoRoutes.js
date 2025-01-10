import express from 'express'
import { getStats,getDeviation } from '../services/statsServices.js';
const router = express.Router();

router.route('/stats').get(getStats)
router.route('/deviation').get(getDeviation)

export default router
