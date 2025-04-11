"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";

const REMOTE_OK_API_URL = "https://remoteok.io/api";

// Define the Job type
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  applyUrl: string;
}

// Function to fetch job data from Remote OK API
async function fetchJobs(): Promise<Job[]> {
  const response = await fetch(REMOTE_OK_API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await response.json();
  return data.slice(1).map((job: any) => ({
    id: job.id,
    title: job.position,
    company: job.company,
    location: job.location || "Remote",
    applyUrl: job.url,
  }));
}

const Career = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const fetchedJobs = await fetchJobs();
        setJobs(fetchedJobs);
        setFilteredJobs(fetchedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    loadJobs();
  }, []);

  // Handle search input changes
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
    );

    setFilteredJobs(filtered);
  };

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Career</h2>
          <p className="text-lg">Explore career opportunities.</p>
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Available Jobs</h2>

        {/* Search Bar */}
        <div className="search-bar mb-4">
          <input
            type="text"
            placeholder="Search jobs by title, company, or location..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Job List */}
        <div className="job-list flex flex-col gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job: Job) => (
              <div
                key={job.id}
                className="job-card p-4 border rounded-lg shadow-sm flex flex-col gap-2"
              >
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">
                  {job.company} - {job.location}
                </p>
                <Button asChild className="btn-primary max-sm:w-full">
                  <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                    Apply Now
                  </a>
                </Button>
              </div>
            ))
          ) : (
            <p>No jobs found matching your search.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Career;