import { ActionIcon, Avatar, Button, Divider, FileInput, Overlay, TagsInput, Textarea } from "@mantine/core"
import { IconAdjustments, IconBriefcase, IconDeviceFloppy, IconEdit, IconMapPin, IconPencil, IconPlus } from "@tabler/icons-react"
import ExpCard from "./ExpCard"
import CertiCard from "./CertiCard"
import { useEffect, useState } from "react"
import SelectInput from "./SelectInput"
import fields from "../Data/Profile"
import ExpInput from "./ExpInput"
import CertiInput from "./CertiInput"
import { useDispatch, useSelector } from "react-redux"
import { getProfile } from "../Services/ProfileService"
import Info from "./Info"
import { changeProfile, setProfile } from "../Slices/ProfileSlice"
import About from "./About"
import Skills from "./Skills"
import Experience from "./Experience"
import Certificate from "./Certificate"
import { useHover } from "@mantine/hooks"
import { resolve } from "path"
import { rejects } from "assert"
import { successNotification } from "../Services/NotificationService"
import { getBase64 } from "../Services/Utilities"

const Profile = (props: any) => {
    const dispatch = useDispatch();

    const profile = useSelector((state: any) => state.profile);
    const [edit, setEdit] = useState([false, false, false, false, false, false]);

    const handleEdit = (index: any) => {
        const newEdit = [...edit];
        newEdit[index] = !newEdit[index];
        setEdit(newEdit);

    }


    const { hovered, ref } = useHover();

    const handleFileChange = async (image: any) => {

        let picture: any = await getBase64(image);
        console.log(picture);
        let updatedProfile = { ...profile, picture: picture.split(',')[1] };
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", "Profile picture updated successfully!");
    }



    return <div className="w-4/5 lg-mx:w-full mx-auto">
        <div className="">
            <div className="relative px-5">
                <img className="rounded-t-2xl xs-mx:h-32" src="/Profile/banner.jpg" alt="" />
                {/* <img className="w-24 h-24 rounded-full -bottom-1/3 absolute left-3 border-l-mine-shaft-950 border-8" src="/avatar2.png" alt="" /> */}

                <div ref={ref} className="absolute cursor-pointer flex items-center justify-center -bottom-1/3 md-mx:-bottom-10  sm-mx:-bottom-16 left-6 !rounded-full">
                    <Avatar className="!w-48 !h-48 md-mx:!w-40 md-mx:!h-40 sm-mx:!w-36 sm-mx:!h-36 xs-mx:!w-32 xs-mx:!h-32 border-mine-shaft-950 border-8 rounded-full"
                        src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : "Avatar.png"} alt="" />

                    {hovered && <Overlay className="!rounded-full" color="#000" backgroundOpacity={0.85} />}
                    {hovered && <IconEdit className="absolute z-[300] !w-16 !h-16" />}
                    {hovered && <FileInput onChange={handleFileChange} className="absolute z-[301] [&_*]:rounded-full !h-full
                     w-full [&_*]:!h-full" variant="transparent" size="lg" radius="xl"
                        accept="image/png,image/jpeg" />}
                </div>
            </div>

            <div className="px-3 mt-16">
                <Info />
                <Divider mx="xs" my="xl" />
                <About />
                <Divider mx="xs" my="xl" />
                <Skills />
                <Divider mx="xs" my="xl" />
                <Experience />
                <Divider mx="xs" my="xl" />
                <Certificate />
            </div>
        </div>
    </div>
}
export default Profile