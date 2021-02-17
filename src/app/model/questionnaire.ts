import * as mongoose from 'mongoose';

const questionnaire = new mongoose.Schema({
    user: {type: 'string', required: true},
    title: {type: 'string'},
    questionnaires: Array,
    latitude: {type: 'string'},
    longitude: {type: 'string'},
    date: {type: 'string'},
})
export default mongoose.model('questionnaire', questionnaire);