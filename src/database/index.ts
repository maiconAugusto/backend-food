import * as mongoose from 'mongoose';

const database = mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true, useUnifiedTopology: true
}); 

export default database;