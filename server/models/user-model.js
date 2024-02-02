const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

//? secure the password with the bcypt
userSchema.pre('save', async function(next) {
    console.log("pre method", this);

    const user = this;

    if(!user.isModified("password")) {
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password  = hash_password;


    } catch (error) {
        next(error);    
    }

})

userSchema.methods.comparePassword = async function (password) {
    return  bcrypt.compare(password, this.password);
}

//json web token 
//INSTANCE METHOD
//jsonwebtoken install
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        }, 
        process.env.JWT_SECRET_KEY, {
            expiresIn: "30d"
        }
        );
    } catch (error) {
        console.log(error);
    }
};




//define the model or the collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;

// ** what is JWT ? **
// - JSON Web Tokens ( JWT ) is an open stardard  ( RFC 7519 ) that defines a compact and self-contained way
    // for secruely transmitting information between parties as a JSON object.
//?  - JWT are often used for authentication and authoriztion in web applications.
//? - **Authentication:** verifying the identity of a user or client.
//? - **Authorization:** Determining the actions a user or client is allowed to perform.


// **Components of a JWT: ** 
// - Header: contains metadata about the token, such as the type of token and the signing algorithm being used.
// - Payload: Contains claims or statements about an entity (typically, the user) and additional data.
     //Common claims include user ID, username, and expiration time.
//  - Signature: To  verifty that the sender of the JWT is who it says it is and to ensure that the message wasn't 
      //changed along the way, a signature is included.

// json web token
/* Tokens, such as JWTs (JSON WEB TOKENS), are typically not stored in the database along with other user
details. Instead, they are issued by the user during the authenticatio process and then stored on the client-side
(e.g. is cookies or local storage) for later use. */
