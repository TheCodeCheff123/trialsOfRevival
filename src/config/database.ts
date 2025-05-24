import mongoose from 'mongoose';
import logger from './logger';

class Database {
  private DATABASE: string;
  private logger;

  constructor() {
    this.DATABASE =
      process.env.NODE_ENV === 'test'
        ? process.env.DATABASE_TEST
        : process.env.DATABASE;

    this.logger = logger.logger;
  }

  public initializeDatabase = async (): Promise<void> => {
    try {
      await mongoose.connect(this.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      this.logger.info('Connected to the database.');
    } catch (error) {
      this.logger.error('Could not connect to the database.', error);
    }
  };
}

export default Database;
