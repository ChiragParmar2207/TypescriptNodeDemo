import * as dotenv from 'dotenv';
import * as path from 'path';
import mongoose from 'mongoose';
import envVars from '../config/environmentVariables';
import { ENVIRONMENT } from '../constants/key.constants';
import responseMessages from '../constants/responseMessages';

/**
 * A class to store server configuration
 */
export class ServerConfig {
  public environment: 'development' | 'staging' | 'production';
  public port: number;
  public developerName: string;
  public database: string;
  public dbURL: string;

  constructor() {}

  /**
   * Initialize the config object
   */
  public initialize(): void {
    // Read the environment file
    dotenv.config({ path: path.resolve(__dirname, '../../.env') });

    // Set the developer name
    this.developerName = envVars.DEVELOPER_NAME || 'unknown';

    // Set the node environment
    const nodeEnvironment = envVars.NODE_ENV;
    switch (nodeEnvironment?.trim()) {
      case ENVIRONMENT.PRODUCTION:
        this.environment = ENVIRONMENT.PRODUCTION;
        break;
      case ENVIRONMENT.STAGING:
        this.environment = ENVIRONMENT.STAGING;
        break;
      default:
        this.environment = ENVIRONMENT.DEVELOPMENT;
        break;
    }

    // Set the port
    this.port = Number(envVars.PORT) || 5050;

    // Connect with MongoDB
    const mongodbUrl = envVars.MONGODB_URL;
    this.database = envVars.MONGODB_DATABASE_NAME;
    this.dbURL = mongodbUrl + this.database;
    this.initializeMongoDb();
  }

  /**
   * Initializes the MongoDB connection.
   */
  private initializeMongoDb() {
    mongoose.set('strictQuery', true);
    mongoose
      .connect(this.dbURL)
      .then(() => {
        console.log(`========== ${responseMessages.DB_CONNECTION_SUCCESS} ==========`);
      })
      .catch((error) => console.log(`========== ${responseMessages.DB_CONNECTION_FAIL}  ==========\n`, error));
  }
}
