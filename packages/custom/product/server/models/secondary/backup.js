/**
 * Created by hbzhang on 11/21/14.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BackupSchema = new Schema({
    users: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    supervisor_edit: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    information:{},
    otherinformation:{},
    reasonforregister:{},
    registercreatedtime: {
        type: String,
        required: true,
        trim: true
    }
});

var populateQuery1 = [{path:'users'}];
BackupSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate(populateQuery1).exec(cb);
};

mongoose.model('Backup', BackupSchema);

