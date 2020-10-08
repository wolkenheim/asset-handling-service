import { Injectable, NestMiddleware, MethodNotAllowedException } from '@nestjs/common';
import { Request, Response } from 'express';
import * as config from 'config';

@Injectable()

export class TokenMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {

        if (!req.headers.authorization) {
            throw new MethodNotAllowedException("Not authenticated");
        }

        const token = req.headers.authorization.split(" ")
        if (token.length !== 2 || token[1] !== config.token) {
            throw new MethodNotAllowedException("Not authenticated");
        }
        next();
    }

}