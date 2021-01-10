import * as mongoose from 'mongoose';
import Database from '../database/index';
Database;

const database = mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true, useUnifiedTopology: true
}); 
  
export default database;