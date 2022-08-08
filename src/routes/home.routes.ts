import express from 'express';
import { home } from '../controllers/home';

const router = express.Router();

router.route('/').get(home);

const homeRouter = router;
export default homeRouter;
