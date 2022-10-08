import express from "express";
import UsersController from "../controllers/UsersController";

const router = express.Router();

router.post('/register', UsersController.register);
router.post('/login', UsersController.login);
router.get('/account/me', UsersController.accountMe);
router.get('/account/:userId', UsersController.account);
router.get('/list', UsersController.list);

export default router
