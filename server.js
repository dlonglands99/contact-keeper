const express = require("express");
const connectDB = require("./config/db");

//Init server
const app = express();
const PORT = process.env.PORT || 5000;

//Init DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
