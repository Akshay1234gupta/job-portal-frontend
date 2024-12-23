import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ApplyJobComp from "../ApplyJob/ApplyJobComp"
import { useEffect, useState } from "react"
import { getJob } from "../Services/JobService"

const ApplyJobPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [job, setJobs] = useState<any>(null);
    useEffect(() => {
        window.scrollTo(0, 0);
        getJob(id).then((res) => {
            setJobs(res);
        }).catch((err) => {
            console.log(err);

        })
    }, [id])

    return <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">

        <Button my="md" mb="xs" onClick={() => navigate(-1)} leftSection={<IconArrowLeft size={20} />} color="brightSun.4" variant="light">Back</Button>
        <ApplyJobComp {...job} />
    </div>
}
export default ApplyJobPage