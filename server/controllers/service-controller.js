const Service = require("../models/service-model");


const services = async (req, res) => {
    try {
        const response = await Service.find();
        if(!response) {
            res.status(200).json({ msg: "No service found!" });
            return;
        }

        res.status(200).json({ msg: response});

    } catch (error) {
        console.log(`Services: ${error}`);
    }
}

module.exports = services;
