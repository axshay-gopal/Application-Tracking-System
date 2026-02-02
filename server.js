const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
//listing jobs

//adding job route

const jobsRoute = require("./routes/jobs.js");
app.use("/jobs", jobsRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
