import * as mongoose from 'mongoose';

const products = new mongoose.Schema({
    product: {type: 'string', required: true},
    description: {type: 'string'},
    image_url: {type: 'string'},
    image_path: {type: 'string'},
    price: {type: 'string'},
    type: {type: 'string'},
    like: { type: Number },
    deslike: { type: Number },
    userId: {type: 'string'}
})
export default mongoose.model('products', products);