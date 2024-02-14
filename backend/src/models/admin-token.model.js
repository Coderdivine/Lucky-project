const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    admin_id: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 900
    }
});

const passwordtokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 900
    }
});

mongoose.Query.prototype.setOptions = function () {
    if (this.mongooseOptions().lean == null) {
        this.mongooseOptions({ lean: true });
    }
    return this;
};

const VToken = mongoose.model("dabinx-admin-token", tokenSchema);
const FToken = mongoose.model("dabinx-admin-ptoken", passwordtokenSchema);

module.exports = {
    VToken,
    FToken
}
