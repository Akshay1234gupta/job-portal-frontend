import { Button, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput } from "@mantine/core"
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react"
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBase64 } from "../Services/Utilities";
import { applyJob } from "../Services/JobService";
import { errNotification, successNotification } from "../Services/NotificationService";
import { useSelector } from "react-redux";

const ApplicationForm = () => {

    const { id } = useParams();
    const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);

    const handlePreview = () => {
        form.validate();

        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (!form.isValid()) return;

        setPreview(!preview);
        console.log(form.getValues());


    }

    const handleSubmit = async () => {
        setSubmit(true);
        let resume: any = await getBase64(form.getValues().resume);
        let applicant = { ...form.getValues(), applicantId: user.id, resume: resume.split(',')[1] };

        applyJob(id, applicant).then((res) => {
            setSubmit(false);
            successNotification("Success", "Application Submitted Successfully.");
            navigate("/job-history");
        }).catch((err) => {
            setSubmit(false);
            errNotification("Error", err.response.data.errorMessage);
        })
    }

    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            name: '',
            email: '',
            phone: '',
            website: '',
            resume: null,
            coverLetter: '',

        },
        validate: {
            name: isNotEmpty('Name cannot be empty'),
            email: isNotEmpty('Email cannot be empty'),
            phone: isNotEmpty('Phone cannot be empty'),
            website: isNotEmpty('Website cannot be empty'),
            resume: isNotEmpty('Resume cannot be empty'),

        }
    });

    return <div>
        <LoadingOverlay className="!fixed "
            visible={submit}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'brightSun.4', type: 'bars' }}
        />
        <div className="text-2xl font-semibold mb-5">Submit Your Application</div>
        <div className="flex flex-col gap-5">
            <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:!w-full sm-mx:flex-wrap">
                <TextInput {...form.getInputProps("name")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} label="Full Name" withAsterisk placeholder="Enter name" />
                <TextInput {...form.getInputProps("email")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} label="Email" withAsterisk placeholder="Enter email" />
            </div>
            <div className="flex gap-10 md-mx:gap-5  [&>*]:w-1/2 sm-mx:[&>*]:!w-full sm-mx:flex-wrap">
                <NumberInput {...form.getInputProps("phone")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} label="Phone Number" withAsterisk placeholder="Enter phone number" hideControls min={0} max={9999999999} clampBehavior="strict" />
                <TextInput {...form.getInputProps("website")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} label="Personal Website" withAsterisk placeholder="Enter url" />
            </div>
            <FileInput {...form.getInputProps("resume")} accept="application/pdf" readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} withAsterisk leftSection={<IconPaperclip stroke={1.5} />} label="Attach Your CV" placeholder="Your CV" leftSectionPointerEvents="none" />
            <Textarea {...form.getInputProps("coverLetter")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} withAsterisk placeholder="Type something about yourself" label="Cover Letter" autosize minRows={4} />
            {!preview && <Button onClick={handlePreview} color="brightSun.4" variant="light">Preview</Button>
            }
            {
                preview && <div className="flex gap-10 [&>*]:w-1/2">
                    <Button fullWidth onClick={handlePreview} color="brightSun.4" variant="outline">Edit</Button>
                    <Button fullWidth onClick={handleSubmit} color="brightSun.4" variant="light">Submit</Button>
                </div>
            }
        </div>
    </div>
}
export default ApplicationForm