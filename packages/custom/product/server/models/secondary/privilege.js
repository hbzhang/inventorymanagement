/**
 * Created by hbzhang on 10/4/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PrivilegeSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    fornames:{},
    whatcando: {}
});

var populateQuery1 = [{path:'user'}];
PrivilegeSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate(populateQuery1).exec(cb);
};

mongoose.model('Privilege', PrivilegeSchema);

