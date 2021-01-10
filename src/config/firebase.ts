import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';
import * as dotenv from 'dotenv';
dotenv.config();

const data: any = serviceAccount;

admin.initializeApp({
    credential: admin.credential.cert(data),
    storageBucket: process.env.KEY
  });
let bucket = admin.storage().bucket();
export default bucket; 