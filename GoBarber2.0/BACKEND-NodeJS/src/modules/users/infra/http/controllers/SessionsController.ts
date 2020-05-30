import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const sessionsService = container.resolve(AuthenticateUserService);

    const { user, token } = await sessionsService.execute({ email, password });

    return response.json({ user: classToClass(user), token });
  }
}

export default new SessionsController();
