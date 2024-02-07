import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

import User from '../models/user';

const router = express.Router();

router.post(
  '/register',
  [
    check('firstName', 'First Name is required').isString(),
    check('lastName', 'Last Name is required').isString(),
    check('email', 'Email is required').isString(),
    check('password', 'Password with 6 or more characters required').isLength({
      min: 6
    })
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array() })
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(409).json({ message: 'User already exists' });
      }

      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: '1d'
        }
      );

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000
      });

      return res.status(201).json({ message: 'User registration successful!' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Something went wrong!' });
    }
  }
);

export default router;