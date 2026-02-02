const express = require("express");

const router = express.Router();
const jobs = [];

/// Adding Job Route

router.post("/", (req, res) => {
  const { companyname, jobrole, ctc, impDate, type, email } = req.body;

  if (!companyname || !jobrole || !type || !email) {
    return res.status(400).json({ message: "This field cannon be empty" });
  }

  const newjob = {
    id: Date.now(),
    companyname,
    jobrole,
    ctc,
    impDate,
    type,
    email,
  };

  jobs.push(newjob);

  res.status(201).json(newjob);
});

/// Lising

router.get("/", (req, res) => {
  res.status(200).json(jobs);
});
module.exports = router;
