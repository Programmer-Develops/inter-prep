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

const Career = async () => {
  const user = await getCurrentUser();
  if (!user?.name || !user?.id) {
    return <p>Please log in to continue.</p>;
  }

  try {
    const jobs = await fetchJobs(); // Fetch job data

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
          <div className="job-list flex flex-col gap-4">
            {jobs.map((job: Job) => (
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
            ))}
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return <p>Failed to load jobs. Please try again later.</p>;
  }
};

export default Career;