import mongoose from 'mongoose';
import logger from './logger';

class Database {
  private MONGO_URI: string;
  private logger;

  constructor() {
    this.MONGO_URI =
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_URI_PROD
        : process.env.MONGO_URI;

    this.logger = logger.logger;
  }

  public initializeDatabase = async (): Promise<void> => {
    try {
      await mongoose.connect(this.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retryWrites: true,
        w: 'majority'
      });
      this.logger.info('Connected to the database.');
    } catch (error) {
      this.logger.error('Could not connect to the database.', error);
    }
  };
}

export default Database;
