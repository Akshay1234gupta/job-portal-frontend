import { Button, Divider, Modal, PasswordInput, PinInput, rem, TextInput } from "@mantine/core"
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react"
import { changePass, sendOtp, verifyOtp } from "../Services/UserService";
import { log } from "console";
import { signupValidation } from "../Services/FormValidation";
import { errNotification, successNotification } from "../Services/NotificationService";
import { useInterval } from "@mantine/hooks";

const ResetPassword = (props: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passErr, setPassErr] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpSending, setOtpSending] = useState(false);
    const [verified, setVerified] = useState(false);
    const [resendLoader, setResendLoader] = useState(false);

    const [seconds, setSeconds] = useState(60);
    const interval = useInterval(() => {
        if (seconds === 0) {
            setResendLoader(false);
            setSeconds(60);
            interval.stop();
        } else setSeconds((s) => s - 1);

    }, 1000)

    const handleSendOtp = () => {
        setOtpSending(true);
        sendOtp(email).then((res) => {
            console.log(res);
            successNotification("OTP Sent Successfully.", "Please check your email for otp.");
            setOtpSent(true);
            setOtpSending(false);
            setResendLoader(true);
            interval.start();
        }).catch((err) => {
            console.log(err);
            setOtpSending(false);
            errNotification("OTP Sending Failed.", err.response.data.errorMessage);

        })
    }

    const handleVerifyOtp = (otp: string) => {
        verifyOtp(email, otp).then((res) => {
            console.log(res);
            successNotification("OTP Verified", "Enter new password.");
            setVerified(true);
        }).catch((err) => {
            console.log(err);
            errNotification("OTP Verification Failed", err.response.data.errorMessage);

        })
    }
    const resendOtp = () => {
        if (resendLoader) return;
        handleSendOtp();
    }
    const changeEmail = () => {
        setOtpSent(false);
        setResendLoader(false);
        setSeconds(60);
        setVerified(false);
        interval.stop();
    }
    const handleResetPassword = () => {
        changePass(email, password).then((res) => {
            console.log(res);
            successNotification("Password Changed", "Login with new password.");
            props.close();
        }).catch((err) => {
            console.log(err);
            errNotification("Password Reset Failed", err.response.data.errorMessage);
        })
    }

    return <Modal opened={props.opened} onClose={props.close} title="Reset Password">
        <div className="flex flex-col gap-6">
            <TextInput value={email} onChange={(e) => setEmail(e.target.value)} name="email" size="md"
                withAsterisk leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
                label="Email" placeholder="Your email"
                rightSection={<Button loading={otpSending && !otpSent} size="xs" className="mr-1" onClick={handleSendOtp} autoContrast disabled={email === "" || otpSent} variant="filled">Send Otp</Button>} rightSectionWidth="xl" />

            {otpSent && <PinInput onComplete={handleVerifyOtp} length={6} size="md" gap="lg" className="mx-auto" type="number" />}
            {otpSent && !verified &&
                <div className="flex gap-2">
                    <Button fullWidth loading={otpSending} color="brightSun.4" onClick={resendOtp} autoContrast variant="light">{resendLoader ? seconds : "Resend"}</Button>
                    <Button fullWidth onClick={changeEmail} autoContrast variant="filled">Change Email</Button>
                </div>
            }
            {verified && <PasswordInput value={password} error={passErr} onChange={(e) => { setPassword(e.target.value); setPassErr(signupValidation("password", e.target.value)) }}
                name="password" withAsterisk leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                label="Password" placeholder="Password" />
            }
            {verified && <Button onClick={handleResetPassword} autoContrast variant="filled">
                Change Password</Button>}

        </div>
    </Modal>
}
export default ResetPassword