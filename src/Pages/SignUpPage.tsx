import { IconArrowLeft, IconAsset } from "@tabler/icons-react"
import SignUp from "../SignUpLogin/SignUp"
import Login from "../SignUpLogin/Login"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@mantine/core"

const SignUpPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return <div className="h-[100vh] w-[100vw] bg-mine-shaft-950 font-['poppins'] overflow-hidden sm-mx:overflow-y-auto relative">
        <Button className="!absolute left-5 z-10" leftSection={<IconArrowLeft size={20} />} my='md' onClick={() => navigate("/")} color="brightSun.4" variant="light">Home</Button>

        <div className={`relative transition-all ease-in-out duration-1000 flex [&>*]:flex-shrink-0 ${location.pathname == '/signup' ? '-translate-x-1/2 sm-mx:-translate-x-full' : 'translate-x-0'}`}>
            <Login />
            <div className={`w-1/2 h-[100vh]  sm-mx:hidden sm-mx:min-h-full transition-all duration-1000 ease-in-out ${location.pathname == "/signup" ? "rounded-r-[200px]" : "rounded-l-[200px]"} bg-mine-shaft-900 flex items-center gap-5 flex-col justify-center`}>
                <div className="flex gap-1 items-center text-bright-sun-400">
                    <IconAsset className="h-16 w-16" stroke={1.25} />
                    <div className="text-6xl bs-mx:text-5xl md-mx:text-4xl sm-mx:text-3xl font-semibold">MyJobs</div>
                </div>
                <div className="text-2xl bs-mx:text-xl md-mx:text-lg text-mine-shaft-200 font-semibold">Find the job made for you</div>
            </div>
            <SignUp />
        </div>
    </div>
}
export default SignUpPage