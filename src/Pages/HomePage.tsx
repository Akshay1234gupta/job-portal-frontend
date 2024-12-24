
import { useEffect } from "react"
import Companies from "../LandingPage/Companies"
import DreamJob from "../LandingPage/DreamJob"
import JobCategory from "../LandingPage/JobCategory"
import Subscribe from "../LandingPage/Subscribe"
import Testimonials from "../LandingPage/Testimonials"
import Working from "../LandingPage/Working"

const HomePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);

    })
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
            <DreamJob />
            <Companies />
            <JobCategory />
            <Working />
            <Testimonials />
            <Subscribe />
        </div>
    )
}
export default HomePage