import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger';

const maskSensitive = (obj: any) => {
  if (!obj || typeof obj !== 'object') return obj;
  const clone: any = Array.isArray(obj) ? [] : {};
  for (const k of Object.keys(obj)) {
    if (/password|pass|pwd|secret|token|authorization|auth/i.test(k)) {
      clone[k] = '****';
    } else {
      clone[k] = typeof obj[k] === 'object' ? maskSensitive(obj[k]) : obj[k];
    }
  }
  return clone;
};

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const requestId = uuidv4();
  (req as any).requestId = requestId;

  const start = Date.now();

  // Log incoming request
  logger.info('incoming_request', {
    requestId,
    method: req.method,
    url: req.originalUrl || req.url,
    params: maskSensitive(req.params),
    query: maskSensitive(req.query),
    body: maskSensitive(req.body),
    ip: req.ip,
  });

  const originalSend = res.send.bind(res);

  (res as any).send = function (body?: any) {
    const duration = Date.now() - start;

    let loggedBody: any = body;
    try {
      if (typeof body === 'string') {
        try {
          loggedBody = JSON.parse(body);
        } catch {
          loggedBody = body;
        }
      }
    } catch (err) {
      loggedBody = '[unserializable response body]';
    }

    logger.info('outgoing_response', {
      requestId,
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode: res.statusCode,
      responseBody: maskSensitive(loggedBody),
      durationMs: duration,
    });

    return originalSend(body);
  };

  next();
};
