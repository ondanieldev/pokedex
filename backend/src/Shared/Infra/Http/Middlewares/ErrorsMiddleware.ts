import { Request, Response, NextFunction } from 'express';
import { getLogger } from 'log4js';
import HttpError from '../Errors/HttpError';

const logger = getLogger('middleware error');

class ErrorsMiddleware {
  public execute(
    err: Error,
    _request: Request,
    response: Response,
    _: NextFunction,
  ): Response {
    if (err instanceof HttpError) {
      return response.status(err.statusCode).json({ error: err.message });
    }

    logger.error(err);

    return response.status(500).json({ error: 'Internal server error.' });
  }
}

export default ErrorsMiddleware;
