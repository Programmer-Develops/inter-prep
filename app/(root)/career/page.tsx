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
            
        </>
    )

}

export default Career;