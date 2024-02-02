const User = require("../models/user-model");
const Contact = require("../models/contact-model");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, {password: 0});
        if(!users || users.length == 0) {
            return res.status(404).json({ message: "No user found!"});
        }  
        res.status(200).json(users);      
    } catch (error) {
        next(error);
    }
}

const getAllContacts = async (req, res) => {
    try {
        const contact = await Contact.find()
        if(!contact || contact.length == 0) {
            return res.status(404).json({ message: "No contact found!"});
        }  
        res.status(200).json(contact);      
    } catch (error) {
        next(error);
    }
}

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: "User Delete Successfully" });
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, {password: 0});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const updatetUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updateData = await User.updateOne({ _id: id }, {$set: data});
        return res.status(200).json(updateData);
    } catch (error) {
        next(error);
    }
}

const deleteContactById = async (req, res) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id });
        return res.status(200).json({ message: "Contact Delete Successfully" });
    } catch (error) {
        next(error);
    }
}


module.exports = { getAllUsers, getAllContacts, deleteUserById, getUserById, updatetUserById, deleteContactById };

