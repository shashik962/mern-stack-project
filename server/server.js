require('dotenv').config()
const express  = require("express");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const connectDB = require("./controllers/utils/db");
const errorMiddleware = require('./middleware/error-middleware');
const cors = require('cors');
const adminRoute  = require("./router/admin-router");

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}

const app = express();
app.use(express.json());
app.use(cors(corsOptions))


app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
// app.get("/", (req, res) => {
//     res.status(200).send("Welcome to my application");
// });

// app.get("/register", (req, res)=> {
//     res.status(200).send("This is registeration page.");
// });

//Let's define admin route
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

const PORT  = 5100;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at port: ${PORT}`);
    });
})
