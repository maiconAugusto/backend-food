import * as dotenv from 'dotenv';
dotenv.config();

const data =  {
    hash: process.env.HASH,
    expiresIn: process.env.EXPIRESIN
}
export default data; 