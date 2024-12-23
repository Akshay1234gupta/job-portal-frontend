import { ActionIcon, TagsInput } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { useMediaQuery } from "@mantine/hooks";

const Skills = () => {

    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const [skills, setSkills] = useState<string[]>([]);
    const matches = useMediaQuery('(max-width:475px)');

    const handleEdit = () => {
        if (!edit) {
            setEdit(true);
            setSkills([...profile.skills]);
        }
        else {
            setEdit(false);
        }
    }
    const handleSave = () => {
        setEdit(false);
        let updatedProfile = { ...profile, skills: skills };
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", 'Skills updated successfully!');

    }

    return <>
        <div className="px-3">
            <div className="text-2xl font-semibold mb-3 flex justify-between">Skills
                <div>
                    {edit && <ActionIcon onClick={handleSave} color="green.8" size={matches ? "md" : "lg"} variant="subtle">
                        <IconCheck className="h-4/5 w-4/5" />
                    </ActionIcon>}
                    <ActionIcon onClick={handleEdit} color={edit ? "red.8" : "brightSun.4"} size={matches ? "md" : "lg"} variant="subtle">
                        {edit ? <IconX /> : <IconPencil className="h-4/5 w-4/5" />}
                    </ActionIcon>
                </div>
            </div>
            {
                edit ? <><TagsInput value={skills} onChange={(newSkills) => setSkills([...newSkills])}
                    placeholder="Add skills "
                    splitChars={[',', ' ', '|']}
                /></> :
                    <><div className="flex flex-wrap gap-2">
                        {
                            profile?.skills?.map((skill: any, index: number) => <div key={index}
                                className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">{skill}</div>
                            )
                        }
                    </div>
                    </>
            }
        </div>
    </>
}
export default Skills