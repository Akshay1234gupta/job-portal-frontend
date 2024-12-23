import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Header from "../Header/Header"
import { Divider } from "@mantine/core"
import FindJobs from "./FindJobs"
import JobDescPage from "./JobDescPage"
import ApplyJobPage from "./ApplyJobPage"
import FindTalentPage from "./FindTalentPage"
import CompanyPage from "./CompanyPage"
import PostedJobPage from "./PostedJobPage"
import JobHistoryPage from "./JobHistoryPage"
import TalentProfilePage from "./TalentProfilePage"
import PostJobPage from "./PostJobPage"
import SignUpPage from "./SignUpPage"
import ProfilePage from "./ProfilePage"
import HomePage from "./HomePage"
import Footer from "../Footer/Footer"
import { getItem } from "../Services/LocalStorageService"
import { useSelector } from "react-redux"
import ProtectedRoute from "../Services/ProtectedRoute"
import PublicRoute from "../Services/PublicRoute"
import Copyright from "../Footer/Copyright"

const AppRoutes = () => {
    const user = useSelector((state: any) => state.user);
    return <BrowserRouter>
        <div className='relative'>
            <Header />
            <Divider size="xs" mx="md" />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/find-jobs' element={<FindJobs />} />
                <Route path='/jobs/:id' element={< JobDescPage />} />
                <Route path='/apply-job/:id' element={< ApplyJobPage />} />
                <Route path='/find-talent' element={<FindTalentPage />} />
                <Route path='/company/:name' element={<ProtectedRoute allowedRoles={['EMPLOYER', 'APPLICANT']}><CompanyPage /></ProtectedRoute>} />
                <Route path='/posted-job/:id' element={<ProtectedRoute allowedRoles={['EMPLOYER']}><PostedJobPage /></ProtectedRoute>} />
                <Route path='/job-history' element={<ProtectedRoute allowedRoles={['APPLICANT']}>{<JobHistoryPage />}</ProtectedRoute>} />
                <Route path='/talent-profile/:id' element={<TalentProfilePage />} />
                <Route path='/post-job/:id' element={<ProtectedRoute allowedRoles={['EMPLOYER']}><PostJobPage /></ProtectedRoute>} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/login' element={<SignUpPage />} />
                <Route path='/profile' element={<ProtectedRoute allowedRoles={['EMPLOYER', 'APPLICANT']}><ProfilePage /></ProtectedRoute>} />
                <Route path='*' element={<HomePage />} />
            </Routes>
            <Footer />
            <Divider size="xs" mx="md" />
            <Copyright />
        </div>
    </BrowserRouter>
}
export default AppRoutes