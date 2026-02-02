const express = require("express");
const connectDB = require("./db"); // only import connectDB here
const jobsRoute = require("./routes/jobs");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

connectDB(); // connects to MongoDB

app.use("/jobs", jobsRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
