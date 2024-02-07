import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import validateToken from '../middleware/auth';

const router = express.Router();

router.post(
  '/login',
  [
    check('email', 'Email field is required').isString(),
    check('password', 'Password with 6 or more characters required').isLength({
      min: 6
    })
  ],
  async (req: Request, res: Response) => {
    // validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(422).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(401).json({ message: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: '1d'
        }
      );

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 86400000,
        sameSite: 'none'
      });
      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

router.get('/validate-token', validateToken, async (req: Request, res: Response) => {
  res.status(200).json({ userId: req.userId })
})

export default router;
