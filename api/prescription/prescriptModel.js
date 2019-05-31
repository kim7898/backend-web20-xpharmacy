const { model, Schema } = require('mongoose');
const prescriptSchema = new Schema({
    image: {type: Buffer, required: true},
    contentType: { type: String, required: true },
    phone: String,
    createAt: {type: Date, default: new Date()},
    createBy: {type: Schema.Types.ObjectId, ref: "user", required: true}
});
module.exports = model("presciption", prescriptSchema);