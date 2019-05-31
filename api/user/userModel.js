const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    account: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: String,
    address: String,
    phone: String,
    email: String
});

userSchema.pre("save", function(next) {
    if (!this.isModified("password")) {
        return next();
    } else {
        bcrypt
            .genSalt(12)
            .then(salt => bcrypt.hash(this.password, salt))
            .then(hash => {
                this.password = hash;
                next();
            }).catch(err => next(err));
    }
});
module.exports = mongoose.model("user", userSchema);