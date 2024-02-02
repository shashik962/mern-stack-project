const User = require("../models/user-model");
const bcrypt = require('bcryptjs');

const home = async (req, res) => {
    try {
        res.status(200).send("Welcome to my application by  router");
    } catch (error) {
        res.status(400).send({msg: "page not found"});
    }
}

// 1. Get Registration Data: Retrieve user data (username, email, password),
// 2. Check Email Existence:  check if the email is already registed,
// 3. Hash Password :  securely hash the password.
// 4. Create User: Create a rew user with hashed password.
// 5. Save to DB: save user data to the database.
// 6. Respond: Respond with "Registration Successful" or handle errors.


const register = async (req, res) => {
    try {
        // console.log(req.body);
        const { username, email, phone, password} = req.body;

        const userExist = await User.findOne({ email: email});

        if(userExist) {
            return res.status(400).json({ message: "email already exists" });
        }

        // //hash the password
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound);

        const userCreated = await User.create({username, email, phone, password});

        res.status(201).json({ "msg": "Registration Successfully!", "userData": userCreated, token: await userCreated.generateToken(), userId: userCreated._id.toString() });

    } catch (error) {
        res.status(500).send({msg: "Internal server error"});
    }
    
}

const login = async (req, res) => {
    try {
        const { email, password} = req.body; 

        const userExist = await User.findOne({ email });

        if(!userExist){
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        //const user = await bcrypt.compare(password, userExist.password);
        const user = await userExist.comparePassword(password);

        if(user) {
            res.status(200).json({ 
                msg: "Login Successfully!", 
                token: await userExist.generateToken(), 
                userId: userExist._id.toString() 
            }); 
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }

    } catch (error) {
        // res.status(500).send({msg: "Internal server error"});
        next(error);
    }
}

// *-------------------
// User Logic
// *-------------------

const user = async (req, res) => {
    try {
      // const userData = await User.find({});
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({userData });
    } catch (error) {
      console.log(` error from user route ${error}`);
    }
};


module.exports = { home, register, login, user };