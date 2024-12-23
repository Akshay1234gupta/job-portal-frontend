import { Navigate, useNavigate, useParams } from "react-router-dom";
import PostedJob from "../PostedJob/PostedJob";
import PostedJobDesc from "../PostedJob/PostedJobDesc";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../Services/JobService";
import { Button, Divider, Drawer } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const PostedJobPage = () => {
    const { id } = useParams();


    const user = useSelector((state: any) => state.user);
    const [opened, { open, close }] = useDisclosure(false);

    const [jobList, setJobList] = useState<any[]>([]);
    const [job, setJob] = useState<any>({});
    const navigate = useNavigate();
    const matches = useMediaQuery('(max-width:767px)');


    useEffect(() => {
        window.scrollTo(0, 0);

        getJobPostedBy(user.id)
            .then((res) => {

                setJobList(res);
                if (res && res.length > 0 && Number(id) == 0)
                    navigate(`/posted-job/${res[0].id}`);
                const foundJob = res.find((item: any) => item.id === Number(id)); // Match ID as number
                // console.log("Found Job:", foundJob); // Debug the matched job

                setJob(foundJob); // Set found job or null if not found
            })
            .catch((err) => {
                console.error("Error fetching jobs:", err); // Log errors
            });
    }, [id]);


    return <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-5">
        <Divider />
        {
            matches && <Button my="xs" size="sm" autoContrast onClick={open}>All Jobs</Button>
        }
        <Drawer size={230} overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} opened={opened} onClose={close} title="All Jobs">
            <PostedJob job={job} jobList={jobList} />
        </Drawer>
        <div className="flex gap-5 justify-around py-5">
            {!matches && <PostedJob job={job} jobList={jobList} />}
            <PostedJobDesc {...job} />
        </div>
    </div>
}
export default PostedJobPage