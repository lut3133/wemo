const mongoose = require('mongoose')
const mongooseAutoInc = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const fileHistorySchema = new Schema({
    fileId: {
        type: Number,
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

fileHistorySchema.plugin(mongooseAutoInc.plugin, 'fileHistory');

module.exports = mongoose.model('fileHistory', fileHistorySchema);
