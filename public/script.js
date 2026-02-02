const jobsList = document.getElementById("jobs");
const addBtn = document.getElementById("addBtn");
const jobIdInput = document.getElementById("jobId");

// ---------------- Fetch Jobs ----------------
async function fetchJobs() {
  const res = await fetch("/jobs");
  const jobs = await res.json();
  jobsList.innerHTML = "";

  jobs.forEach((job) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${job.companyname}</strong> - ${job.jobrole} | Status: ${job.status || "applied"}
      </div>
      <div>
        <button class="update" onclick="editJob('${job._id}')">Edit</button>
        <button class="update" onclick="updateStatus('${job._id}')">Next Status</button>
        <button class="delete" onclick="deleteJob('${job._id}')">Delete</button>
      </div>
    `;
    jobsList.appendChild(li);
  });
}

// ---------------- Add / Save Job ----------------
addBtn.addEventListener("click", async () => {
  const companyname = document.getElementById("companyname").value.trim();
  const jobrole = document.getElementById("jobrole").value.trim();
  const ctc = document.getElementById("ctc").value.trim();
  const impDate = document.getElementById("impDate").value;
  const type = document.getElementById("type").value.trim();
  const email = document.getElementById("email").value.trim();
  const id = jobIdInput.value;

  if (!companyname || !jobrole || !type || !email) {
    alert("Please fill all required fields");
    return;
  }

  try {
    if (id) {
      // Update existing job
      await fetch(`/jobs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyname,
          jobrole,
          ctc,
          impDate,
          type,
          email,
        }),
      });
      jobIdInput.value = ""; // clear edit
    } else {
      // Add new job
      await fetch("/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyname,
          jobrole,
          ctc,
          impDate,
          type,
          email,
        }),
      });
    }
    // clear form
    document.getElementById("companyname").value = "";
    document.getElementById("jobrole").value = "";
    document.getElementById("ctc").value = "";
    document.getElementById("impDate").value = "";
    document.getElementById("type").value = "";
    document.getElementById("email").value = "";
    fetchJobs();
  } catch (err) {
    console.error(err);
    alert("Error saving job");
  }
});

// ---------------- Edit Job ----------------
async function editJob(id) {
  const res = await fetch(`/jobs/${id}`);
  const job = await res.json();

  jobIdInput.value = job._id;
  document.getElementById("companyname").value = job.companyname;
  document.getElementById("jobrole").value = job.jobrole;
  document.getElementById("ctc").value = job.ctc;
  document.getElementById("impDate").value = job.impDate
    ? job.impDate.slice(0, 10)
    : "";
  document.getElementById("type").value = job.type;
  document.getElementById("email").value = job.email;
}

// ---------------- Update Status ----------------
async function updateStatus(id) {
  const resJob = await fetch(`/jobs/${id}`);
  const job = await resJob.json();

  const statusOrder = ["applied", "interview", "offer", "reject"];
  const currentIndex =
    statusOrder.indexOf(job.status) >= 0 ? statusOrder.indexOf(job.status) : 0;
  const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];

  await fetch(`/jobs/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: nextStatus }),
  });

  fetchJobs();
}

// ---------------- Delete Job ----------------
async function deleteJob(id) {
  await fetch(`/jobs/${id}`, { method: "DELETE" });
  fetchJobs();
}

// ---------------- Logout ----------------
document.getElementById("logoutBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});

// Initial load
fetchJobs();
