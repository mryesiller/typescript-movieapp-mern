import express from 'express';
import { postRegister, postLogin } from '../controllers/auth';

const router = express.Router();

router.route('/register').post(postRegister);
router.route('/login').post(postLogin);

const authRouter = router;
export default authRouter;
