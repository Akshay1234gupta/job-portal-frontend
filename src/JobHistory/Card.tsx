import { Button, Divider, Text } from "@mantine/core"
import { IconBookmark, IconBookmarkFilled, IconCalendarMonth, IconClockHour3 } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { timeAgo } from "../Services/Utilities"
import { useDispatch, useSelector } from "react-redux"
import { changeProfile } from "../Slices/ProfileSlice"

const Card = (props: any) => {

    const profile = useSelector((state: any) => state.profile);
    const dispatch = useDispatch();

    const handleSaveJob = () => {

        let savedJobs: any = [...profile.savedJobs];
        if (savedJobs?.includes(props.id)) {
            savedJobs = savedJobs?.filter((id: any) => id !== props.id);
        }
        else {
            savedJobs = [...savedJobs, props.id];
        }
        let updatedProfile = { ...profile, savedJobs: savedJobs };
        dispatch(changeProfile(updatedProfile));
    }

    return <div className="bg-mine-shaft-900  p-4 w-72 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-600">
        <div className="flex justify-between">
            <div className="flex gap-2 items-center ">
                <div className="p-2 bg-mine-shaft-800 rounded-md">
                    <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
                </div>
                <div>
                    <div className="font-semibold">{props.jobTitle}</div>
                    <div className="text-xs text-mine-shaft-300">{props.company} &#x2022; {props.applicants ? props.applicants.length : 0} Applicants</div>
                </div>
            </div>
            {profile.savedJobs?.includes(props.id) ? < IconBookmarkFilled onClick={handleSaveJob} className=" text-bright-sun-400 cursor-pointer" /> :
                <IconBookmark onClick={handleSaveJob} className="text-mine-shaft-300 hover:text-bright-sun-400 cursor-pointer" />
            }
        </div>
        <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
            <div>{props.experience}</div>
            <div>{props.jobType}</div>
            <div>{props.location}</div>
        </div>
        <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
            {props.about}
        </Text>
        <Divider size="xs" color="mineShaft.7" />

        <div className="flex justify-between">
            <div className="font-semibold text-mine-shaft-200">&#8377;{props.packageOffered} LPA</div>
            <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
                <IconClockHour3 className="h-5 w-5" stroke={1.5} />{props.applied || props.interviewing ? "Applied" : props.offered ? "Interviewed" : "Posted"} Posted {timeAgo(props.postTime)}

            </div>
        </div>
        {(props.offered || props.interviewing) && <Divider size="xs" color="mineShaft.7" />}
        {
            props.offered && <div className="flex gap-2">
                <Button color="brightSun.4" variant="outline" fullWidth>Accept</Button>
                <Button color="brightSun.4" variant="light" fullWidth>Reject</Button>
            </div>
        }
        {
            props.interviewing && <div className="flex gap-1  text-sm items-center">
                <IconCalendarMonth className="text-bright-sun-400 w-5 h-5" stroke={1.5} />Sun, @25 August &bull; <span className="text-mine-shaft-400">10:00 AM</span></div>
        }
        <Link to={`/jobs/${props.id}`}>
            <Button fullWidth color="brightSun.4" variant="outline">View Job</Button>
        </Link>
    </div>
}
export default Card