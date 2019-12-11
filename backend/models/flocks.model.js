const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flockSchema = new Schema({
    username: { type: String,required: true },
    description: {type: String, required: true},
    tagNo: {type: Number, required: true},
    group: {type: String, required:true},
    },{
        timestamps:true,
})

const Flock = mongoose.model('Flock', flockSchema);

module.exports = Flock;