import { Avatar, Burger, Button, Drawer, Indicator } from "@mantine/core"
import { IconAsset, IconBell, IconSettings, IconX } from "@tabler/icons-react"
import NavLinks from "./NavLinks"
import { Link, useLocation, useNavigate } from "react-router-dom"
import ProfileMenu from "./ProfileMenu"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getProfile } from "../Services/ProfileService"
import { setProfile } from "../Slices/ProfileSlice"
import NotiMenu from "./NotiMenu"
import { jwtDecode } from "jwt-decode"
import { setUser } from "../Slices/UserSlice"
import { setupResponseInterceptor } from "../Interceptor/AxiosInterceptor"
import { useDisclosure } from "@mantine/hooks"


const links = [
    { name: "Find Jobs", url: "find-jobs" },
    { name: "Find Talent", url: "find-talent" },
    { name: "Post Job", url: "post-job/0" },
    { name: "Posted Job", url: "posted-job/0" },
    { name: "Job History", url: "job-history" },
    // { name: "SignUp", url: "signup" },

]

const Header = () => {

    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const token = useSelector((state: any) => state.jwt);
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        setupResponseInterceptor(navigate);

    }, [navigate])

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) { // Check if the token exists
            try {
                const decoded = jwtDecode(token); // Decode the token
                dispatch(setUser({ ...decoded, email: decoded.sub })); // Dispatch user data
            } catch (error) {
                console.error("Error decoding token:", error); // Handle decoding error
            }
        } else {
            console.log("No token found in localStorage.");
        }

        if (user?.profileId) getProfile(user?.profileId).then((data: any) => {
            dispatch(setProfile(data));
        }).catch((error: any) => {
            console.log(error);
        })
    }, [token, navigate])

    const location = useLocation();
    return location.pathname != "/signup" && location.pathname != "/login" ? < div className="w-full text-white bg-mine-shaft-950 font-['poppins'] px-6 h-20 flex justify-between items-center">
        <div className="flex gap-3 items-center text-bright-sun-400">
            <IconAsset className="h-10 w-10" stroke={1.25} />
            <div className="text-3xl xs-mx:hidden font-semibold">MyJobs</div>
        </div>
        {NavLinks()}
        <div className="flex gap-5 items-center">

            {user ? <ProfileMenu /> : <Link to="/login">
                <Button variant="subtle" color="brightSun.4">Login</Button>
            </Link>}

            {/* <div className="bg-mine-shaft-900 p-1.5 rounded-full">
                <IconSettings stroke={1.5} />
            </div> */}

            {user ? <NotiMenu /> : <></>}


            <Burger className="bs:hidden" opened={opened} onClick={open} aria-label="Toggle" />
            <Drawer size="xs" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                position="right" opened={opened} onClose={close}
                closeButtonProps={{
                    icon: <IconX size={30} />
                }}>

                <div className="flex flex-col gap-6 items-center">
                    {
                        links.map((link, index) =>
                            <div className="h-full flex items-center">
                                <Link className="hover:text-bright-sun-400 text-xl" key={index} to={link.url}>{link.name}</Link>
                            </div>)
                    }
                </div>

            </Drawer>
        </div>
    </div > : <></>


}
export default Header