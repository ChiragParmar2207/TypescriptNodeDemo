import { Request, Response } from 'express';
import logger from '../utils/logger';
import responseMessages from '../constants/responseMessages';

export const errorHandler = (err: any, req: Request, res: Response) => {
  const requestId = (req as any).requestId || 'no-request-id';
  const status = err.status || 500;

  logger.error('unhandled_error', {
    requestId,
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    params: req.params,
    query: req.query,
    body: req.body,
  });

  res.status(status).json({
    error: {
      message: status >= 500 ? responseMessages.INTERNAL_SERVER_ERROR : err.message,
      requestId,
    },
  });
};
