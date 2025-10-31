import * as dotenv from 'dotenv';
import * as path from 'path';
import mongoose from 'mongoose';
import { ENVIRONMENT, DB_CONNECTION } from '../constants/key.constants';

export const BASE_DIR = __dirname;
export const ROOT_DIR = path.join(__dirname, '../../');
export const FILE_UPLOAD_PATH = ROOT_DIR + '/uploads';

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
    this.developerName = process.env.DEVELOPER_NAME || 'unknown';

    // Set the node environment
    const nodeEnvironment = process.env.NODE_ENV;
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
    this.port = Number(process.env.PORT) || 5050;

    // Connect with MongoDB
    const mongodbUrl = process.env.MONGODB_URL;
    this.database = process.env.MONGODB_DATABASE_NAME;
    this.dbURL = mongodbUrl + this.database;
    this.initializeMongoDb();
  }

  /**
   * Initializes the MongoDB connection.
   */
  private initializeMongoDb() {
    console.log('==========> initializeMongoDb');
    mongoose.set('strictQuery', true);
    mongoose
      .connect(this.dbURL)
      .then(() => {
        console.log(`========== ${DB_CONNECTION.SUCCESS} ==========`);
      })
      .catch((error) => console.log(`========== ${DB_CONNECTION.FAIL}  ==========\n`, error));
  }
}
