const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    message: { type: String, require: true },
});

//create a model or a collection
const Contact = new model("contact", contactSchema);
module.exports = Contact;
