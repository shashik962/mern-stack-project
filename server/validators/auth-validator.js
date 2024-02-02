const { z } = require("zod");


const loginSchema = z.object({
    email: z
        .string({ required_error: "Name is required" })
        .trim()
        .email({ message: "Invalid email address." })
        .min(3, { message: "Name must be at lest of 3 chars." })
        .max(255, { message: "Name must not be more than 255 characters."}),
    password: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(7, { message: "Password must be at lest of 3 chars." })
        .max(1024, { message: "Password must not be more than 255 characters."}),     
});

//creating an object schema
const signupSchema = loginSchema.extend({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at lest of 3 chars." })
        .max(255, { message: "Name must not be more than 255 characters."}), 
    phone: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(10, { message: "Name must be at lest of 3 chars." })
        .max(10, { message: "Name must not be more than 255 characters."}),       
});

module.exports = { signupSchema, loginSchema };