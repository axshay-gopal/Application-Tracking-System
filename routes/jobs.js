const express = require("express");
const router = express.Router();
const Job = require("../models/Job"); // import your Job model

// -------------------- CREATE JOB --------------------
router.post("/", async (req, res) => {
  try {
    const { companyname, jobrole, ctc, impDate, type, email } = req.body;

    if (!companyname || !jobrole || !type || !email) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const newJob = new Job({
      companyname,
      jobrole,
      ctc,
      impDate,
      type,
      email,
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while adding job" });
  }
});

// -------------------- GET ALL JOBS --------------------
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching jobs" });
  }
});

// -------------------- GET SINGLE JOB --------------------
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching job" });
  }
});

// -------------------- UPDATE JOB STATUS --------------------
router.patch("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Only update fields provided
    Object.keys(req.body).forEach((key) => {
      job[key] = req.body[key];
    });

    const updatedJob = await job.save();
    res.status(200).json(updatedJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while updating job" });
  }
});

// -------------------- DELETE JOB --------------------
router.delete("/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ message: "Job not found" });

    res
      .status(200)
      .json({ message: "Job deleted successfully", job: deletedJob });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while deleting job" });
  }
});

module.exports = router;
