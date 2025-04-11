import {Button} from "@/components/ui/button";
import {getCurrentUser} from "@/lib/actions/auth.action";
import {getInterviewsByUserId} from "@/lib/actions/general.action";

const Career = async () => {
    const user = await getCurrentUser()
    if (!user?.name || !user?.id) {
        return <p>Please log in to continue.</p>
    }

    return (
        <>
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Career</h2>
                    <p className="text-lg">Explore career opportunities .</p>

                    {/* <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Start an Interview</Link>
                    </Button>

                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Explore Jobs</Link>
                    </Button> */}
                </div>
            </section>
        </>
    )

}

export default Career;