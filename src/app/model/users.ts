import * as mongoose from 'mongoose';

const users = new mongoose.Schema({
    name: {type: 'string', required: true},
    lastName: {type: 'string'},
    email: {type: 'string', unique: true, required: true},
    password: {type: 'string', required: true},
    image_url: {type: 'string'},
    image_path: {type: 'string'},
    storeName: {type: 'string'},
    active: Boolean,
    isfoof: Boolean
})
export default mongoose.model('users', users);