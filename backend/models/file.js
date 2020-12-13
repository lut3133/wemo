const mongoose = require('mongoose')
const mongooseAutoInc = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const fileSchema = new Schema({
    path: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});

fileSchema.plugin(mongooseAutoInc.plugin, 'file');

module.exports = mongoose.model('file', fileSchema);
