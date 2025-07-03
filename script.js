let jobData;
let jobCards = document.querySelector(".job-cards");
console.log(jobCards);

async function loadJobs() {
  try {
    const response = await fetch("jobs.json");
    jobData = await response.json();
    console.log("Loaded:", jobData); // ✅ Now it's loaded
    displayJobs(jobData); // You can use it here
  } catch (error) {
    console.error("Error:", error);
  }
}

loadJobs(); // Call the async function
// Add this after loadJobs();
const jobTypeSelect = document.querySelector('.filters select');
if (jobTypeSelect) {
  jobTypeSelect.addEventListener('change', function () {
    const selected = this.value;
    if (selected === "Job Type") {
      displayJobs(jobData); // Show all jobs
    } else {
      // Filter jobs by jobType (case-insensitive)
      const filtered = {
        data: jobData.data.filter(job =>
          job.jobType.toLowerCase() === selected.toLowerCase()
        )
      };
      displayJobs(filtered);
    }
  });
}


function displayJobs(data) {
  console.log(data);
  jobCards.innerHTML = ""; // Clear existing cards

  data.data.forEach((i) => {
    const jobCard = `
      <div class="job one">
        <div class="job-content">
          <h2>${i["job-title"]}</h2>
          <p>${i.jobType} | ${i.city}</p>
          <div>
          <button class="apply-btn"
             data-title="${i["job-title"]}"
             data-type="${i["jobType"]}"
             data-city="${i["city"]}">
             Apply
           </button>
          </div>
        </div>
        <div>
          <img src="${i.img}" alt="jobs-image">
        </div>
      </div>
    `;
    jobCards.innerHTML += jobCard; // Append each job card
  });

  // Add event listeners to all apply buttons
  document.querySelectorAll(".apply-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const params = new URLSearchParams({
        title: this.dataset.title,
        type: this.dataset.type,
        city: this.dataset.city,
      });
      window.open("form.html?" + params.toString(), "_blank");
    });
  });
}
if (window.location.pathname.endsWith("form.html")) {
  const submitBtn = document.querySelector(
    '.form-button button[type="submit"]'
  );
  if (submitBtn) {
    submitBtn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.keyCode === 13) {
        e.preventDefault();
        submitBtn.click();
      }
    });
  }
}
