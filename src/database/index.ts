import * as mongoose from 'mongoose';

class DataBase {
    private db_url = process.env.MONGO;
    createConnection() {
        mongoose.connect(this.db_url);
    }
}
export default  DataBase; 