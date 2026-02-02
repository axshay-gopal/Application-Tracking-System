const express = require("express");

const router = express.Router();
const jobs = [];

/// Adding Job Route

router.post("/", (req, res) => {
  const { companyname, jobrole, ctc, impDate, type, email, status } = req.body;

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
    status: "applied",
  };

  jobs.push(newjob);

  res.status(201).json(newjob);
});

/// Lising

router.get("/", (req, res) => {
  res.status(200).json(jobs);
});
module.exports = router;

// Update job status
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["applied", "interview", "reject", "offer"];

  // Validate status
  if (!status || !allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: `Status is required and must be one of: ${allowedStatuses.join(", ")}`,
    });
  }

  // Find job
  const job = jobs.find((j) => j.id === parseInt(id));

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  // Update status
  job.status = status;

  res.status(200).json(job);
});

// delete
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const index = jobs.findIndex((j) => j.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: "Job not found" });
  }

  // Remove job from array
  const removedJob = jobs.splice(index, 1)[0];

  res.status(200).json({
    message: "Job deleted successfully",
    job: removedJob,
  });
});
