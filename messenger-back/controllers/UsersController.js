import validate from "../services/validate";
import {Users} from "../models";
import HttpErrors from "http-errors";
import JWT from 'jsonwebtoken'

const {JWT_SECRET} = process.env;

class UsersController {

    static register = async (req, res, next) => {
        try {
            validate(req.body, {
                firstName: 'required|string|min:3',
                lastName: 'required|string|min:3',
                email: 'required|email',
                password: 'required|string|min:3'
            });
            const {firstName, lastName, email, password} = req.body;

            const exists = await Users.findOne({
                where: {email},
                attributes: ['id']
            });
            if (exists) {
                throw HttpErrors(422, {
                    errors: {
                        error: ['email already exists']
                    }
                });
            }
            const user = await Users.create({
                firstName, lastName, email, password
            });
            const token = JWT.sign({userId: user.id}, JWT_SECRET);

            res.json({
                status: 'ok',
                message: 'you have successfully registered',
                token,
                user,
            });
        } catch (e) {
            next(e);
        }
    }

    static login = async (req, res, next) => {
        try {
            validate(req.body, {
                email: 'required|email',
                password: 'required|string'
            });
            const {email, password} = req.body;
            const user = await Users.findOne({
                where: {email},
                attributes: ['id', 'password']
            });
            if (!user || user.getDataValue('password') !== Users.hash(password)) {
                throw HttpErrors(403,{
                    errors: {
                        error: ['wrong password or email']
                    }
                });
            }
            const token = JWT.sign({userId: user.id}, JWT_SECRET);
            res.json({
                status: 'ok',
                token,
                user,
            });
        } catch (e) {
            next(e);
        }
    }

    static accountMe = async (req, res, next) => {
        try {
            const {userId} = req;
            console.log(userId)
            const user = await Users.findOne({
                where: {id: userId},
            });

            res.json({
                user,
            });
        } catch (e) {
            next(e);
        }
    }
    static account = async (req, res, next) => {
        try {
            const {userId} = req.params;
            console.log(userId)
            const user = await Users.findOne({
                where: {id: userId},
            });
            res.json({
                user,
            });
        } catch (e) {
            next(e);
        }
    }

    static list = async (req, res, next) => {
        try {
            const {s = ''} = req.query;
            const where = {}
            if (s) {
                where.$or = [
                    {firstName: {$like: `%${s}%`}},
                    {lastName: {$like: `%${s}%`}},
                    // {email: {$like: `%${s}%`}},
                ]
            }
            const users = await Users.findAll({
                where,
            });
            res.json({
                status: 'ok',
                users,
            });
        } catch (e) {
            next(e);
        }
    }

}

export default UsersController;
