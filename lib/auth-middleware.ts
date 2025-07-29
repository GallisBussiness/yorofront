import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { auth } from './auth';
import { fromNodeHeaders } from 'better-auth/node';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split('Bearer ').at(1);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const tokenFromClient = token.split('.')[0];
    const tokenSession = session.session.token;
    if (tokenFromClient !== tokenSession) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  }
}
