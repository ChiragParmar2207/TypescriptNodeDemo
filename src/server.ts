import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import { RequestHandler } from 'express-serve-static-core';
import swaggerJsDoc from 'swagger-jsdoc';
import basicAuth from 'express-basic-auth';
import swaggerUi from 'swagger-ui-express';
import { iocContainer } from './inversify.config';
import { ServerConfig } from './config/server.config';
import envVars from './config/environmentVariables';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import logger from './utils/logger';
import responseMessages from './constants/responseMessages';
import './controllers/index';

// Start the server
const server = new InversifyExpressServer(iocContainer, null, {
  rootPath: '/api',
});

// Initialize the server configuration
const serverConfig = iocContainer.get<ServerConfig>(ServerConfig);
serverConfig.initialize();

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
  const cacheTime = 31536000;
  app.use(express.static('assets', { maxAge: cacheTime }) as RequestHandler);

  app.use(express.json({ limit: '50mb' }) as RequestHandler);
  app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }) as RequestHandler);
});

const app = server.build();

app.use(requestLogger);

// Start swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node demo project API Documentation',
      version: '1.0.0',
      description: 'This is the API documentation for the Node demo project.',
      termsOfService: 'http://example.com/terms/',
      contact: {
        name: 'API Support',
        url: 'https://temp.com',
        email: 'chigsparmar07@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5050',
        description: 'Node demo API Documentation',
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  apis: ['./src/**/*.ts'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  basicAuth({ users: { [envVars.SWAGGER_USERNAME]: envVars.SWAGGER_PASSWORD }, challenge: true }),
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);
// End swagger setup

/**
 * @swagger
 *  tags:
 *    name: Default
 *    description: Health Document
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a welcome message
 *     description: This endpoint returns a 'Hello, World!' message.
 *     tags: [Default]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello, World!"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
app.get('/', (_request: Request, response: Response) => {
  try {
    return response.status(200).json({ message: 'Hello, World!' });
  } catch (error) {
    logger.error('health_check_error', { error: (error as Error).message });
    return response.status(500).json({ error: (error as Error).message || responseMessages.INTERNAL_SERVER_ERROR });
  }
});

app.use(errorHandler);

app.listen(app.get('port'), () => {
  console.log(
    `========== Server is running on port ${app.get('port')}, ${app.get('env')}, ${
      serverConfig.developerName
    } ==========`
  );
});
