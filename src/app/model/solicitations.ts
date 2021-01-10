import * as mongoose from 'mongoose';

const solicitation = new mongoose.Schema({
    solicitation: { type: Object, required: true }
})
export default mongoose.model('solicitation', solicitation);