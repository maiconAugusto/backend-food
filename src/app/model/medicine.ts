import * as mongoose from 'mongoose';

const medicines = new mongoose.Schema({
    product: {type: 'string', required: true},
    description: {type: 'string'},
    price: {type: 'string'},
    validity: {type: 'string', required: true},
    quantity: {type: 'string', required: true},
})
export default mongoose.model('medicines', medicines);