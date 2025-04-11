import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";

// Mock function to fetch job data (replace with actual API call)
async function fetchJobs() {
  return [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      applyUrl: "https://techcorp.com/jobs/frontend-developer",
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "CodeBase",
      location: "San Francisco, CA",
      applyUrl: "https://codebase.com/jobs/backend-engineer",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Designify",
      location: "New York, NY",
      applyUrl: "https://designify.com/jobs/ui-ux-designer",
    },
  ];
}

const Career = async () => {
  const user = await getCurrentUser();
  if (!user?.name || !user?.id) {
    return <p>Please log in to continue.</p>;
  }

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
          {jobs.map((job) => (
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
};

export default Career;