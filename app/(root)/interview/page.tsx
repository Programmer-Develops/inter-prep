import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  if (!user?.name || !user?.id) {
    return <p>Please log in to generate an interview.</p>;
  }

  return (
    <>
      <h3>Interview generation</h3>

      <Agent
        userName={user.name} // Safe to use now since we checked above
        userId={user.id}
        // profileImage={user?.profileURL}
        type="generate"
      />
    </>
  );
};

export default Page;