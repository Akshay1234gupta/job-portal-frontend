import { ActionIcon } from "@mantine/core";
import { IconDeviceFloppy, IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react"
import ExpInput from "./ExpInput";
import { useSelector } from "react-redux";
import ExpCard from "./ExpCard";
import { useMediaQuery } from "@mantine/hooks";


const Experience = () => {

    const profile = useSelector((state: any) => state.profile);
    const [edit, setEdit] = useState(false);
    const [addExp, setAddExp] = useState(false);
    const matches = useMediaQuery('(max-width:475px)');


    const handleEdit = () => {
        setEdit(!edit);
    }

    return <div className="px-3  ">
        <div className="text-2xl font-semibold mb-5 flex justify-between">Experience
            <div className="flex gap-2"> <ActionIcon onClick={() => setAddExp(true)} color="brightSun.4" size={matches ? "md" : "lg"} variant="subtle">
                <IconPlus className="h-4/5 w-4/5" />
            </ActionIcon>
                <ActionIcon onClick={handleEdit} color={edit ? "red.8" : "brightSun.4"} size={matches ? "md" : "lg"} variant="subtle">
                    {edit ? <IconX /> : <IconPencil className="h-4/5 w-4/5" />}
                </ActionIcon></div></div>
        <div className="flex flex-col gap-8">
            {
                profile?.experiences?.map((exp: any, index: any) => <ExpCard key={index} index={index} {...exp} edit={edit} />)
            }
            {addExp && <ExpInput add setEdit={setAddExp} />}
        </div>
    </div>

}
export default Experience