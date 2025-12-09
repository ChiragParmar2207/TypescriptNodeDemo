import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
const { combine, timestamp, printf, json } = format;

const logDir = path.join(process.cwd(), 'logs');

const fileRotateTransport = new transports.DailyRotateFile({
  dirname: logDir,
  filename: 'app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  zippedArchive: true,
  level: 'info',
});

const errorRotateTransport = new transports.DailyRotateFile({
  dirname: logDir,
  filename: 'error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  maxFiles: '30d',
  zippedArchive: true,
});

const consoleFormat = printf(({ level, message, timestamp, ...meta }) => {
  const rest = Object.keys(meta).length ? JSON.stringify(meta) : '';
  return `${timestamp} [${level}] : ${message} ${rest}`;
});

export const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
    fileRotateTransport,
    errorRotateTransport,
    new transports.Console({
      level: 'debug',
      format: combine(timestamp(), consoleFormat),
    }),
  ],
});

export default logger;
