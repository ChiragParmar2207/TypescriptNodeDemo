// import 'newrelic';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import { RequestHandler } from 'express-serve-static-core';
import morgan from 'morgan';
import { iocContainer } from './inversify.config';
import { ServerConfig } from './config/server.config';

// Start the server
const server = new InversifyExpressServer(iocContainer, null, {
  rootPath: '/api',
});

// Initialize the server configuration
const serverConfig = iocContainer.get<ServerConfig>(ServerConfig);
serverConfig.initialize();

import './controllers/index';

server.setConfig((app) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }) as RequestHandler
  );
  app.set('port', serverConfig.port);
  // app.use(bodyParser.text() as RequestHandler);
  // app.use(bodyParser.json({ limit: '50mb' }) as RequestHandler);
  // app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }) as RequestHandler);
  app.use(helmet());
  app.use(cors());
  app.use(morgan('dev'));
  const cacheTime = 31536000;
  app.use(express.static('assets', { maxAge: cacheTime }) as RequestHandler);

  //
  app.use(express.json({ limit: '50mb' }) as RequestHandler);
  app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }) as RequestHandler);
});

const app = server.build();

app.get('/', (_req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'Hello, World!' });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(app.get('port'), () => {
  console.log(
    `========== Server is running on port ${app.get('port')}, ${app.get('env')}, ${
      serverConfig.developerName
    } ==========`
  );
});
